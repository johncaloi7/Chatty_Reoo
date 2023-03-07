import { Feather, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import React, { useCallback, useReducer, useState } from "react";
import { Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import Input from "../components/Input";
import PageContainer from "../components/PageContainer";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import { useSelector } from "react-redux";
import colors from "../constants/colors";
import SubmitButton from "../components/SubmitButton";
import {
  updateSignedInUserData,
  userLogout,
} from "../utils/actions/authActions";
import { useDispatch } from "react-redux";
import { updateLoggedInUserData } from "../store/authSlice";
import ProfileImage from "../components/ProfileImage";

const SettingsScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const userData = useSelector((state) => state.auth.userData);

  const firstName = userData.firstName || "";
  const lastName = userData.lastName || "";
  const email = userData.email || "";
  const about = userData.about || "";

  const initialState = {
    inputValues: {
      firstName,
      lastName,
      email,
      about,
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );
  const saveHandler = useCallback(async () => {
    const updatedValues = formState.inputValues;

    try {
      setIsLoading(true);
      await updateSignedInUserData(userData.userId, updatedValues);

      dispatch(updateLoggedInUserData({ newData: updatedValues }));

      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [formState, dispatch]);

  const hasChanges = () => {
    const currentValues = formState.inputValues;

    return (
      currentValues.firstName != firstName ||
      currentValues.lastName != lastName ||
      currentValues.email != email ||
      currentValues.about != about
    );
  };
  return (
    <ScrollView>
      <PageContainer>
        <ProfileImage
          size={80}
          userId={userData.userId}
          uri={userData.profilePicture}
          showEditButton={true}
        />

        <Input
          id="firstName"
          label="First name"
          icon="user"
          style={{ marginTop: 18 }}
          autoCaptialize="none"
          iconPackage={FontAwesome5}
          onInputChanged={inputChangedHandler}
          initialValue={userData.firstName}
          errorText={formState.inputValidities["firstName"]}
        />
        <Input
          id="lastName"
          label="Last name"
          icon="user"
          autoCaptialize="none"
          iconPackage={FontAwesome5}
          onInputChanged={inputChangedHandler}
          initialValue={userData.lastName}
          errorText={formState.inputValidities["lastName"]}
        />
        <Input
          id="email"
          label="Email"
          icon="mail"
          autoCaptialize="none"
          keyboardType="email-address"
          iconPackage={Feather}
          onInputChanged={inputChangedHandler}
          initialValue={userData.email}
          errorText={formState.inputValidities["email"]}
        />
        <Input
          id="about"
          label="About"
          icon="question"
          autoCaptialize="none"
          iconPackage={FontAwesome}
          onInputChanged={inputChangedHandler}
          initialValue={userData.about}
          errorText={formState.inputValidities["about"]}
        />

        {showMessage && <Text>Saved!</Text>}

        {isLoading ? (
          <ActivityIndicator
            size={"small"}
            color={colors.primary}
            style={{ marginTop: 10 }}
          />
        ) : (
          hasChanges() && (
            <SubmitButton
              onPress={saveHandler}
              title="Save"
              disabled={!formState.formIsValid}
              style={{ marginTop: 25 }}
            />
          )
        )}

        <SubmitButton
          onPress={() => dispatch(userLogout())}
          title="Logout"
          color={colors.danger}
          style={{
            marginTop: 15,
            marginBottom: 60,
          }}
        />
      </PageContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#DADADA",
  },
});

export default SettingsScreen;
