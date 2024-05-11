import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import messageModel from "../database/message";
import chatModel from "../database/chat";

export const initializeSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", ({ userId }) => {
      console.log(userId, "connected");
      socket.join(userId);
    });

    socket.on("sendMessage", async ({ text, sender, receiver }) => {
      try {
        console.log(sender,  "okk" , receiver);
        const conversation = await chatModel.findOne({
          members: { $all: [sender, receiver] },
        });


        if (conversation) {
          const newMessage = await messageModel.create({
            to: receiver,
            from: sender,
            conversationId: conversation?._id.toString(),
            text: text,
          });

          if (newMessage) {
            console.log(newMessage);
            
            
            io.to(sender).emit("newMessage", { newMessage });
            io.to(receiver).emit("newMessage", { newMessage });
          }
        }

        console.log("Message sent successfully.");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });
  });
};
