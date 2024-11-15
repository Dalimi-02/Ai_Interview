"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard"

const InterviewList = () => {
  const { user } = useUser();
  const [InterviewList, setInterviewList] = useState([]);
  useEffect(() => {
    user && GetInterviewList();
  }, [user]);
  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));

    console.log(
      "🚀 ~ file: InterviewList.jsx:14 ~ GetInterviewList ~ GetInterviewList:",
      GetInterviewList
    );
    setInterviewList(result)
  };

  const handleDelete = async (id) => {
    // Call the delete function from your database or API
    await db
      .delete(MockInterview)
      .where(eq(MockInterview.id, id));
    
    // Refresh the interview list after deletion
    GetInterviewList();
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {InterviewList&&InterviewList.map((interview,index)=>(
            <div key={interview.id}>
                <InterviewItemCard interview={interview} />
                <button onClick={() => handleDelete(interview.id)} className="bg-red-400 text-white py-1 px-2 rounded mt-2">Delete</button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewList;
