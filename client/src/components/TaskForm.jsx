import React, { useState } from "react";

import axios from "axios";

const TaskForm = ({ userId, onTaskAdded}) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(text);
      console.log(userId);
      const response = await axios.post(
        "http://localhost:5000/api/tasks/analyze",
        { rawText: text,
          userId: userId
         },
      );
      onTaskAdded(response.data);
      setText("");
    } catch (error) {
      alert("AI analysis failed, please try again.");
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
          placeholder="Describe your task here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "AI is Analyzing..." : "✨ Magic Add Task"}
        </button>
      </form>
    </>
  );
};
export default TaskForm;
