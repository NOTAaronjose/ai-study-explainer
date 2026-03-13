"use client";

import { useState } from "react";

export default function TopicInput({ onExplain }: any) {
  const [topic, setTopic] = useState("");

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">

      <input
        type="text"
        placeholder="Enter a study topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border p-3 rounded"
      />

      <button
        onClick={() => onExplain(topic)}
        className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
      >
        Explain Topic
      </button>

    </div>
  );
}