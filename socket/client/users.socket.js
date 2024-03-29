const User = require("../../models/user.model");
module.exports = (res) => {
  // get user_id from middleware
  _io.once("connection", (socket) => {
    //Function send add friend request
    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
      //myUserId=A    userId=B

      //Add id acceptFriends to userId
      const existAinB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId,
      });
      if (!existAinB) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $push: { acceptFriends: myUserId },
          }
        );
      }

      //Add id requestFriends to myUserId
      const existBinA = await User.findOne({
        _id: myUserId,
        requestFriends: userId,
      });
      if (!existBinA) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $push: { requestFriends: userId },
          }
        );
      }
      //Get length acceptFriends of userId and return for userId
      const infoUserB = await User.findOne({ _id: userId });
      const lengthAcceptFriends = infoUserB.acceptFriends.length;
      socket.broadcast.emit("SEVER_RETURN_ACCEPT_FRIEND_LENGTH", {
        userId: userId,
        lengthAcceptFriends: lengthAcceptFriends,
      });

      //Extract info A(myUserId) and return for B(userId)
      const infoUserA = await User.findOne({ _id: myUserId }).select(
        "id avatar fullName"
      );
      socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
        userId: userId,
        infoUserA: infoUserA,
      });
    });
    //End function send add friend request

    //Function send cancel friend request
    socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
      //myUserId=A    userId=B

      //Remove id of myUserId  in acceptfriends of userID
      const existAinB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId,
      });
      if (existAinB) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $pull: { acceptFriends: myUserId },
          }
        );
      }

      //Remove id of userId  in requestFriends of myUserId
      const existBinA = await User.findOne({
        _id: myUserId,
        requestFriends: userId,
      });
      if (existBinA) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $pull: { requestFriends: userId },
          }
        );
      }
      //Get length acceptFriends of userId and return for userId
      const infoUserB = await User.findOne({ _id: userId });
      const lengthAcceptFriends = infoUserB.acceptFriends.length;
      socket.broadcast.emit("SEVER_RETURN_ACCEPT_FRIEND_LENGTH", {
        userId: userId,
        lengthAcceptFriends: lengthAcceptFriends,
      });

      // Extract info of A(myUserId) and return for B (userId)
      socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND", {
        userIdB: userId,
        userIdA: myUserId,
      });

      // End Extract info of A(myUserId) and return for B (userId)
    });
    //End function send cancel friend request

    //Function send cancel friend request
    socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
      //myUserId=B    userId=A

      //Remove id of userId  in acceptfriends of myUserId
      const existAinB = await User.findOne({
        _id: myUserId,
        acceptFriends: userId,
      });
      if (existAinB) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $pull: { acceptFriends: userId },
          }
        );
      }

      //Remove id of myUserId  in requestFriends of userId
      const existBinA = await User.findOne({
        _id: userId,
        requestFriends: myUserId,
      });
      if (existBinA) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $pull: { requestFriends: myUserId },
          }
        );
      }
    });
    //End function send cancel friend request

    //Function accept friend request
    socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
      //myUserId=B    userId=A

      // Push {user_id, room_chat_id} of userId into myUserId's friendList
      //Remove id of userId  in acceptfriends of myUserId
      const existAinB = await User.findOne({
        _id: myUserId,
        acceptFriends: userId,
      });
      if (existAinB) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $push: {
              friendList: {
                user_id: userId,
                room_chat_id: "",
              },
            },
            $pull: { acceptFriends: userId },
          }
        );
      }

      // Push {user_id, room_chat_id} of myUserId into userId's friendList
      //Remove id of myUserId  in requestFriends of userId
      const existBinA = await User.findOne({
        _id: userId,
        requestFriends: myUserId,
      });
      if (existBinA) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $push: {
              friendList: {
                user_id: myUserId,
                room_chat_id: "",
              },
            },
            $pull: { requestFriends: myUserId },
          }
        );
      }
    });
    //End function accept friend request
  });
};
