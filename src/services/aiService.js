const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });

const ai_Reply = async (message, history = []) => {
  const prompt = `
Return ONLY one valid JSON object.

Rules:
1. Do NOT return multiple JSON objects
2. Do NOT return text outside JSON
3. "type" must be one of: "code", "list", "text"
4. If type = "list", content MUST be an array of strings
5. If type = "code", content MUST be a string
6. If type = "text", content MUST be a string
7. Add "language" only when type = "code"
8. Only include content directly related to the user query.
9. Do not add extra general knowledge or unrelated sections.

Format:
{
  "title": "",
  "sections": [
    {
      "heading": "",
      "description": "",
      "type": "",
      "content": "",
      "language": ""
    }
  ]
}

User query: ${message}
`;
  try {
    const chat = model.startChat({
      history: history
    });

    const result = await chat.sendMessage(prompt);
    return result.response.text();

  } catch (error) {
    throw new Error(error.message)
  }
};

module.exports = { ai_Reply };
