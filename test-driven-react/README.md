# Test Driven React

## let's create a react app using yarn

```bash
yarn create react-app test-driven-react
```

let's create a sign up page. and use it inside the `App.js`

```jsx
import SignUpPage from "./pages/SignUpPage";

function App() {
  return <SignUpPage />;
}

export default App;
```
### SignUpPage.js

```jsx
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
      <form>
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
      </form>
    </>
  );
};

export default SignUpPage;
```

let's write the test for the SignUpPage.

```js
import SignUpPage from "../pages/SignUpPage";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
describe("signup page", () => {
  describe("Layout", () => {
    it("has header", () => {
      render(<SignUpPage />);
      const header = screen.queryByRole("heading", { name: "Sign Up" });
      expect(header).toBeInTheDocument();
    });

    it("has username input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Username");
      expect(input).toBeInTheDocument();
    });

    it("has email input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("E-mail");
      expect(input).toBeInTheDocument();
    });

    it("has password input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password");
      expect(input).toBeInTheDocument();
    });

    it("has password type for input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Password");
      expect(input).toHaveAttribute("type", "password");
    });

    it("has password repeat input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Repeat Password");
      expect(input).toBeInTheDocument();
    });

    it("has password type for password repeat input", () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText("Repeat Password");
      expect(input).toHaveAttribute("type", "password");
    });

    it("has submit button", () => {
      render(<SignUpPage />);
      const button = screen.getByRole("button", { name: "Sign Up" });
      expect(button).toBeInTheDocument();
    });

    it("disables the button initially", () => {
      render(<SignUpPage />);
      const button = screen.getByRole("button", { name: "Sign Up" });
      expect(button).toBeDisabled();
    });
  });

  describe("interactions", () => {
    it("enables the button when the password and repeat password match", () => {
      render(<SignUpPage />);
      const button = screen.getByRole("button", { name: "Sign Up" });
      const passwordInput = screen.getByLabelText("Password");
      const repeatPasswordInput = screen.getByLabelText("Repeat Password");
      userEvent.type(passwordInput, "password");
      userEvent.type(repeatPasswordInput, "password");
      expect(button).not.toBeDisabled();
    });

    it("send username, password, email to the backend", () => {
      render(<SignUpPage />);
      const usernameInput = screen.getByLabelText("Username");
      const emailInput = screen.getByLabelText("E-mail");
      const passwordInput = screen.getByLabelText("Password");
      const repeatPasswordInput = screen.getByLabelText("Repeat Password");
      userEvent.type(usernameInput, "username");
      userEvent.type(emailInput, "abc@gmail.com");
      userEvent.type(passwordInput, "password");
      userEvent.type(repeatPasswordInput, "password");
      const button = screen.getByRole("button", { name: "Sign Up" });
      const mockFn = jest.fn();
      axios.post = mockFn;
      userEvent.click(button);
      const firstCallOfTheMockFunction = mockFn.mock.calls[0];
      const body = firstCallOfTheMockFunction[1];
      expect(body).toEqual({
        username: "username",
        email: "abc@gmail.com",
        password: "password",
      });
    });
  });
});

```
