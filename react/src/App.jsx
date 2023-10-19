import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);

  const executed = useRef(false);

  useEffect(() => {
    if (!executed.current) {
      const socket = new SockJS("http://localhost:8080/ws");
      const stomp = Stomp.over(socket);
      setStompClient(stomp);

      stomp.connect({}, () => {
        console.log("STOMP Connected");
        stomp.subscribe("/topic/room/123", (message) => {
          console.log(message);
          setMessages((prevMessages) => [...prevMessages, message.body]);
        });
      });

      executed.current = true;

      console.log("executed");

      return () => {
        if (stomp.connected) {
          stomp.disconnect();
        }
      };
    }
  }, []);

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const sendMessage = () => {
    if (stompClient && stompClient.connected && newMessage.trim() !== "") {
      stompClient.send("/app/room/123", {}, newMessage);
      setNewMessage("");
    } else {
      console.error("STOMP connection is not established yet.");
    }
  };

  return (
    <div>
      <h2>Chat Application</h2>
      <div style={{ marginBottom: "10px" }}>
        <input type="text" value={newMessage} onChange={handleMessageChange} />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h3>Chat History:</h3>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
