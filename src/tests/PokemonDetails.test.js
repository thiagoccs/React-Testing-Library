import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('requisito 7', () => {
  test('Teste se as informações detalhadas do pokémon são mostradas na tela', () => {
    renderWithRouter(<App />);

    const bttnDetail = screen.getByRole('link', { name: /more details/i });
    expect(bttnDetail).toBeInTheDocument();
    userEvent.click(bttnDetail);
    const textPikachu = screen.getByRole('heading', {
      level: 2, name: /Pikachu Details/i,
    });

    expect(textPikachu).toBeInTheDocument();
    expect(bttnDetail).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(summary).toBeInTheDocument();

    const paragraph = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(paragraph).toBeInTheDocument();
  });

  test('Teste se existe na página, seção com os mapas contendo as localizações', () => {
    renderWithRouter(<App />);

    const bttnDetail = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(bttnDetail);

    const gameLocation = screen.getByRole('heading', {
      level: 2, name: /Game Locations of Pikachu/i,
    });
    expect(gameLocation).toBeInTheDocument();

    const imgs = screen.getAllByRole('img', { name: /location/i });
    imgs.forEach((img) => {
      // console.log(img);
      const URL = img.src;
      const ALT = img.alt;
      expect(img.src).toContain(URL);
      expect(img.alt).toContain(ALT);
    });
    const URL = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(imgs[1].src).toContain(URL);
  });

  test('Teste se pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const bttnDetail = screen.getByRole('link', { name: /more details/i });
    userEvent.click(bttnDetail);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const imgStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(imgStar).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(imgStar).not.toBeInTheDocument();
  });
});
