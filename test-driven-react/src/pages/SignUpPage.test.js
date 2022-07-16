import SignUpPage from '../pages/SignUpPage';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import {setupServer} from 'msw/node';
describe('signup page', () => {
  describe('Layout', () => {
    it('has header', () => {
      render(<SignUpPage />);
      const header = screen.queryByRole('heading', { name: 'Sign Up' });
      expect(header).toBeInTheDocument();
    });

    it('has user input', () => {
      const { container } = render(<SignUpPage />);
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
    });
    it('has username input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Username');
      expect(input).toBeInTheDocument();
    });

    it('has email input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('E-mail');
      expect(input).toBeInTheDocument();
    });

    it('has password input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Password');
      expect(input).toBeInTheDocument();
    });

    it('has password type for input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Password');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('has password repeat input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Repeat Password');
      expect(input).toBeInTheDocument();
    });

    it('has password type for password repeat input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Repeat Password');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('has submit button', () => {
      render(<SignUpPage />);
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeInTheDocument();
    });

    it('disables the button initially', () => {
      render(<SignUpPage />);
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeDisabled();
    });
  });

  describe('interactions', () => {
    it('enables the button when the password and repeat password match', () => {
      render(<SignUpPage />);
      const button = screen.getByRole('button', { name: 'Sign Up' });
      const passwordInput = screen.getByLabelText('Password');
      const repeatPasswordInput = screen.getByLabelText('Repeat Password');
      userEvent.type(passwordInput, 'password');
      userEvent.type(repeatPasswordInput, 'password');
      expect(button).not.toBeDisabled();
    });

    it('send username, password, email to the backend', () => {
      const server = setupServer();
      render(<SignUpPage />);
      const usernameInput = screen.getByLabelText('Username');
      const emailInput = screen.getByLabelText('E-mail');
      const passwordInput = screen.getByLabelText('Password');
      const repeatPasswordInput = screen.getByLabelText('Repeat Password');
      userEvent.type(usernameInput, 'username');
      userEvent.type(emailInput, 'abc@gmail.com');
      userEvent.type(passwordInput, 'password');
      userEvent.type(repeatPasswordInput, 'password');
      const button = screen.getByRole('button', { name: 'Sign Up' });
      const mockFn = jest.fn();
      // axios.post = mockFn;
      // let's mock the fetch function 
      window.fetch = mockFn;
      userEvent.click(button);
      const firstCallOfTheMockFunction = mockFn.mock.calls[0];
      // this firstCallOfTheMockFunction[1] will return a object
      // which is in as a String
      // let's convert it back to js Object before comparison
      const body = JSON.parse(firstCallOfTheMockFunction[1].body);
      expect(body).toEqual({
        username: 'username',
        email: 'abc@gmail.com',
        password: 'password',
      });
    });
  });
});
