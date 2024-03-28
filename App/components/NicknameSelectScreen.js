import { TextInput, Button, View, Text } from "react-native";
import { useState } from "react";

import { NicknameSelectionStyle as styles } from "../styles";

export default function NicknameSelectScreen({ navigation }) {
  const [nickname, setNickname] = useState("");

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Enter your nickname</Text>
        <TextInput
          value={nickname}
          style={styles.input}
          placeholder="Enter your nickname"
          onChangeText={setNickname}
        />
        <Button
          style={styles.button}
          title="Submit"
          onPress={() => navigation.navigate("Chat", { username: nickname })}
        />
      </View>
    </>
  );
}
