import SignUpPage from '../pages/SignUpPage';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
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
    let requestBody;
    let counter = 0;

    const server = setupServer(
      rest.post('/api/1.0/users', (req, res, ctx) => {
        requestBody = req.body;
        counter = counter + 1;
        return res(ctx.status(200));
      })
    );

    beforeEach(() => {
      counter = 0;
    });

    beforeAll(() => server.listen());

    afterAll(() => server.close());

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
    };

    it('enables the button when the password and repeat password match', () => {
      setup();

      expect(button).not.toBeDisabled();
    });

    it('send username, password, email to the backend', async () => {
      setup();

      userEvent.click(button);

      await screen.findByText(
        'Please check your email to activate the account'
      );

      expect(requestBody).toEqual({
        username: 'username',
        email: 'abc@gmail.com',
        password: 'password',
      });
    });

    it('disable the signUp button when there is a ongoing signUp', async () => {
      setup();

      userEvent.click(button);
      userEvent.click(button);

      await screen.findByText(
        'Please check your email to activate the account'
      );

      expect(counter).toBe(1);
    });

    it('display spinner after clicking the submit', async () => {
      setup();

      expect(screen.queryByRole('status')).not.toBeInTheDocument();

      userEvent.click(button);

      const spinner = screen.getByRole('status');

      expect(spinner).toBeInTheDocument();
      // here we are waiting until the text appear on the dom
      await screen.findByText(
        'Please check your email to activate the account'
      );
    });

    it('displays account activation notification after the successful signup request', async () => {
      setup();

      const message = 'Please check your email to activate the account';

      expect(screen.queryByText(message)).not.toBeInTheDocument();

      userEvent.click(button);

      const text = await screen.findByText(message);

      expect(text).toBeInTheDocument();
    });

    it('hides the signUp form after successful signup request', async () => {
      setup();

      const form = screen.getByTestId('form-sign-up');

      userEvent.click(button);

      // we can use this or
      await waitFor(() => {
        expect(form).not.toBeInTheDocument();
      });
      // we can use this.
      // await waitForElementToBeRemoved(form)
    });
  });
});
