import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import colors from "../constants/colors";
import logo from "../assets/images/astro.jpg";

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <PageContainer>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "height" : undefined}
            keyboardVerticalOffset={100}
          >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={logo} resizeMode="contain" />
            </View>

            {isSignUp ? <SignUpForm /> : <SignInForm />}

            <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => setIsSignUp((prevState) => !prevState)}
            >
              <Text style={styles.link}>
                {isSignUp
                  ? "Have an account? Sign in here."
                  : "No account yet? Sign up here."}
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </PageContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  link: {
    color: colors.blue,
    fontFamily: "medium",
    letterSpacing: 0.3,
    marginBottom: 40,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    marginTop: 5,
  },
  image: {
    width: "25%",
  },
});

export default AuthScreen;
