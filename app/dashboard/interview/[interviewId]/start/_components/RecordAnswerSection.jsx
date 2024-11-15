"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle, Video, VideoOff } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isWebcamOn, setIsWebcamOn] = useState(true);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  const startRecording = () => {
    setRecordedChunks([]);
    if (webcamRef.current && webcamRef.current.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
    startSpeechToText();
    toast.success("Recording started");
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    stopSpeechToText();
  };

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const handleRecordingStop = async () => {
    setLoading(true);
    try {
      if (userAnswer?.length < 10) {
        toast.error("Answer too short. Please record again.", { duration: 3000 });
        setLoading(false);
        return;
      }

      const feedbackPrompt = `
        Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
        User Answer: ${userAnswer}
        
        Please analyze the user's answer and provide:
        1. A rating out of 10, using the full range from 1 to 10. Be critical and vary your ratings based on the quality of the answer.
        2. Concise feedback for improvement.
        3. At least one specific strength of the answer.
        4. At least one specific area for improvement.

        Format your response as a JSON object with keys: rating, feedback, strength, improvement.
      `;

      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response.text().replace(/```json|```/g, '');
      const JsonFeedBackResp = JSON.parse(mockJsonResp);

      const feedbackToast = toast.loading("Processing your answer...");

      await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedBackResp?.feedback,
        rating: JsonFeedBackResp.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY')
      });

      toast.dismiss(feedbackToast);
      toast.success("Answer recorded successfully", { duration: 3000 });

      // Display feedback in a more compact way
      toast(
        <div>
          <p><strong>Rating:</strong> {JsonFeedBackResp.rating}/10</p>
          <p><strong>Feedback:</strong> {JsonFeedBackResp.feedback}</p>
          <p><strong>Strength:</strong> {JsonFeedBackResp.strength}</p>
          <p><strong>Improvement:</strong> {JsonFeedBackResp.improvement}</p>
        </div>,
        {
          duration: 10000, // 10 seconds
          description: "AI Feedback"
        }
      );

      // Handle video blob
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = `interview_q${activeQuestionIndex + 1}.webm`;
      a.click();
      window.URL.revokeObjectURL(url);

      setUserAnswer("");
      setResults([]);
      setRecordedChunks([]);
    } catch (error) {
      console.error("Error processing recording:", error);
      toast.error("Error processing your answer. Please try again.", { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const toggleWebcam = () => {
    setIsWebcamOn(!isWebcamOn);
  };

  const handleStartStop = () => {
    if (isRecording) {
      stopRecording();
      handleRecordingStop();
    } else {
      startRecording();
    }
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-col mb-10 justify-center items-center bg-black rounded-lg p-5 relative">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
          alt="webcam"
          priority
        />
        {isWebcamOn && (
          <Webcam
            audio={false}
            ref={webcamRef}
            style={{ height: 300, width: "100%", zIndex: 10 }}
            mirrored={true}
          />
        )}
      </div>
      <div className="flex gap-4 mb-6">
        <Button
          disabled={loading}
          variant="outline"
          onClick={handleStartStop}
        >
          {isRecording ? (
            <h2 className="text-red-600 items-center animate-pulse flex gap-2">
              <StopCircle /> Stop Recording...
            </h2>
          ) : (
            <h2 className="text-primary flex gap-2 items-center">
              <Mic /> Record Answer
            </h2>
          )}
        </Button>
        <Button onClick={toggleWebcam} variant="outline">
          {isWebcamOn ? <VideoOff /> : <Video />}
        </Button>
      </div>
      {userAnswer && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold">Your Answer:</h3>
          <p>{userAnswer}</p>
        </div>
      )}
    </div>
  );
};

export default RecordAnswerSection;