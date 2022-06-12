import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const onChange = (e) => setEmail(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset email");
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader"> Forgot Password</p>
      </header>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          className="emailInput"
          value={email}
          placeholder="email"
          id="email"
          onChange={onChange}
        />
        <Link className="forgotPasswordLink" to="sign-in">
          Sign In
        </Link>
        <div className="signInBar">
          <div className="signInText">Send Reset Link</div>
          <button type="submit" className="signInButton">
            <ArrowRightIcon fill="#ffffff" width="36px" height="36px" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
