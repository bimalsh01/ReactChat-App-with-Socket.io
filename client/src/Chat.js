import React, { useState } from 'react';

function Chat({socket, username, room}){
    const [CurrentMessage,setCurrentMessage] = useState("");
    
    const sendMessage = async () =>{
        if (CurrentMessage !== ""){
            const messageData = {
                room: room,
                auther: username,
                message:CurrentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message",messageData);
        }
    }

    return(
        <div>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className="chat-body">

            </div>
            <div className="chat-footer">
                <input type="text" placeholder='Enter message' onChange={(event)=>{setCurrentMessage(event.target.value);}} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>

    )

}

export default Chat;