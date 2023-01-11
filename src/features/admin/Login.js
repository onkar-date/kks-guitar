import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ACTION_STATUS } from "../../shared/constants/actionStatusConstants";
import {
  login,
  selectIsLoggedIn,
  selectLoggedInError,
  selectLoggedInStatus,
} from "./adminSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loggedInStatus = useSelector(selectLoggedInStatus);
  const loggedInError = useSelector(selectLoggedInError);
  useEffect(() => {
    if (loggedInStatus === ACTION_STATUS.failed) {
      toast.error(loggedInError);
    }
    return () => {};
  }, [loggedInStatus]);

  const usernameChanged = (event) => {
    setUsername(event.target.value);
  };

  const passwordChanged = (event) => {
    setPassword(event.target.value);
  };

  const loginClicked = (event) => {
    event.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div className="container mt-4">
      <div className="row d-flex justify-content-center">
        <div className="col-md-4">
          <Card className="shadow">
            <Card.Body>
              <h3 className="text-center">Login</h3>
              <form onSubmit={loginClicked}>
                <div className="form-group">
                  <label htmlFor="username" className="required">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    value={username}
                    required
                    onChange={usernameChanged}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="required">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    required
                    value={password}
                    onChange={passwordChanged}
                  />
                </div>

                <Button color="primary" className="btn-block" type="submit">
                  Login
                </Button>
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
