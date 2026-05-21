import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm"; 
import TaskList from "./components/TaskList";
import "./App.css";

const getOrCreateUserId = ()=>{
  let userId = localStorage.getItem("userId");
  if(!userId){
    userId = "user-" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("userId", userId);
  }
  return userId;
}

function App() {
  const [tasks, setTasks] = useState([]);
  const userId = getOrCreateUserId();
  
  useEffect(()=>{
    fetchTasks();
  }, []);

  const fetchTasks = async ()=>{
    const res = await axios.get("https://ai-task-orchestrator-backend.onrender.com/api/tasks");
    setTasks(res.data);
  }

  return <>
    <div className="min-h-screen bg-gray-50 py-10 px-4 text-black">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Smart Task AI</h1>
        <TaskForm userId = {userId} onTaskAdded={(newTask)=>{
          setTasks(prev=>[newTask, ...prev]);
        }} />
        <TaskList tasks={tasks}/>
      </div>
    </div>
  </>
}

export default App;
