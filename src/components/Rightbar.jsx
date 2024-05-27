import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Home.css';

const Rightbar = () => {
  const [userList, setUserList] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [isFriend, setIsFriend] = useState([]);

  useEffect(() => {
    const getUserList = async () => {
      try {
        const res = await axios.get('http://localhost:3001/users/', {
          headers: {
            "authorization": localStorage.getItem("token")
          }
        });
        if (res.status === 200) {
          setUserList(res.data);

          // Determine the initial follow/unfollow status
          const initialIsFriend = res.data.map(u =>
            userFriends.some(friend => friend._id === u._id)
          );
          setIsFriend(initialIsFriend);
        }
      } catch (err) {
        console.log("Failed to get user list", err);
      }
    };
    getUserList();
  }, [userFriends]);

  useEffect(() => {
    const getuserFriend = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const res = await axios.get(`http://localhost:3001/users/${userId}/friends`, {
          headers: {
            "authorization": localStorage.getItem("token")
          }
        });

        if (res.status === 200) {
          setUserFriends(res.data);
        }
      } catch (err) {
        console.log("Failed to fetch friends", err);
      }
    };
    getuserFriend();
  }, []); // Run this effect only once when the component mounts

  useEffect(() => {
    console.log("Updated userFriends:", userFriends);
  }, [userFriends]); // Log userFriends whenever it changes

  const addFriend = async (friendId, index) => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.patch(
        `http://localhost:3001/users/${userId}/${friendId}`,
        null,
        {
          headers: {
            "authorization": localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 200) {
        console.log("Is Friend:", res.data.isFriend);

        // Update the specific element in the array
        setIsFriend(prevState => {
          const newState = [...prevState];
          newState[index] = res.data.isFriend;
          return newState;
        });
      } else {
        console.log("Failed to add friend");
      }
    } catch (err) {
      console.log("Error adding friend", err);
    }
  };

  return (
    <div>
      {userList.map((u, index) => (
        u._id !== localStorage.getItem("userId") && (
          <div className='rightbar' key={u.userName}>
            <div className='right-bar-data'>{u.userName}</div>
            <div className='right-bar-data-2' onClick={() => addFriend(u._id, index)}>
              {isFriend[index] ? "Unfollow" : "Follow"}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default Rightbar;
