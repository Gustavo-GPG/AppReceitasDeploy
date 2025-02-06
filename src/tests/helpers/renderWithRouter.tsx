import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { MemoryHistory } from 'history';

interface RenderWithRouterOptions {
  route?: string;
  history?: MemoryHistory;
}

export const renderWithRouter = (
  ui: JSX.Element,
  { route = '/' }: RenderWithRouterOptions = {},
) => {
  window.history.pushState({}, '', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};
