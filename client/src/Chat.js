import React, { useEffect, useState } from 'react';
import ScrollToButtom from "react-scroll-to-bottom";


function Chat({socket, username, room}){
    const [CurrentMessage,setCurrentMessage] = useState("");
    const [message, setMessage] = useState([]);
    const sendMessage = async () =>{
        if (CurrentMessage !== ""){
            const messageData = {
                room: room,
                auther: username,
                message:CurrentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message",messageData);
            setMessage((list)=>
                [...list,messageData], // own message
            );
            setCurrentMessage("");
        }
    }

    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            console.log(data);
            setMessage((list)=>[...list,data]) //List means previous message and data is new message sented
        });
    },[socket]);

    return(
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToButtom className="message-container">
                {message.map((messageContent)=>{ // messageContent is data from backend
                    return <div className="message" id={username === messageContent.auther ? "you" : "other"}>
                        <div className="message-content">
                            <p>{messageContent.message}</p>
                        </div>
                        <div className="message-meta">
                            <p className='time'>{messageContent.time}</p>
                            <p className='author'>{messageContent.auther}</p>

                        </div>
                    </div>;
                })}
                </ScrollToButtom>
                

            </div>
            <div className="chat-footer">
                <input value={CurrentMessage} onKeyPress={(event)=>{
                    event.key === "Enter" && sendMessage();
                }} type="text" placeholder='Enter message' onChange={(event)=>{setCurrentMessage(event.target.value);}} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>

    )

}

export default Chat;