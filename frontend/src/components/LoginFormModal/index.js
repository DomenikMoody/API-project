import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Link, useHistory } from 'react-router-dom';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disableLogin, setDisableLogin] = useState(true);
  const { closeModal } = useModal();
  const history = useHistory()

  const handleCredentialChange = (e) => {
    setCredential(e.target.value);
    setDisableLogin(e.target.value.length < 4 || password.length < 6);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setDisableLogin(credential.length < 4 || e.target.value.length < 6);
  };
  const handleCredentialInfo = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
      .then(closeModal)
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    history.push("/")
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });

  };

  return (
    <>
      <div className="Logincontainer">
        <div className="Login">
          <h1>Log In</h1>
        </div>
        {errors.credential && <p className="errors">{errors.credential}</p>}
        <form onSubmit={handleSubmit} className="form">
          <label>
            <div className="userNameorEmail">
              <input
                className="userNameorEmailbox"
                type="text"
                value={credential}
                placeholder="Username or Email"
                onChange={handleCredentialChange}
                required
              />
            </div>
          </label>
          <label>
            <div>
              <input
                className="passwordbox"
                type="password"
                value={password}
                placeholder="Password"
                onChange={handlePasswordChange}
                required
              />
            </div>
          </label>

          <button
            type="submit"
            className="LoginButton"
            disabled={disableLogin}
          >
            Log In
          </button>
          <div>
            <button
              type="submit"
              className="DemoUser"
              onClick={handleCredentialInfo}
            >
             Log in as Demo User
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
