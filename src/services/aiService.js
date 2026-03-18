const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });

const ai_Reply = async (message, history = []) => {
  try {
    const chat = model.startChat({
      history: history
    });

    const result = await chat.sendMessage(message);
    return result.response.text();

  } catch (error) {
    throw new Error(error.message)
  }
};

module.exports = { ai_Reply };
