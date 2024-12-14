import React from 'react';

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { Legislator } from '@/appTypes';
import { colors } from '@/themes';

import App from '../App';
import { mockLogin } from '../jest.constants';

jest.mock('@/navigation', () => {
  const LegislatorScreen = require('../src/screens/LegislatorDetail').default;
  const { mockLegislators } = jest.requireActual('../jest.constants');
  const { data } = mockLegislators();

  return function MockLegislatorScreen({
    legislator = data[0],
    initialFollow,
  }: {
    legislator: Legislator;
    initialFollow?: boolean;
  }) {
    return <LegislatorScreen route={{ params: { legislator, initialFollow } }} />;
  };
});

describe('Legislator Screen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockLogin();
    render(<App />);
  });

  it('Check that the Legislator Screen is rendered', async () => {
    expect(screen.getByText('Gus Bilirakis')).toBeOnTheScreen();
    expect(screen.getByText('Party: Republican')).toBeOnTheScreen();
    expect(screen.getByText('District: HD-FL-12')).toBeOnTheScreen();
    expect(screen.getByText('Branch: Representative')).toBeOnTheScreen();
    expect(screen.getByText('State: US Congress')).toBeOnTheScreen();
    expect(screen.getByText('Snapshot')).toBeOnTheScreen();
    expect(screen.getByText('Voting')).toBeOnTheScreen();
    expect(screen.getByText('Funding')).toBeOnTheScreen();
    expect(screen.getByText('Referendum Scores')).toBeOnTheScreen();
    expect(screen.getByText('Top Issues')).toBeOnTheScreen();
    expect(screen.getByText('Contact & Social')).toBeOnTheScreen();
  });

  it('Check follow buttons', async () => {
    const followButton = screen.getByTestId(`Ionicons-star-outline-${colors.tertiary}`);

    await act(async () => {
      fireEvent.press(followButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId(`Ionicons-star-sharp-${colors.gold}`)).toBeOnTheScreen();
    });
  });

  it('Check Legislator Voting Tab renders', async () => {
    await act(async () => {
      fireEvent.press(screen.getByText('Voting'));
    });

    await waitFor(() => {
      expect(screen.getByText('Bill/Date')).toBeOnTheScreen();
      expect(screen.getByText('Action')).toBeOnTheScreen();
      expect(screen.getByText('Vote')).toBeOnTheScreen();
      expect(screen.getByText('HB1')).toBeOnTheScreen();
      expect(screen.getByText('HB5')).toBeOnTheScreen();
    });

    const dropButton = screen.getAllByTestId(`Ionicons-chevron-down-${colors.darkGray}`);

    await act(async () => {
      fireEvent.press(dropButton[0]);
    });

    await waitFor(() => {
      expect(screen.getByText('2023-03-30')).toBeOnTheScreen();
      expect(screen.getByText('On Agreeing to the Amendment RC# 177')).toBeOnTheScreen();
      expect(screen.getByTestId(`Octicons-thumbsup-${colors.tertiary}`)).toBeOnTheScreen();
      expect(screen.getByText('2023-03-29')).toBeOnTheScreen();
      expect(screen.getByText('On Agreeing to the Amendment RC# 176')).toBeOnTheScreen();
      expect(screen.getByTestId(`Octicons-thumbsdown-${colors.tertiary}`)).toBeOnTheScreen();
    });
  });

  it('Check Funding Tab renders', async () => {
    fireEvent.press(screen.getByText('Funding'));

    await waitFor(() => {
      expect(screen.getByText('Source')).toBeOnTheScreen();
      expect(screen.getByText('Amount')).toBeOnTheScreen();
      expect(screen.getByText('Cycle')).toBeOnTheScreen();
    });
  });
});
