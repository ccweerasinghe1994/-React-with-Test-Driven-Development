import SignUpPage from '../pages/SignUpPage';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

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
    let button;
    const setup = () => {
      render(<SignUpPage />);

      const usernameInput = screen.getByLabelText('Username');
      const emailInput = screen.getByLabelText('E-mail');
      const passwordInput = screen.getByLabelText('Password');
      const repeatPasswordInput = screen.getByLabelText('Repeat Password');

      userEvent.type(usernameInput, 'username');
      userEvent.type(emailInput, 'abc@gmail.com');
      userEvent.type(passwordInput, 'password');
      userEvent.type(repeatPasswordInput, 'password');

      button = screen.getByRole('button', { name: 'Sign Up' });
    }
    it('enables the button when the password and repeat password match', () => {
      setup();
      expect(button).not.toBeDisabled();
    });

    it('send username, password, email to the backend', async () => {
      let requestBody;
      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          requestBody = req.body;
          return res(ctx.status(200))
        })
      );
      server.listen()
      setup();
      userEvent.click(button);
      await new Promise(resolve => setTimeout(resolve, 500))
      expect(requestBody).toEqual({
        username: 'username',
        email: 'abc@gmail.com',
        password: 'password',
      });
    });

    it('disable the signUp button when there is a ongoing signUp', async () => {
      let counter = 1;

      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          counter = counter + 1;
          return res(ctx.status(200))
        })
      );
      server.listen()

      setup();

      userEvent.click(button);
      userEvent.click(button);

      await new Promise(resolve => setTimeout(resolve, 500));
      expect(counter).toBe(1);
    });

    it('display spinner after clicking the submit', () => {

      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          return res(ctx.status(200))
        })
      );
      server.listen();

      setup();

      expect(screen.queryByRole('status')).not.toBeInTheDocument();

      userEvent.click(button);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();

    });

    it('displays account activation notification after the successful signup request', async () => {

      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          return res(ctx.status(200))
        })
      );
      server.listen();

      setup();

      userEvent.click(button);

      const text = await screen.findByText("Please check your email to activate the account");

      expect(text).toBeInTheDocument();


    });

  });


});
