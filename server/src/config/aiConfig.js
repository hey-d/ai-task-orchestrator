const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key);

const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
});

module.exports = model;
