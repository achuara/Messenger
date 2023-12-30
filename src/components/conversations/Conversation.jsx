

import { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";

export default function Conversation({conversation, currentUser, idofcov}) {

  const [user, setUser] = useState(null);
  // eslint-disable-next-line
  const [online, setOnline] = useState(false);
  //console.log("check start co stn");
  //console.log(conversation._id);
  //console.log("check end co stn");

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {

        const res = await axios.get("http://localhost:5000/user/" + friendId);
        const res2 = await axios.get("http://localhost:5000/user/online/" + friendId);
        setOnline(res2.data );
        //console.log("online " + res2.data );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  useEffect(() => {

  }, [currentUser]);

  
  return (
    idofcov === conversation._id ? (
      
      online === true?(
        <div className="conversation">
          
          <img className="conversationImg"
            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
          <span className="conversationName">{user?.name}</span>
        </div>

      ):(
        <div className="conversation">
          <img className="conversationImg"
            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <span className="conversationName">{user?.name}</span>
        </div>

      )
        
    ):(

      online === true?(
        <div className="conversation1">
           <img className="conversationImg"
             src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
             alt=""
           />
           <div className="chatOnlineBadge"></div>
           <span className="conversationName">{user?.name}</span>
        </div>

      ):(
        <div className="conversation1">
           <img className="conversationImg"
             src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
             alt=""
           />
           <span className="conversationName">{user?.name}</span>
        </div>

      )
   
  )
  
  );
}
