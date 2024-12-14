import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { BillDetail, VoteChoiceType } from '@/appTypes';
import { colors } from '@/themes';

import App from '../App';
import { mockLogin } from '../jest.constants';

jest.mock('@/navigation', () => {
  const BillScreen = require('../src/screens/BillDetail').default;
  const { mockBills } = jest.requireActual('../jest.constants');
  const { data } = mockBills();

  return function MockBillScreen({
    bill = data[0],
    initialFollow,
    initialVote,
  }: {
    bill: BillDetail;
    initialFollow?: boolean;
    initialVote?: VoteChoiceType;
  }) {
    return <BillScreen route={{ params: { bill, initialFollow, initialVote } }} />;
  };
});

describe('Bill Screen', () => {
  beforeEach(() => {
    mockLogin();
    render(<App />);
  });

  it('Check that the Bill Screen is rendered', async () => {
    expect(screen.getByText('US Congress - HB1')).toBeOnTheScreen();
    expect(screen.getByText('Overview')).toBeOnTheScreen();
    expect(screen.getByText('Voting')).toBeOnTheScreen();
    expect(screen.getByText('Full Text')).toBeOnTheScreen();
    expect(screen.getByText('Citizens Opinion')).toBeOnTheScreen();
    expect(screen.getByText('Citizens Briefing')).toBeOnTheScreen();
    expect(screen.getByText('Test Briefing')).toBeOnTheScreen();
    expect(screen.getByText('Sponsor Name')).toBeOnTheScreen();
    expect(screen.getByText('Sponsor Type')).toBeOnTheScreen();
    expect(screen.getByText('Gus Bilirakis')).toBeOnTheScreen();
    expect(screen.getByTestId(`Octicons-thumbsup-${colors.tertiary}`)).toBeOnTheScreen();
    expect(screen.getByTestId(`Octicons-thumbsdown-${colors.tertiary}`)).toBeOnTheScreen();
  });

  it('Check follow button', async () => {
    const followButton = screen.getByTestId(`Ionicons-star-outline-${colors.tertiary}`);
    fireEvent.press(followButton);

    await waitFor(() => {
      expect(screen.getByTestId(`Ionicons-star-sharp-${colors.gold}`)).toBeOnTheScreen();
    });
  });

  it('Check vote buttons', async () => {
    const yayButton = screen.getByTestId('yayButton');
    const nayButton = screen.getByTestId('nayButton');

    expect(yayButton).toHaveStyle({ backgroundColor: colors.darkGray });
    expect(nayButton).toHaveStyle({ backgroundColor: colors.darkGray });

    fireEvent.press(yayButton);
    await waitFor(() => {
      expect(yayButton).toHaveStyle({ backgroundColor: colors.successGreen });
      expect(nayButton).toHaveStyle({ backgroundColor: colors.darkGray });
    });

    fireEvent.press(nayButton);
    await waitFor(() => {
      expect(yayButton).toHaveStyle({ backgroundColor: colors.darkGray });
      expect(nayButton).toHaveStyle({ backgroundColor: colors.errorRed });
    });

    fireEvent.press(nayButton);
    await waitFor(() => {
      expect(yayButton).toHaveStyle({ backgroundColor: colors.darkGray });
      expect(nayButton).toHaveStyle({ backgroundColor: colors.darkGray });
    });
  });

  it('Check Bill Voting Tab renders', async () => {
    fireEvent.press(screen.getByText('Voting'));

    await waitFor(() => {
      expect(screen.getByText('Action/Name')).toBeOnTheScreen();
      expect(screen.getByText('Party')).toBeOnTheScreen();
      expect(screen.getByText('Vote')).toBeOnTheScreen();
      expect(screen.getByText('On Agreeing to the Amendment RC# 177')).toBeOnTheScreen();
      expect(screen.getByText('On Agreeing to the Amendment RC# 175')).toBeOnTheScreen();
    });

    const dropButton = screen.getAllByTestId(`Ionicons-chevron-down-${colors.darkGray}`);
    fireEvent.press(dropButton[0]);

    await waitFor(() => {
      expect(screen.getByText('Joe Biden')).toBeOnTheScreen();
      expect(screen.getByText('Donald Trump')).toBeOnTheScreen();
      expect(screen.getByText('Democrat')).toBeOnTheScreen();
      expect(screen.getByText('Republican')).toBeOnTheScreen();
      expect(screen.getByTestId(`Octicons-thumbsup-${colors.tertiary}`)).toBeOnTheScreen();
      expect(screen.getByTestId(`Octicons-thumbsdown-${colors.tertiary}`)).toBeOnTheScreen();
    });
  });

  it('Check Full Text Tab renders', async () => {
    fireEvent.press(screen.getByText('Full Text'));

    await waitFor(() => {
      expect(screen.getByText('Test Text')).toBeOnTheScreen();
    });
  });
});
