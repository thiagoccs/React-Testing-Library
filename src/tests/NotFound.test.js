import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('requisito 4', () => {
  test('este se a página contém um heading h2 c/ texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const text = screen.getByRole('heading', {
      level: 2, name: 'Page requested not found',
    });

    expect(text).toBeInTheDocument();
  });

  test('Teste se a página mostra img https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const text = screen.getByRole('img', { name: /Pikachu crying/i });
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(text.src).toContain(URL);
  });
});
