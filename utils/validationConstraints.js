import { validate } from "validate.js";

export const validateLength = (id, value, minLength, maxLength, allowEmpty) => {
  const constraints = {
    presence: { allowEmpty },
  };

  if (!allowEmpty || value !== "" || value !== " ") {
    constraints.length = {};

    if (minLength != null) {
      constraints.length.minimum = minLength;
    }

    if (maxLength != null) {
      constraints.length.maximum = maxLength;
    }
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints });

  return validationResult && validationResult[id];
};

export const validateString = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== "" && value !== " ") {
    constraints.format = {
      pattern: "[a-z]*",
      flags: "i",
      message: "can only contain letters",
    };
  }

  const validationResults = validate({ [id]: value }, { [id]: constraints });

  return validationResults && validationResults[id];
};

export const validateEmail = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== "" && value !== " ") {
    constraints.email = true;
  }

  const validationResults = validate({ [id]: value }, { [id]: constraints });

  return validationResults && validationResults[id];
};

export const validatePassword = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== "" && value !== " ") {
    constraints.length = {
      minimum: 6,
      message: "must be at least 6 characters",
    };
  }

  const validationResults = validate({ [id]: value }, { [id]: constraints });

  return validationResults && validationResults[id];
};
