import App from './App';
import { test } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';

/**
 * Smoke test for the App component.
 *
 * - detailed testing is handled in cypress e2e tests.
 */
test('renders without crashing', () => {
  render(<App />);
  // does not crash on pressing clear data
  act(() => fireEvent.click(screen.getByTestId('clear-data')));
});
