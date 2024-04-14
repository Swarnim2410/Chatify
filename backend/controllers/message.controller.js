import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async (req, res) => {
  // console.log(req.body);
  try {
    const { message } = req.body;
    //id is receiver id
    const { id: receiverId } = req.params;
    //senderId is coming through protectRoute middleware
    const senderId = req.user._id;
    // console.log(req.user);

    //if a message is sent for the first time b/w there two, then create a new conversation..(by default, messages array is empty for a new conversation)
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // now create a new Message and push in messages array of conversation schema..
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save()
    // await newMessage.save()

    //instead of directly saving, use promise as it will save both conversation and newmessage parallely
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    //this is receiver Id..
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    //populate will automatically fetch the actual message corresponding to a particular message-id because we are storing message id in conversation instead of the actual message
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    // console.log(conversation);

    if (!conversation) {
      return res.status(201).json([]);
    }

    res.status(201).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessages", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
