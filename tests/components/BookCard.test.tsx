import { render, screen } from '@testing-library/react';
import { BookCard } from '../../src/components/BookCard/BookCard';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

describe('BookCard Component', () => {
  const mockBookBase = {
    id: 'b1',
    title: 'Atomic Habits',
    author: 'James Clear',
    rating: 3.5,
    status: 'Read',
    cover_url: 'https://example.com/cover.jpg',
    description: 'A good book.',
    init_date: '2023-01-01',
    finish_date: '2023-01-10',
  };

  it('should render correct fractional stars when rating is 3.5', () => {
    render(
      <MemoryRouter>
        <BookCard book={mockBookBase as any} />
      </MemoryRouter>
    );

    // It should render "Atomic Habits" text
    expect(screen.getByText('Atomic Habits')).toBeInTheDocument();
    
    // There should be a container labeled for 3.5 stars
    const starContainer = screen.getByLabelText('Rating: 3.5 out of 5 stars');
    expect(starContainer).toBeInTheDocument();
  });

  it('should hide stars and show "Lendo" label if status is "Currently Reading"', () => {
    const readingBook = { ...mockBookBase, status: 'Currently Reading' };
    render(
      <MemoryRouter>
        <BookCard book={readingBook as any} />
      </MemoryRouter>
    );

    // Instead of stars, it should render "Lendo"
    expect(screen.getByText('Lendo')).toBeInTheDocument();
    
    // The rating label should not be present
    expect(screen.queryByLabelText(/Rating:/)).not.toBeInTheDocument();
  });

  it('should show "No Cover" generic fallback if cover_url is missing', () => {
    const noCoverBook = { ...mockBookBase, cover_url: undefined };
    render(
      <MemoryRouter>
        <BookCard book={noCoverBook as any} />
      </MemoryRouter>
    );

    expect(screen.getByText('No Cover')).toBeInTheDocument();
  });
});
