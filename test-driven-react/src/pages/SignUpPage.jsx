import { useEffect, useState } from "react";

const SignUpPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const onPasswordChange = (e) => {
    if (e.target.id === "password") {
      setPassword(e.target.value);
    }
    if (e.target.id === "repeat-password") {
      setConfirmPassword(e.target.value);
    }
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
      <input id="username" />
      <label htmlFor="email">E-mail</label>
      <input id="email" />
      <label htmlFor="password">Password</label>
      <input id="password" type={"password"} onChange={onPasswordChange} />
      <label htmlFor="repeat-password">Repeat Password</label>
      <input type="password" id="repeat-password" onChange={onPasswordChange} />
      <button disabled={disabled} type="submit">
        Sign Up
      </button>
    </>
  );
};

export default SignUpPage;
