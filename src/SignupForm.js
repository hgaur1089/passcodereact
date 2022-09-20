import React, { useState } from "react";
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

  const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const validateUserName = (userName) => {
    return userName.length > 3 && userName.length < 25;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password === confirmPassword) {
      return true;
    }
    return false;
    // return password === confirmPassword;
  };

  const checkUserName = () => {
    if (userName === null || userName === "") {
      setUserNameError("Username cannot be empty");
    } else if (!validateUserName(userName)) {
      setUserNameError("Username must be between 3 and 25 characters");
    } else {
      setUserNameError(null);
      return true;
    }
    return false;
  };

  const checkEmail = () => {
    if (email === null || email === "") {
      setEmailError("Email cannot be empty");
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError(null);
      return true;
    }
    return false;
  };

  const checkPassword = () => {
    if (password === null || password === "") {
      setPasswordError("Password cannot be empty");
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character."
      );
    } else {
      setPasswordError(null);
      return true;
    }
    return false;
  };

  const checkConfirmPassword = () => {
    if (confirmPassword === null || confirmPassword === "") {
      setConfirmPasswordError("Confirm Password cannot be empty");
    } else if (!validateConfirmPassword(password, confirmPassword)) {
        console.log("password", confirmPassword);
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError(null);
      return true;
    }
    return false;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "userName") {
      setUserName(value);
      checkUserName();
    }
    if (id === "email") {
      setEmail(value);
      checkEmail();
    }
    if (id === "password") {
      setPassword(value);
      checkPassword();
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
      checkConfirmPassword();
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
        <label for="username">Userame</label>
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

        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
        />
        {emailError && <span className="emailAlert">{emailError}</span>}

        <label for="password">Password</label>
        <div className="password">
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

        <label for="confirm-password">Confirm Password</label>
        <div className="password">
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
