import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('requisito 5', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const text = screen.getByRole('heading', {
      level: 2, name: /Encountered pokémons/i,
    });

    expect(text).toBeInTheDocument();
  });

  test('Teste se exibe o próximo pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const bttn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(bttn).toBeInTheDocument();

    const fisrtPokemon = screen.getByText(/pikachu/i);
    expect(fisrtPokemon).toBeInTheDocument();

    const list = pokemons.map((pokemon) => pokemon.name);
    list.shift();
    // console.log(list);
    for (let index = 0; index < list.length; index += 1) {
      const element = list[index];
      userEvent.click(bttn);
      const pokemon = screen.getByText(element);
      expect(pokemon).toBeInTheDocument();
    }

    userEvent.click(bttn);
    const lastPokemon = screen.getByText(/Pikachu/i);
    expect(lastPokemon).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const bttnFilter = screen.getAllByTestId('pokemon-type-button');
    const MAX = 7;
    expect(bttnFilter).toHaveLength(MAX);

    userEvent.click(bttnFilter[4]);
    const alakazan = screen.getByText(/Alakazam/i);
    expect(alakazan).toBeInTheDocument();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const bttnAll = screen.getByRole('button', { name: /All/i });
    expect(bttnAll).toBeInTheDocument();
    userEvent.click(bttnAll);
    const bttnPsychic = screen.getByRole('button', { name: /psychic/i });
    expect(bttnPsychic).toBeInTheDocument();
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
