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
    console.log(value, id);
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

  const onClick = (event) => {
    event.preventDefault();
    const body = {
      username: user,
      email,
      password,
    };
    axios.post("http://localhost:5000/api/users/signup", body);
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
    <>
      <h1>Sign Up</h1>
      <label htmlFor="username">Username</label>
      <input id="username" onChange={onChange} />
      <label htmlFor="email">E-mail</label>
      <input id="email" onChange={onChange} />
      <label htmlFor="password">Password</label>
      <input id="password" type={"password"} onChange={onChange} />
      <label htmlFor="repeat-password">Repeat Password</label>
      <input type="password" id="repeat-password" onChange={onChange} />
      <button disabled={disabled} type="submit" onClick={onClick}>
        Sign Up
      </button>
    </>
  );
};

export default SignUpPage;
