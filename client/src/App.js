import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';


const socket = io.connect("http://localhost:3001");


function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setshowChat] = useState("");

  const joinRoom = () => {
    if (username != "" && room != "") {
      socket.emit("join_room", room);
      setshowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h2>Join the Chat Room</h2>
          <input type="text" placeholder='Name of you' onChange={(event) => { setUsername(event.target.value); }} />
          <input type="text" placeholder='Room Id' onChange={(event) => { setRoom(event.target.value); }} />
          <button onClick={joinRoom}>Join a Secret Room</button>
          </div>
      )
      :(
          <Chat socket={socket} username={username} room={room} />
      )}
        

    </div>
  );
}

export default App;
