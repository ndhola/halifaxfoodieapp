import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import firebase, { firestore } from "../../../services/firebase";
import { observeChat } from "../../../services/users/functions";
import moment from "moment";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

const UserChatWindow = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const lastMessageRef = useRef(null);

  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const ref = firestore
      .collection("chats")
      .doc(user.userDataKey)
      .collection("users")
      .doc(id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const { messages } = doc.data();
        setMessages(messages);
      } else {
        alert("no chat available");
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = observeChat(user.userDataKey, id, {
      next: (querySnapshot) => {
        if (querySnapshot.exists) {
          const updatedData = querySnapshot.data();
          setMessages(updatedData.messages);
        }
      },
      error: (err) => alert(err),
    });
    return unsubscribe;
  }, [id]);

  useEffect(() => {
    if (lastMessageRef && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [messages]);

  const sendMessage = () => {
    if (!message || message.replace(" ", "") === "") {
      alert("Invalid Message");
      return;
    }
    pushMessage(message, user.userDataKey, id);
  };

  const pushMessage = (message, id, userId) => {
    firestore
      .collection("chats")
      .doc(id)
      .collection("users")
      .doc(userId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          text: message,
          created: +new Date(),
          id: id,
        }),
      })
      .then(() => {
        setMessage("");
        console.log("message sent");
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <Grid item xs={9}>
        <List className={classes.messageArea}>
          {messages &&
            messages.map((message, index) => {
              return (
                <ListItem
                  key={index}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                >
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText
                        align={
                          message.id === user.userDataKey ? "right" : "left"
                        }
                        primary={message.text}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align={
                          message.id === user.userDataKey ? "right" : "left"
                        }
                        secondary={moment(message.created).calendar()}
                      ></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
        </List>
        <Divider />
        <Grid container style={{ padding: "20px" }}>
          <Grid item xs={11}>
            <TextField
              id="outlined-basic-email"
              label="Type Something"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid xs={1} align="right">
            <Fab onClick={() => sendMessage()} color="primary" aria-label="add">
              <SendIcon />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserChatWindow;
