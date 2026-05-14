const model = require("../config/aiConfig");
const Task = require("../models/Task");

exports.analyzeTask = async (req, res) => {
  try {
    const { taskDesc } = req.body;

    const prompt = `Analyze the following task ${taskDesc} and provide a detailed breakdown of what should be the priority of this task in the  user's timetable with the category that it will fit in and the estimated time it will take to complete the task. remeber to provide the output in a JSON format with the following keys: 
        "title": (string)
        "priority": (high, medium, low)
        "category": (work, personal, health, leisure, other)
        "estimatedTime: (in hours and minutes whatever suits you best for task, if it is under and hour give me minutes otherwise hours and minutes)
        example output: 
        {
            "title": "Complete project report",
            "priority": "high",
            "category": "work",
            "estimatedTime": "2 hours 30 minutes"
        }`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanJson = text.replace(/```json|```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(cleanJson);
    } catch (err) {
      console.error("JSON parse failed:", err);
      parsed = { raw: cleanJson }; // fallback
    }

    const newTask = new Task({
      title: parsed.title,
      priority: parsed.priority,
      category: parsed.category,
      estimatedTime: parsed.estimatedTime,
      rawInput: taskDesc,
    });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to process task" });
  }
};

exports.getTasks = async (req, res)=>{
  try{
    const tasks = await Task.find().sort({createdAt: -1});
    res.json(tasks);
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: "failed to fetch tasks" });
  }
}