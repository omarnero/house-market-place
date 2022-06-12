import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = formData;
  const onChange = (e) => {
    setFromData((prevstate) => {
      return { ...prevstate, [e.target.id]: e.target.value };
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back!</p>
      </header>
      <form onSubmit={onSubmit}>
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
        <div className="signInBar">
          <p className="signInText">Sign In</p>
          <button className="signInButton">
            <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
          </button>
        </div>
      </form>
      <OAuth />
      <Link to="/sign-up" className="registerLink">
        Sign Up Instead
      </Link>
    </div>
  );
}

export default SignIn;
