export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "Username must be at least 5 characters with a max of 32 characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string!",
    },
  },
  displayName: {
    notEmpty: true,
  },
  password: {
    notEmpty: true,
  },
};

export const createBookValidationSchema = {
  title: {
    isLength: {
      options: { min: 1, max: 150 },
      errorMessage: "Title must be between 1 and 150 characters.",
    },
    isString: { errorMessage: "Title must be a string" },
  },
  author: {
    notEmpty: { errorMessage: "Author is required" },
  },
  pages: {
    isNumeric: { errorMessage: "Pages must be a number" },
    notEmpty: { errorMessage: "Pages are required" },
  },
  finished: {
    isBoolean: { errorMessage: "Finished must be a boolean value" },
    notEmpty: { errorMessage: "Finished is required" },
  },
};
