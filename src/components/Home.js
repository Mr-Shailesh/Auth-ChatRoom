import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

const Home = () => {
  const { logOut, user } = useUserAuth();

  const [users, setUsers] = useState([]);

  const userName = users.find((el) => el.email.toLowerCase() === user.email);
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
  }, []);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="form--all">
      <div className="p-4 box mt-3 text-center w-25 h-10">
        Hello !! <br />
        Welcome {userName && userName ? userName.name : user.email} !
      </div>
      <br />
      <div className="d-flex gap-2">
        <Link to="/chat" className="btn btn-success" variant="success">
          Go to Chat Room
        </Link>
        <Button variant="danger" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Home;
