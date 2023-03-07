import React, { useReducer, useCallback, useState, useEffect } from "react";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import { Feather } from "@expo/vector-icons";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import { signIn } from "../utils/actions/authActions";
import { ActivityIndicator, Alert } from "react-native";
import { useDispatch } from "react-redux";
import colors from "../constants/colors";

const testMode = true;

const SignInForm = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const initialState = {
    inputValues: {
      email: testMode ? "tuna@example.com" : "",
      password: testMode ? "password" : "",
    },
    inputValidities: {
      email: testMode,
      password: testMode,
    },
    formIsValid: testMode,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true);

      const action = signIn(
        formState.inputValues.email,
        formState.inputValues.password
      );
      setError(null);
      await dispatch(action);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Okay" }]);
    }
    setError(null);
  }, [error]);
  return (
    <>
      <Input
        id="email"
        label="Email"
        icon="mail"
        keyboardType="email-address"
        autoCaptialize="none"
        iconPackage={Feather}
        onInputChanged={inputChangedHandler}
        initialValue={formState.inputValues.email}
        errorText={formState.inputValidities["email"]}
      />
      <Input
        id="password"
        label="Password"
        icon="lock"
        autoCaptialize="none"
        secureTextEntry
        iconPackage={Feather}
        onInputChanged={inputChangedHandler}
        initialValue={formState.inputValues.password}
        errorText={formState.inputValidities["password"]}
      />
      {isLoading ? (
        <ActivityIndicator
          size={"small"}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <SubmitButton
          onPress={authHandler}
          title="Sign in"
          disabled={!formState.formIsValid}
          style={{ marginTop: 20 }}
        />
      )}
    </>
  );
};

export default SignInForm;
