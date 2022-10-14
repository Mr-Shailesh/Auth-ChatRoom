import React, { useEffect, useState } from "react";
import "./ChatRoom.css";
import { FormControl, Input } from "@mui/material";
import Message from "./Message";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  // getDocs,
  orderBy,
  // query,
  onSnapshot,
  query,
} from "firebase/firestore";
import FlipMove from "react-flip-move";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import { serverTimestamp } from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function ChatRoom() {
  const [input, setInput] = useState("");
  const [details, setDetails] = useState([]);
  const [username, setUsername] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [users, setUsers] = useState([]);

  const { logOut, user } = useUserAuth();

  const userName = users.find((el) => el?.email?.toLowerCase() === user?.email);

  const collectRef = collection(db, "Messages");

  //  Get the Data
  const getData = () => {
    const unsub = onSnapshot(
      collection(db, "Users"),
      (snapshot) => {
        let list = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUsers(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  //  get all the data

  const q = query(collection(db, "Messages"), orderBy("timestamp", "desc"));

  const getAllData = () => {
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        let list = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setDetails(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  };

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line
  }, []);

  const emojiBtn = () => {
    setEmoji(!emoji);
  };

  useEffect(() => {
    setUsername(userName ? userName?.name : user.email);

    console.log("You are not allow to write foul language  ");
  }, [userName?.name, user, userName]);

  const sendMessege = async (e) => {
    e.preventDefault();

    await addDoc(collectRef, {
      message: input,
      username: username,
      timestamp: serverTimestamp(),
    });

    setDetails([...details, { username: username, message: input }]);
    setInput("");
  };

  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="Chat">
      <div className="header">
        <img
          className="image"
          src="https://cdn.pixabay.com/photo/2021/03/02/12/03/messenger-6062243_1280.png?"
          alt="Logo"
        />
        <h2>Welcome {username ? username : user?.email}</h2>
        <Button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <h1>Hello Nutz 🚀</h1>

      {/* style={{position: "relative" padding-bottom: "100px"}} */}
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <IconButton onClick={emojiBtn}>
            <SentimentSatisfiedOutlinedIcon />
          </IconButton>

          <IconButton
            className="app__iconButton"
            variant="contained"
            color="primary"
            disabled={!input}
            type="submit"
            onClick={sendMessege}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <span className="d-flex justify-content-end">
        {emoji ? <Picker data={data} onEmojiSelect={console.log} /> : null}
      </span>

      <FlipMove
        style={{
          position: "relative",
          paddingBottom: "100px",
        }}
      >
        {details &&
          details.map((detail, id) => {
            return <Message key={id} username={username} detail={detail} />;
          })}
      </FlipMove>
    </div>
  );
}

export default ChatRoom;
