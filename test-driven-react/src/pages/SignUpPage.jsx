import axios from "axios";
import { useEffect, useState } from "react";

const SignUpPage = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const onChange = (e) => {
    const { value, id } = e.target;
    if (id === "password") {
      setPassword(value);
    }
    if (id === "repeat-password") {
      setConfirmPassword(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "username") {
      setUser(value);
    }
  };

  const onClick = async (event) => {
    event.preventDefault();
    const body = {
      username: user,
      email,
      password,
    };
    await axios.post("/api/1.0/users", body);

  };

  useEffect(() => {
    if (
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [confirmPassword, confirmPassword.length, password, password.length]);

  return (
    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" >
      <form className="card mt-5" >
        <div className="card-header">
          <h1 className="text-center">Sign Up</h1>
        </div>
        <div className="card-body">

          <div className="mb-3">
            <label className="form-label" htmlFor="username">Username</label>
            <input className="form-control" id="username" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">E-mail</label>
            <input className="form-control" id="email" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <input className="form-control" id="password" type={"password"} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="repeat-password">Repeat Password</label>
            <input className="form-control" type="password" id="repeat-password" onChange={onChange} />
          </div>
        </div>
        <div className="text-center">
          <div className="card-footer">
            <button className="btn btn-primary" disabled={disabled} type="submit" onClick={onClick}>
              Sign Up
            </button>

          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
