const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });

const aiService = async () => {
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          { text: "How do I fix the 404 error in the movie fetch function?" },
        ],
      },
      {
        role: "model",
        parts: [
          { text: "Check the API endpoint URL in your useEffect hook..." },
        ],
      },
      // Add more previous turns here to maintain context
    ],
  });

  const result = await chat.sendMessage(
    "Now, help me implement the search bar for these movies.",
  );
  console.log(result.response.text());
};

module.exports = {aiService}