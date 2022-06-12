import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import OAuth from "../components/OAuth";
function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFromData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { email, password, name } = formData;
  const onChange = (e) => {
    setFromData((prevstate) => {
      return { ...prevstate, [e.target.id]: e.target.value };
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with registration");
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back!</p>
      </header>
      <form onSubmit={onSubmit}>
        <input
          type="name"
          placeholder="name"
          id="name"
          className="nameInput"
          value={name}
          onChange={onChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="emailInput"
          value={email}
          onChange={onChange}
        />
        <div className="passwordInputDiv">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            id="password"
            className="passwordInput"
            value={password}
            onChange={onChange}
          />
          <img
            src={visibilityIcon}
            alt="show password"
            className="showPassword"
            onClick={() => {
              setShowPassword((prevstate) => !prevstate);
            }}
          />
        </div>
        <Link className="forgotPasswordLink" to="/forgot-password">
          Forgot Password
        </Link>
        <div className="signUpBar">
          <p className="signUpText">Sign Up</p>
          <button className="signUpButton">
            <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
          </button>
        </div>
      </form>
      <OAuth />
      <Link to="/sign-in" className="registerLink">
        Sign In Instead
      </Link>
    </div>
  );
}

export default Signup;
