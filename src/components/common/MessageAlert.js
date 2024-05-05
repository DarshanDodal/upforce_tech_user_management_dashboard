import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearSuccess } from "../../actions/userActions";

const MessageAlert = () => {
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const success = useSelector((state) => state.success);

  // Function to handle closing a message
  const handleClose = (id) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  };

  // Function to add a new message to the queue
  const addMessage = (severity, text) => {
    const id = Date.now(); // Unique ID for the message
    const message = { id, severity, text };
    setMessages((prevMessages) => [...prevMessages, message]);

    // Automatically remove the message after 5 seconds
    setTimeout(() => {
      handleClose(id);
    }, 5000);
  };

  // Watch for changes in error and success states
  useEffect(() => {
    if (error) {
      addMessage("error", error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      addMessage("success", success);
      dispatch(clearSuccess());
    }
  }, [success, dispatch]);

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      {messages.map((message) => (
        <Alert
          key={message.id}
          severity={message.severity}
          onClose={() => handleClose(message.id)}
        >
          {message.text}
        </Alert>
      ))}
    </Stack>
  );
};

export default MessageAlert;
