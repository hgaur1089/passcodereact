import React, { useEffect, useState } from "react";
import "./styles.css";

function SignupForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  useEffect(() => {
    if (userName) {
      checkUserName();
    }
    if (email) {
      checkEmail();
    }
    if (password) {
      checkPassword();
    }
    if (confirmPassword) {
      checkConfirmPassword();
    }
  }, [userName, email, password, confirmPassword]);

  const checkUserName = () => {
    if (userName.length < 3 || userName.length > 25) {
      setUserNameError("Username must be between 3 and 25 characters");
      return false;
    } else {
      setUserNameError("");
      return true;
    }
  };

  const checkEmail = () => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(email)) {
      setEmailError("");
      return true;
    } else {
      setEmailError("Please enter a valid email");
      return false;
    }
  };

  const checkPassword = () => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (regex.test(password)) {
      setPasswordError("");
      return true;
    } else {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one number and one special character"
      );
      return false;
    }
  };

  const checkConfirmPassword = () => {
    if (password === confirmPassword) {
      setConfirmPasswordError("");
      return true;
    } else {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "userName") {
      setUserName(value);
      // checkUserName();
    } else if (id === "email") {
      setEmail(value);
      // checkEmail();
    } else if (id === "password") {
      setPassword(value);
      // checkPassword();
    } else if (id === "confirmPassword") {
      setConfirmPassword(value);
      // checkConfirmPassword();
    }
  };

  const togglePassword = (e) => {
    const { id } = e.target;
    if (id === "togglePassword") {
      if (passwordType === "password") {
        setPasswordType("text");
        return;
      }
      setPasswordType("password");
    } else {
      if (confirmPasswordType === "password") {
        setConfirmPasswordType("text");
        return;
      }
      setConfirmPasswordType("password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      checkUserName() &&
      checkEmail() &&
      checkPassword() &&
      checkConfirmPassword()
    ) {
      alert("Form Submitted Successfully");
    } else {
      alert("Check the form for errors");
    }
  };

  return (
    <div className="form-container">
      <form action="" method="POST">
        <h3>Sign Up Here</h3>
        <label htmlFor="username">Userame</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={handleInputChange}
          placeholder="Enter username"
          required
        />
        {userNameError && (
          <span className="usernameAlert">{userNameError}</span>
        )}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
        />
        {emailError && <span className="emailAlert">{emailError}</span>}

        <label htmlFor="password">Password</label>
        <div className="passwordDiv">
          <input
            type={passwordType}
            id="password"
            value={password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
          {passwordType === "password" ? (
            <i
              className="fa-solid fa-eye-slash"
              id="togglePassword"
              onClick={togglePassword}
            ></i>
          ) : (
            <i
              className="fa-solid fa-eye"
              id="togglePassword"
              onClick={togglePassword}
            ></i>
          )}
        </div>
        {passwordError && (
          <span className="passwordAlert">{passwordError}</span>
        )}

        <label htmlFor="confirm-password">Confirm Password</label>
        <div className="passwordDiv">
          <input
            type={confirmPasswordType}
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
          />
          {confirmPasswordType === "password" ? (
            <i
              className="fa-solid fa-eye-slash"
              id="toggleConfirmPassword"
              onClick={togglePassword}
            ></i>
          ) : (
            <i
              className="fa-solid fa-eye"
              id="togglePassword"
              onClick={togglePassword}
            ></i>
          )}
        </div>
        {confirmPasswordError && (
          <span className="confirmPasswordAlert">{confirmPasswordError}</span>
        )}
        <button onClick={handleSubmit} type="button">
          Sign Up
        </button>
      </form>
    </div>
  );
}
export default SignupForm;
