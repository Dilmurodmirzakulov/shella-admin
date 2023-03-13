import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/actions";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const hendleSubmit = () => {
    axios
      .post("http://142.93.237.244:9090/v1/users/login", userData)
      .then((res) => {
        dispatch(login(res.data));
      })
      .catch((err) => console.log("error", err));
  };

  const hendleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="content-wrapper">
        <div className="container-xxl">
          <div className="authentication-wrapper authentication-basic container-p-y">
            <div className="authentication-inner">
              <div className="card">
                <div className="card-body">
                  <div className="app-brand justify-content-center">
                    <a href="index.html" className="app-brand-link gap-2">
                      <span className="app-brand-logo demo"></span>
                      <span className="app-brand-text demo text-body fw-bolder">
                        Sneat
                      </span>
                    </a>
                  </div>
                  <h4 className="mb-2">Welcome to Sneat! 👋</h4>
                  <p className="mb-4">
                    Please sign-in to your account and start the adventure
                  </p>

                  <form>
                    <div className="mb-3">
                      <label for="email" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="username"
                        placeholder="Enter your username"
                        required
                        onChange={hendleInput}
                      />
                    </div>
                    <div className="mb-3 form-password-toggle">
                      <div className="d-flex justify-content-between">
                        <label className="form-label" for="password">
                          Password
                        </label>
                        <a href="auth-forgot-password-basic.html">
                          <small>Forgot Password?</small>
                        </a>
                      </div>
                      <div className="input-group input-group-merge">
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          name="password"
                          placeholder="············"
                          aria-describedby="password"
                          required
                          onChange={hendleInput}
                        />
                        <span className="input-group-text cursor-pointer">
                          <i className="bx bx-hide"></i>
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="remember-me"
                        />
                        <label className="form-check-label" for="remember-me">
                          {" "}
                          Remember Me{" "}
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <button
                        className="btn btn-primary d-grid w-100"
                        type="button"
                        onClick={hendleSubmit}
                      >
                        Sign in
                      </button>
                    </div>
                  </form>

                  <p className="text-center">
                    <span>New on our platform?</span>
                    <a href="auth-register-basic.html">
                      <span>Create an account</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
