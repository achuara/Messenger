

import React from 'react';
import "./messenger.css";
import Conversation from '../conversations/Conversation';
import Message from '../message/Message';
//import ChatOnline from '../chatOnline/ChatOnline';
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import CloseIcon from '@material-ui/icons/Close';


const Messenger = () => {

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [conversationColour, setconversationColour] = useState();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchedUserForConv, setSearchedUserForConv] = useState(1);


  const [reGetAllConversations, setReGetAllConversations] = useState(null);

  //const [onlineUsers, setOnlineUsers] = useState([]); 
  const socket = useRef();
  
  const user = JSON.parse(localStorage.getItem('profile')); // having user.result._id

  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("https://indianmessenger-server.onrender.com");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.result._id);
    socket.current.on("getUsers", (users) => {
      //console.log(users);
    });
  }, [user.result._id]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("https://indianmessenger-server.onrender.com/conversations/" + user.result._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.result._id, reGetAllConversations]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("https://indianmessenger-server.onrender.com/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.result._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user.result._id
    );

    socket.current.emit("sendMessage", {
      senderId: user.result._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("https://indianmessenger-server.onrender.com/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchUsers = async () =>{
      if(query !== "")
      {const res = await axios.get("https://indianmessenger-server.onrender.com/user/search/" + query);
      const d = res.data.filter((id) => id._id !== user.result._id);
      //console.log(d);
      setSearchedUsers(d);}
    }
    fetchUsers();
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    const fetchUsers = async () =>{
      if(searchedUserForConv!== 1){
        const p= {  senderId:user.result._id, receiverId: searchedUserForConv};

        if(Boolean(conversations.find(x => (x.members[0] === searchedUserForConv || x.members[1] === searchedUserForConv) )))
        {
          alert("user already added in conversation , click ok");
          setSearch(false);

        }
        if(!Boolean(conversations.find(x => (x.members[0] === searchedUserForConv || x.members[1] === searchedUserForConv) )))
        {
          setReGetAllConversations(searchedUserForConv);
          const res = await axios.post("https://indianmessenger-server.onrender.com/conversations",  p);
          setCurrentChat(res.data);
          setSearch(false);
          setReGetAllConversations(searchedUserForConv);
        }  
      }

    }
    fetchUsers();
    // eslint-disable-next-line
  }, [searchedUserForConv]);

  return (
    <>
     
      <div className="messenger">
        
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="input">
              <input 
                className="chatMenuInput"
                placeholder="..Search new friend to add in conversation" 
                onChange={(e)=> {setQuery(e.target.value);setSearch(true)}} 

              />
                <div className="button" onClick={() => setSearch(false)}>
                <CloseIcon/>
                </div>           
            </div>
            
            {search && <div className="chatBoxTop1">
                          {searchedUsers.map((c) => (
                            <div key={c._id} className="Searchedusers" onClick={() => setSearchedUserForConv(c._id)}>
                              <img className="SearchedusersImg"
                                 src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                 alt=""
                              />
                             <span className="SearchedusersName">{c?.name}</span>
                            </div>
                           ))
                          }
                        </div>
            }
            <div className="chatBoxTop2">
              {conversations.map((c) => (
                <div  key={c._id} onClick={() => {setCurrentChat(c); setconversationColour(c._id);}}>
                  <Conversation conversation={c} currentUser={user.result} idofcov ={conversationColour}/>
                </div>
              ))
             
              }
            </div>
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div key={m._id} ref={scrollRef}>
                      <Message message={m} own={m.sender === user.result._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">Select a friend to start a chat.</span>
            )}
          </div>
        </div>
        {/*<div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline/>
          </div>
        </div>*/}
      </div>
    </>
  );  

}
export default Messenger;
