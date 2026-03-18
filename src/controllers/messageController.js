const { ai_Reply } = require("../services/aiService");
const Chat = require("./../models/chatModel");
const Message = require("./../models/messageModel");

const sendMessage = async (req, res) => {
  try {
    const { chatId, message, userId } = req.body;

    // check if message is empty
    if (!message) throw new Error("Message must not be empty!");

    let chat;
    let aiReply;

    // for new chatId
    if (!chatId) {
      // Generate AI Response for fresh chat
      aiReply = await ai_Reply(message);

      // create new chat
      chat = await Chat.create({
        user: userId,
        title: message.substring(0, 30), // first message as title
      });
    }
    //  for existing chatId
    else {
      chat = await Chat.findById(chatId);
      // check for valied chatId
      if (!chat) {
        return res.status(404).json({
          success: false,
          message: "Chat not found",
        });
      }

      // Get Previous Messages for AI
      const messages = await Message.find({ chat: chat._id })
        .sort({
          createdAt: 1,
        })
        .limit(10);

      // Format Previous Messages for AI
      const formattedMessages = messages.map((msg) => ({
        role: msg.sender == "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));
      
      //   Generate AI Response according to previous chat
      aiReply = await ai_Reply(message, formattedMessages);
    }

    // 5. Save User Message

    const userMessage = await Message.create({
      chat: chat._id,
      sender: "user",
      content: message,
    });

    // 6. Save AI Message
    const aiMessage = await Message.create({
      chat: chat._id,
      sender: "assistant",
      content: aiReply,
    });

    // 7. Send Response
    res.status(200).json({
      message: "Conversation happen successfully",
      success: true,
      chatId: chat._id,
      data: {
        userMessage,
        aiMessage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { sendMessage };
