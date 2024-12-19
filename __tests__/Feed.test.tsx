import React from 'react';

import { render, screen } from '@testing-library/react-native';

import App from '../App';
import { mockLogin } from '../jest.constants';

jest.mock('@/navigation', () => {
  const FeedScreen = require('../src/screens/Feed').default;
  return function MockFeedScreen() {
    return <FeedScreen />;
  };
});

describe('Feed', () => {
  it('Check that the Feed Screen is rendered', () => {
    mockLogin();

    render(<App />);
    expect(screen.getByText('Feed')).toBeOnTheScreen();
  });
});
