import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import colors from "../constants/colors";
import ProfileImage from "./ProfileImage";

const ProfileItem = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container}>
        <ProfileImage style={styles.image} uri={props.image} size={40} />

        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {props.title}
          </Text>

          <Text numberOfLines={1} style={styles.subTitle}>
            {props.subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: colors.extraLightGrey,
    borderBottomWidth: 1,
    minHeight: 50,
  },
  image: {
    marginTop: 0,
  },
  textContainer: {
    marginLeft: 14,
  },
  title: {
    fontFamily: "medium",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  subTitle: {
    fontFamily: "regular",
    color: colors.grey,
    letterSpacing: 0.3,
  },
});

export default ProfileItem;
