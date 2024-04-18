import socket from "../utils/socket";

import { useState, useEffect } from "react";
import { FlatList, TextInput, Button, Text, View } from "react-native";
import { Avatar } from "@rneui/themed";

import colorHash from "../utils/colorHash";

import { ChatScreenStyle as styles } from "../styles";

const ChatScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.getParent().setOptions({ title: `Chat (${username})` });

    socket.emit("username", username);

    socket.on("user_state_change", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("disconnect", () => {
      navigation.goBack();
    });

    return () => {
      socket.emit("user_disconnect");
    };
  }, [socket]);

  const sendMessage = () => {
    if (!message) return;

    socket.emit("message", message);

    const message_data = {
      username,
      message: `(You) ${username}: ${message}`,
      show_avatar: true,
    };

    setMessages((prevMessages) => [...prevMessages, message_data]);
    setMessage("");
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={messages}
          style={styles.list}
          renderItem={({ item }) => (
            <View style={styles.item_container}>
              {item.show_avatar && (
                <Avatar
                  size={32}
                  rounded
                  title={item.username.substring(0, 2).toUpperCase()}
                  containerStyle={{
                    backgroundColor: colorHash(item.username).rgb,
                  }}
                />
              )}
              <Text style={styles.item}>{item.message}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          value={message}
          onChangeText={setMessage}
        />
        <Button style={styles.button} title="Send" onPress={sendMessage} />
      </View>
    </>
  );
};

export default ChatScreen;
