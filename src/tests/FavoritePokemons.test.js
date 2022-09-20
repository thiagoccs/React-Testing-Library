import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('requisito 3', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const text = screen.getByText(/No favorite pokemon found/i);

    expect(text).toBeInTheDocument();

    if (!text) {
      const pokemons = querySelector('#root > div > div > div:nth-child(2) > div');

      expect(pokemons).toBeInTheDocument();
    }
  });
});
