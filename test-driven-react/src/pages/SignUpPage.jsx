const SignUpPage = () => {
  return (
    <>
      <h1>Sign Up</h1>
      <label htmlFor="username">Username</label>
      <input id="username" />
      <label htmlFor="email">E-mail</label>
      <input id="email" />
      <label htmlFor="password">Password</label>
      <input id="password" type={"password"} />
      <label htmlFor="repeat-password">Repeat Password</label>
      <input type="password" id="repeat-password" />
      <button disabled type="submit">
        Sign Up
      </button>
    </>
  );
};

export default SignUpPage;
