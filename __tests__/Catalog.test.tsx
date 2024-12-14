import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import App from '../App';
import { mockLogin, mockReduxState } from '../jest.constants';
import { mockNavigate } from '../jest.setup';

jest.mock('@/screens/Catalog/hooks/useCatalogItems', () => jest.fn(props => props.items));

jest.mock('@/navigation', () => {
  const CatalogScreen = require('../src/screens/Catalog').default;
  return function MockCatalogScreen() {
    return <CatalogScreen />;
  };
});

describe('Catalog', () => {
  beforeEach(() => {
    mockLogin();
    render(<App />);
  });

  it('Check that the Bill List is rendered', async () => {
    expect(screen.getByText('Catalog')).toBeOnTheScreen();
    expect(screen.getByText('Bills')).toBeOnTheScreen();
    expect(screen.getByText('Legislators')).toBeOnTheScreen();
    expect(screen.getByTestId('filterButton')).toBeOnTheScreen();
    expect(screen.getByTestId('sortButton')).toBeOnTheScreen();
    expect(screen.getByTestId('billList')).toBeOnTheScreen();
    const billItems = screen.getAllByTestId('billItem');

    await waitFor(() => {
      expect(billItems).toHaveLength(3);
      expect(screen.getByText('HB1')).toBeOnTheScreen();
      expect(screen.getByText('SR7')).toBeOnTheScreen();
    });

    fireEvent.press(billItems[0]);
    const firstBill = mockReduxState().bills.detail[0];
    expect(mockNavigate).toHaveBeenCalledWith('BillScreen', {
      bill: firstBill,
      initialFollow: false,
      initialVote: undefined,
    });
  });

  it('Check that the Legislator List is rendered', async () => {
    const legislatorTab = screen.getByTestId('legislatorsTab');
    fireEvent.press(legislatorTab);

    await waitFor(() => {
      expect(screen.getByTestId('legislatorList')).toBeOnTheScreen();
      expect(screen.getAllByTestId('legislatorItem')).toHaveLength(2);
      expect(screen.getByText('Gus Bilirakis')).toBeOnTheScreen();
      expect(screen.getByText('Robert Latta')).toBeOnTheScreen();
    });

    const legislatorItems = screen.getAllByTestId('legislatorItem');
    fireEvent.press(legislatorItems[0]);
    const firstLegislator = mockReduxState().legislators.list[0];
    expect(mockNavigate).toHaveBeenCalledWith('LegislatorScreen', {
      legislator: firstLegislator,
      initialFollow: false,
    });

    const billTab = screen.getByTestId('billsTab');
    fireEvent.press(billTab);

    await waitFor(() => {
      expect(screen.getByTestId('billList')).toBeOnTheScreen();
    });
  });
});
