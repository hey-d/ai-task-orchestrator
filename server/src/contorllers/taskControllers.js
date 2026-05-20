const model = require("../config/aiConfig");
const Task = require("../models/Task");

exports.analyzeTask = async (req, res) => {
  try {
    const { rawText, userId } = req.body;

    const prompt = `
      Extract task details from this text: "${rawText}".
      Return ONLY a JSON object with these keys:
      "title": (string), 
      "priority": high | medium | low, 
      "category": (string like 'Work', 'Personal', etc.)
      "estimatedTime": (string like '30 mins', '2 hours', etc.)
      
      Example output: {"title": "Buy groceries", "priority": "medium", "category": "Personal", "estimatedTime": "30 mins"}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanJson = response
      .text()
      .replace(/```json|```/g, "")
      .trim();
    const aiResult = JSON.parse(cleanJson);

    const newTask = new Task({
      userId: userId,
      title: aiResult.title,
      priority: aiResult.priority,
      category: aiResult.category,
      estimatedTime: aiResult.estimatedTime,
      rawInput: rawText,
    });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "failed to process task" });
  }
};


exports.getTasks = async (req, res) => {
  try {
    console.log(req.query);
    const {userId} = req.query;
    const tasks = await Task.find({userId}).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};