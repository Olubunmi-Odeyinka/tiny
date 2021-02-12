import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';

test('ensure App Component is Rendering', () => {
  render(
    <MockedProvider>
      <App />
    </MockedProvider>
    );
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
