import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";
// import { Toast } from "bootstrap";

const auth = getAuth(app);

const Register = () => {
  //   const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password, name);

    //   validate

    if (!/(?=.*?[A-Z])/.test(password)) {
      setError("At least one upper case");
      return;
    } else if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError("At least one special characte");
      return;
    } else if (password.length < 6) {
      setError("Please at least six");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        form.reset();
        setSuccess("user has been created");
        sendVerificationEmail(result.user);
        updateUserData(result.user, name);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  const sendVerificationEmail = (email) => {
    sendEmailVerification(user).then((result) => {
      alert("please verify your Mail");
    });
  };

  const updateUserData = (user, name) => {
    up(user, {
      displayName: name,
    })
      .then(() => {
        console.log("user name updated");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleEmailChange = (event) => {
    // setEmail(event.target.value);
  };

  const handlePasswordBlur = (event) => {};

  return (
    <div className="w-50 mx-auto ">
      <h2 className="fw-semibold text-secondary">Please Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="w-50 mb-4 rounded ps-3"
          type="text"
          name="name"
          id="name"
          placeholder="Your Name"
          required
        />
        <br />
        <input
          className="w-50 mb-4 rounded ps-3"
          onChange={handleEmailChange}
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
          required
        />

        <br />
        <input
          className="w-50 mb-4 rounded ps-3"
          onBlur={handlePasswordBlur}
          type="password"
          name="password"
          id="password"
          placeholder="Enter Your password"
          required
        />
        <br />
        <input className="btn btn-primary" type="submit" value="Register" />
      </form>
      <p>
        <small>
          Already you have an account? Please<Link to="/login">Login</Link>
        </small>
      </p>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Register;
