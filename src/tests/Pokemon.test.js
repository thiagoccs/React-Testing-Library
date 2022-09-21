import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('requisito 6', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const detailLink = screen.getByRole('link', { name: /More details/i });
    // console.log(detailLink.length);
    expect(detailLink).toBeInTheDocument();
    userEvent.click(detailLink);

    const pikachu = screen.getAllByRole('heading', {
      level: 2, name: /pikachu details/i,
    });
    expect(pikachu[0]).toBeInTheDocument();

    const typePoke = screen.getByTestId('pokemon-type');
    const type = screen.getByText('Electric');
    expect(typePoke).toBeInTheDocument();
    expect(type).toBeInTheDocument();

    const weight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(weight).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /Pikachu sprite/i });
    const URL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img.src).toContain(URL);
  });

  test('Teste se o card do pokémon indicado na Pokédex contém um link de nav.', () => {
    const { history } = renderWithRouter(<App />);

    const bttn = screen.getByRole('link', { name: /more details/i });
    expect(bttn).toBeInTheDocument();
    userEvent.click(bttn);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const detailLink = screen.getByRole('link', { name: /More details/i });
    expect(detailLink).toBeInTheDocument();
    userEvent.click(detailLink);

    const inputFavorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(inputFavorite);

    const img = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(img).toBeInTheDocument();
    const URL = '/star-icon.svg';
    expect(img).toHaveAttribute('src', URL);
  });
});
