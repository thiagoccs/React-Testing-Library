import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 1', () => {
  // test('teste', () => {
  //     expect(1).toBe(1);
  // });
  test('Teste se o topo da aplicação contém um conjunto fixo de links', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(homeLink).toBeDefined();
    expect(aboutLink).toBeDefined();
    expect(favoriteLink).toBeDefined();
  });
  test('Teste se a aplicação é redirecionada p/ página inicial ao clicar em Home', () => {
    const render = renderWithRouter(<App />);
    const { history } = render;

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada p/ página inicial ao clicar About', () => {
    const render = renderWithRouter(<App />);
    const { history } = render;

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada p/ página inicial ao clicar em FavPok', () => {
    const render = renderWithRouter(<App />);
    const { history } = render;

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
