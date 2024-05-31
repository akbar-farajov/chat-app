import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase.config";

export const Chat = ({ room }) => {
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col justify-between gap-2 border pb-1 rounded-md h-[500px] max-h-[500px] box-border">
      <div className="bg-blue-600 text-white font-bold rounded-t-sm p-3">
        <h1 className="text-center">Welcome to: {room}</h1>
      </div>
      <div className=" overflow-y-auto px-1">
        {messages.map((message) => (
          <div key={message.id}>
            <h3 className="font-bold text-sm">{message.user}</h3>
            <div className="p-2 bg-gray-200 rounded-md mb-2 break-words text-gray-600">
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between gap-2 rounded-lg border px-1 py-2 mx-1"
      >
        <input
          placeholder="Enter message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 min-w-0"
        />
        <button
          className="bg-blue-600 px-2 py-1 rounded-md text-white"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};
