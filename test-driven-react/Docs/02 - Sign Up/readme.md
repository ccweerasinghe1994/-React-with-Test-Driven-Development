# Sign Up

- [Sign Up](#sign-up)
  - [First Component](#first-component)
    - [SignUp Component](#signup-component)
    - [App Page](#app-page)
    - [SignUp Page Test file](#signup-page-test-file)
    - [remove these files](#remove-these-files)
    - [test output](#test-output)
  - [Layout - Sign Up Form](#layout---sign-up-form)
  - [Form Interactions](#form-interactions)
  - [Api Request - Sign Up](#api-request---sign-up)
  - [Mocking Mock Service Worker (MSW)](#mocking-mock-service-worker-msw)
  - [Proxy](#proxy)
  - [Styling](#styling)
  - [Progress Indicator](#progress-indicator)
  - [Layout - Sign Up Success](#layout---sign-up-success)
  - [Refactor - Test Lifecycle Async Await](#refactor---test-lifecycle-async-await)

## First Component

### SignUp Component

```jsx
const SignUpPage = ()=>{
  react <h1>Sign Up</h1>
}

export default SignUpPage;

```

### App Page

```jsx
import SignUpPage from './pages/SignUpPage';

function App() {
  return <SignUpPage />;
}

export default App;
```

### SignUp Page Test file

```jsx
import SignUpPage from '../pages/SignUpPage';
import { render, screen } from '@testing-library/react';

describe('signup page', () => {
  describe('Layout', () => {
    it('has header', () => {
      render(<SignUpPage />);
      const header = screen.queryByRole('heading', { name: 'Sign Up' });
      // these are coming from testing library jest-dom
      expect(header).toBeInTheDocument();
    });
  });
});
```

### remove these files

App.css,App.test.js,Logo and etc

### test output

![test output](../img/1.png)

## Layout - Sign Up Form

## Form Interactions

## Api Request - Sign Up

## Mocking Mock Service Worker (MSW)

## Proxy

## Styling

## Progress Indicator

## Layout - Sign Up Success

## Refactor - Test Lifecycle Async Await
