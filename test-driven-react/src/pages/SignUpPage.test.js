import SignUpPage from "../pages/SignUpPage";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    it("disables the button initialy", () => {
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
  });
});
