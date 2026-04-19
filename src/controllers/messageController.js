const { ai_Reply } = require("../services/aiService");
const Chat = require("./../models/chatModel");
const Message = require("./../models/messageModel");
const Project = require("./../models/projectModel");

const sendMessage = async (req, res) => {
  try {
    const userId = req.user
    const { projectId, chatId } = req.params;
    const { message } = req.body;

    // check if message is empty
    if (!message) throw new Error("Message must not be empty!");

    let chat;
    let aiReply;

    // for new chatId
    if (!chatId) {

      // Generate AI Response for fresh chat
      aiReply = await ai_Reply(message);

      let project;

      // if not project id
      if (!projectId) {

        // Default Project
        project = await Project.findOne({ isDefault: true, user : userId });

        if (!project) {
          project = await Project.create({
            name: "Generat Chat",
            user: userId,
            isDefault: true,
          });
        }
      } else {
        project = await Project.findById(projectId);
      }

      // create new chat
      chat = await Chat.create({
        user: userId,
        title: message.substring(0, 30), 
        project: project._id,
      });

    }
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

      // Generate AI Response according to previous chat
      aiReply = await ai_Reply(message, formattedMessages);

    }

    // Save User Message
    const userMessage = await Message.create({
      chat: chat._id,
      sender: "user",
      content: message,
    });

    // Save AI Message
    const aiMessage = await Message.create({
      chat: chat._id,
      sender: "assistant",
      content: aiReply,
    });

    // Send Response
    res.status(200).json({
      message: "Conversation happen successfully",
      success: true,
      chat,
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

const getAllChat = async (req,res) => {
  try {
    const userId = req.user
    let  {projectId} = req.params

    // if not projectId
    if(!projectId) {
      const project = await Project.findOne({isDefault : true, user : userId})

      // if not default project
      if(!project){
        res.status(400).json({
          message : "There is no general chat available",
          success : false
        })
        return
      }
      projectId = project._id
    }

    const chats = await Chat.find({project : projectId, user : userId}).sort({ createdAt: 1 })

    res.status(200).json({
      message : "Get Chat Successfully!",
      success : true,
      data : chats
    })

  } catch (error) {
    
  }
}

const getChatMessage = async (req, res) => {
  try {
    const {chatId} = req.params
    const messages = await Message.find({ chat: chatId })
        .sort({
          createdAt: 1,
        })
        .limit(10);
    res.status(200).json({
      success: true,
      message: "Get chat messages",
      data: messages
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = { sendMessage, getAllChat, getChatMessage };


