import React, { forwardRef } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./Message.css";

const Message = forwardRef(({ username, detail }, ref) => {
  const isUser = username === detail.username;

  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <Card className={isUser ? "message__userCard" : "message__guestcard"}>
        <CardContent>
          <Typography variant="h5" component="h2" className="messageLength">
            <b>{!isUser && `${detail.username || "Unknown User"} : ${" "}`}</b>
            {detail.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
