const Chat = require("./../models/chatModel")
const Message = require("./../models/messageModel")

const sendMessage = async (req, res) =>{
    try {
        const {chatId, message, userId} = req.body

        // 🟢 1. Create or Find Chat
        let chat
        if(!chatId){
            chat = await Chat.create({
                user : userId,
                title: message.substring(0, 30) // first message as title
            })
        }else {
            chat = await Chat.findById(chatId)

            if (!chat) {
                return res.status(404).json({
                    success: false,
                    message: "Chat not found"
                })
            }
        }

        // 🟢 2. Save User Message

        const userMessage = await Message.create({
            chat : chat._id,
            sender : "user",
            content : message
        })

        // 🟢 3. Get Previous Messages (for AI context)
        const messages = await Message.find({ chat: chat._id })
            .sort({ createdAt: 1 })

        // 🟢 4. Format for AI
        const formattedMessages = messages.map(msg => ({
            role: msg.sender,
            content: msg.content
        }))
        
        // 🟢 5. Generate AI Response (mock for now)
        const aiReply = "This is AI response" 

        // 🟢 6. Save AI Message
        const aiMessage = await Message.create({
            chat : chat._id,
            sender : "assistant",
            content : aiReply
        })


        // 🟢 7. Send Response
        res.status(200).json({
            message : "Conversation happen successfully",
            success: true,
            chatId: chat._id,
            data: {
                userMessage,
                aiMessage
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {sendMessage}