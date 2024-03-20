export const formValidator = ({ userName, email, password }, isLogin) => {
  const newError = { userName: "", email: "", password: "", isLogin : isLogin, isValid: true };

  if (!isLogin && !userName) {
    newError.userName = "Please enter username";
    newError.isValid = false;
  }
  if (!isLogin && (!email || !validateEmail(email))) {
    newError.email = "Please enter valid email";
    newError.isValid = false;
  }
  if (!password || password.length < 8) {
    newError.password = "Please enter valid password more or equal to 8 char";
    newError.isValid = false;
  }

  return newError;
};

//validate email
const validateEmail = (email) => {
  return email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
};
