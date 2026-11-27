import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it} from 'vitest';
import App from './App';

describe('Coach Hub Landing Page Integration', () => {
  // Blue Pill: Core layout, links, central lightbulb asset, and removed elements
  it('renders slanted split panels, COACH HUB, 01 / 02 indicator, and new central lightbulb without removed elements', () => {
    render(<App />);

    const leftPanel = screen.getByTestId('panel-left');
    const rightPanel = screen.getByTestId('panel-right');

    expect(leftPanel).toHaveAttribute('href', 'https://ideation-coach.vercel.app/');
    expect(rightPanel).toHaveAttribute('href', 'https://innovation-coach.vercel.app/');
    expect(leftPanel).not.toHaveAttribute('target', '_blank');
    expect(rightPanel).not.toHaveAttribute('target', '_blank');

    // Selected icon boxes and EST. 2026 must be removed
    expect(leftPanel.querySelector('.fa-lightbulb')).not.toBeInTheDocument();
    expect(rightPanel.querySelector('.fa-rocket')).not.toBeInTheDocument();
    expect(screen.queryByText('EST. 2026')).not.toBeInTheDocument();

    expect(screen.getByText('Ideation Coach')).toBeInTheDocument();
    expect(screen.getByText('Structured brainstorming framework')).toBeInTheDocument();
    expect(screen.getByText('Innovation Coach')).toBeInTheDocument();
    expect(screen.getByText('Corporate venture and design thinking')).toBeInTheDocument();
    expect(screen.getByText('COACH HUB')).toBeInTheDocument();

    expect(screen.getByRole('button', {name: /Highlight Ideation Coach \(01\)/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Highlight Innovation Coach \(02\)/i})).toBeInTheDocument();

    // Central brightened pastel watercolor lightbulb
    const illustration = screen.getByAltText(
      /Pastel watercolor lightbulb bridging ideation and innovation/i,
    );
    expect(illustration).toHaveAttribute('src', expect.stringContaining('image_cd629b00.png'));
  });

  // Red Pill: Graceful fallback if image fails to load
  it('renders fallback icon if central illustration fails to load', () => {
    render(<App />);
    const illustration = screen.getByAltText(
      /Pastel watercolor lightbulb bridging ideation and innovation/i,
    );
    fireEvent.error(illustration);
    expect(
      screen.queryByAltText(/Pastel watercolor lightbulb bridging ideation and innovation/i),
    ).not.toBeInTheDocument();
  });

  // Blue Pill: Hover & corner indicator drags central image with the slanted line
  it('drags central image along with the slanted line on panel hover and indicator toggle', async () => {
    const user = userEvent.setup();
    render(<App />);

    const main = screen.getByRole('main');
    const centralWrapper = screen.getByTestId('central-illustration');
    const leftPanel = screen.getByTestId('panel-left');
    const rightPanel = screen.getByTestId('panel-right');
    const btn01 = screen.getByRole('button', {name: /Highlight Ideation Coach \(01\)/i});
    const btn02 = screen.getByRole('button', {name: /Highlight Innovation Coach \(02\)/i});

    expect(main).toHaveAttribute('data-active-side', 'none');
    expect(centralWrapper).toHaveAttribute('data-drag-side', 'none');

    await user.hover(leftPanel);
    expect(main).toHaveAttribute('data-active-side', 'left');
    expect(centralWrapper).toHaveAttribute('data-drag-side', 'left');
    expect(btn01).toHaveAttribute('aria-pressed', 'true');
    expect(btn02).toHaveAttribute('aria-pressed', 'false');

    await user.hover(rightPanel);
    expect(main).toHaveAttribute('data-active-side', 'right');
    expect(centralWrapper).toHaveAttribute('data-drag-side', 'right');
    expect(btn02).toHaveAttribute('aria-pressed', 'true');

    await user.unhover(rightPanel);
    expect(main).toHaveAttribute('data-active-side', 'none');
    expect(centralWrapper).toHaveAttribute('data-drag-side', 'none');

    await user.click(btn01);
    expect(main).toHaveAttribute('data-active-side', 'left');
    expect(centralWrapper).toHaveAttribute('data-drag-side', 'left');

    await user.click(screen.getByRole('button', {name: 'COACH HUB'}));
    expect(main).toHaveAttribute('data-active-side', 'none');
    expect(centralWrapper).toHaveAttribute('data-drag-side', 'none');
  });
});
