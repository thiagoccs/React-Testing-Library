import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
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

  test('Teste se a aplic. é redirecionada p/ página inicial ao clicar em FavPok', () => {
    const render = renderWithRouter(<App />);
    const { history } = render;

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se página com erro 404 é renderizada se a rota não foi encontrada', () => {
    const render = renderWithRouter(<App />);
    const { history } = render;

    act(() => {
      history.push('/Thiago');
    });

    const notFoundText = screen.getByRole('heading', { level: 2, name: /not found/i });
    expect(notFoundText).toBeInTheDocument();

    const notFoundImage = screen.getByRole('img', { name: /pikachu crying/i });
    expect(notFoundImage).toBeInTheDocument();
  });
});
