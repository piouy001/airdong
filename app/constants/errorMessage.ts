export const getEmailErrorMessages = (): Record<string, string> => ({
  "any.empty": "Email is required.",
  "string.email": "Enter a valid email.",
});

export const getNameErrorMessages = (): Record<string, string> => ({
  "any.empty": "Name is required.",
  "string.min": "Name must be at least 2 characters",
  "string.max": "Name must be at most 12 characters",
});

export const getPasswordErrorMessages = (): Record<string, string> => ({
  "any.empty": "Password is required.",
  "string.min": "Password must be at least 10 characters",
  numbers: "Password must include numbers",
});
