import { View, Text, FlatList } from "react-native";
import { ChatScreenStyle as styles } from "../styles";
import { useEffect } from "react";

const UsersList = ({ navigation }) => {
  const users = ["User 1", "User 2", "User 3", "User 4", "User 5"];

  useEffect(() => {
    console.log("Users List Mounted");
    navigation.getParent().setOptions({ title: `Users List` });
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item_container}>
            <Text style={styles.item_text}>{item}</Text>
          </View>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default UsersList;
