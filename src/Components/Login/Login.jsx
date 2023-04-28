import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";
// import { Toaster, toast } from "react-hot-toast";

const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    // validation
    setError("");
    setSuccess("");
    if (!/(?=.*?[A-Z])/.test(password)) {
      setError("At least one UpperCase ");
      return;
    } else if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError("Please add a special ");
      return;
    } else if (password.length < 6) {
      setError("at list six letter");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        if (!loggedUser.emailVerified) {
          alert("Please enter valid email");
        }
        setSuccess("Login Successfully");
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  // password reset
  const handleResetPassword = (event) => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please Provide your email address to reset Password");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your email");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <div className="mx-auto w-50">
      <h2>PLease login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="w-50 mb-4 rounded ps-3"
          type="email"
          ref={emailRef}
          name="email"
          id="email"
          placeholder="Your Email"
          required
        />
        <br />
        <input
          className="w-50 mb-4 rounded ps-3"
          type="password"
          name="password"
          id="password"
          placeholder="Enter Your password"
          required
        />
        <br />
        <input className="btn btn-primary" type="submit" value="Login" />
      </form>
      <p>
        <small>
          Forget Password?Please{" "}
          <button onClick={handleResetPassword} className="btn btn-link">
            Reset Password
          </button>
        </small>
      </p>
      <p>
        <small>
          New to this Website? Please<Link to="/register">Register</Link>
        </small>
      </p>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Login;
