export const validateEmail = (email: string) => {
  if (!email) return "Email is required";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) ? "" : "Invalid email address";
}

export const validatePassword = (password: string) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  return "";
}

export const validateUsername = (username: string) => {
  if (!username) return "Username is required";
  if (username.length < 3) return "Username too short";
  if (!/^[a-zA-Z0-9_]+$/.test(username))
    return "Only letters, numbers, underscore allowed"
  return ""
}