import { TextInput, Button, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Avatar } from "@rneui/themed";
import colorHash from "../utils/colorHash";

import { NicknameSelectionStyle as styles } from "../styles";

export default function NicknameSelectScreen({ navigation }) {
  const [username, setUsername] = useState("");

  const submitUsername = async () => {
    if (!username) return;

    await AsyncStorage.setItem("username", username);

    navigation.navigate("ChatScreen", {
      username,
    });
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem("username");

      if (storedUsername) {
        setUsername(storedUsername);
        navigation.navigate("ChatScreen", {
          username: storedUsername,
        });
      }
    };

    fetchUsername();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Avatar
          size={64}
          rounded
          title={username.substring(0, 2).toUpperCase()}
          containerStyle={{
            backgroundColor: colorHash(username).rgb,
          }}
        />
        <Text style={styles.title}>Enter your username</Text>
        <TextInput
          value={username}
          style={styles.input}
          placeholder="Enter your username"
          onChangeText={setUsername}
        />
        <Button style={styles.button} title="Submit" onPress={submitUsername} />
      </View>
    </>
  );
}
