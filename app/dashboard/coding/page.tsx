'use client';
import React, { useState, useRef } from 'react';

function CodingInterviewPrep() {
    // Define questions, hints, and test cases
    const questions = [
        {
            question: "Write a function to reverse a string.",
            hints: [
                "Hint 1: Use a loop to reverse the characters.",
                "Hint 2: Try using string manipulation methods like split(), reverse(), and join().",
            ],
            testCases: [
                { input: "'hello'", expectedOutput: "olleh" },
                { input: "'world'", expectedOutput: "dlrow" },
            ],
        },
        {
            question: "Write a function to check if a number is prime.",
            hints: [
                "Hint 1: A prime number has no divisors other than 1 and itself.",
                "Hint 2: Check divisibility up to the square root of the number.",
            ],
            testCases: [
                { input: "7", expectedOutput: true },
                { input: "10", expectedOutput: false },
            ],
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [hintUsed, setHintUsed] = useState(0);
    const [hints, setHints] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [videoUrl, setVideoUrl] = useState(null);
    const videoRef = useRef(null);

    // Function to generate a new question
    const generateQuestion = () => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const selectedQuestion = questions[randomIndex];
        setCurrentQuestion(selectedQuestion);
        setHintUsed(0); // Reset hint count
        setHints([]); // Clear hints
        setOutput(""); // Clear previous output
    };

    // Function to start recording
    const startRecording = async () => {
        setIsRecording(true);
        setRecordedChunks([]); // Clear previous recorded chunks

        try {
            // Get user media (video and audio)
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks((prev) => prev.concat(event.data));
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                setVideoUrl(url); // Set the video URL for playback
                videoRef.current.src = url; // Set the video source to the recorded blob
                videoRef.current.controls = true; // Enable controls for the video
                videoRef.current.play(); // Play the recorded video
            };

            recorder.start();
        } catch (error) {
            console.error("Error accessing media devices.", error);
            setIsRecording(false); // Reset recording state on error
        }
    };

    // Function to stop recording
    const stopRecording = () => {
        setIsRecording(false);
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
    };

    // Function to run code and validate against test cases
    const runCode = () => {
        if (!currentQuestion) return;

        let results = [];

        currentQuestion.testCases.forEach((testCase) => {
            try {
                const userFunction = new Function('input', `
                    ${code}
                    return solution(input);
                `);
                const inputValue = eval(testCase.input.replace(/'/g, ''));
                const result = userFunction(inputValue);

                if (result === testCase.expectedOutput) {
                    results.push(`✅ Test Passed: Input(${testCase.input}) -> Output(${result})`);
                } else {
                    results.push(`❌ Test Failed: Input(${testCase.input}) -> Output(${result}) | Expected(${testCase.expectedOutput})`);
                }
            } catch (error) {
                results.push(`❌ Test Error: Input(${testCase.input}) -> Error(${error.message})`);
            }
        });

        setOutput(results.join('\n'));
    };

    // Example solution function for reversing a string
    function solution(input) {
        return input.split('').reverse().join('');
    }

    // Function to show hints
    const showHint = () => {
        if (currentQuestion) {
            if (hintUsed < currentQuestion.hints.length) {
                setHints((prevHints) => [...prevHints, currentQuestion.hints[hintUsed]]);
                setHintUsed(hintUsed + 1); // Increment hint used
            } else {
                console.log("No more hints available.");
            }
        } else {
            console.log("No current question set.");
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ color: '#4169E1' }}>Coding Interview Preparation</h1>
            <button onClick={generateQuestion} style={{ margin: '10px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Generate Question</button>
            {currentQuestion && (
                <div style={{ marginTop: '20px', textAlign: 'left' }}>
                    <p><strong>Question:</strong> {currentQuestion.question}</p>
                </div>
            )}
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your function here. Use 'solution' as the function name."
                style={{ width: '100%', height: '150px', marginTop: '10px', padding: '10px', fontSize: '16px' }}
            ></textarea>
            <div style={{ marginTop: '10px' }}>
                <button onClick={runCode} style={{ margin: '5px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>Run Code</button>
                <button onClick={showHint} style={{ margin: '5px', padding: '10px 20px', backgroundColor: '#FFA500', color: 'white', border: 'none', cursor: 'pointer' }}>Show Hint</button>
                <button onClick={isRecording ? stopRecording : startRecording} style={{ margin: '5px', padding: '10px 20px', backgroundColor: '#DC3545', color: 'white', border: 'none', cursor: 'pointer' }}>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
            </div>
            <div style={{ textAlign: 'left', marginTop: '20px' }}>
                {hints.map((hint, index) => (
                    <p key={index} style={{ color: '#555' }}>{hint}</p>
                ))}
            </div>
            <div style={{ marginTop: '20px', textAlign: 'left' }}>
                <h3>Output</h3>
                <pre style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>{output}</pre>
            </div>
            <video 
                ref={videoRef} 
                style={{ 
                    marginTop: '20px', 
                    width: '100%', 
                    borderRadius: '5px', 
                    float: 'left' // Align video to the left
                }} 
                src={videoUrl} 
                controls 
            />
            <div style={{ clear: 'both' }}></div> {/* Clear float to prevent layout issues */}
        </div>
    );
}

export default CodingInterviewPrep;
