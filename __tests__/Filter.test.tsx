import React from 'react';

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { colors } from '@/themes';

import App from '../App';
import { mockLogin } from '../jest.constants';

const mockParty = jest.fn().mockReturnValue({
  data: [
    {
      id: 1,
      name: 'Democrat',
    },
    {
      id: 2,
      name: 'Republican',
    },
  ],
  isLoading: false,
  isError: false,
});

const mockRole = jest.fn().mockReturnValue({
  data: [
    {
      id: 1,
      name: 'Representative',
    },
    {
      id: 2,
      name: 'Senate',
    },
  ],
  isLoading: false,
  isError: false,
});

const mockState = jest.fn().mockReturnValue({
  data: [
    {
      id: 1,
      name: 'New York',
    },
    {
      id: 2,
      name: 'Oregon',
    },
  ],
  isLoading: false,
  isError: false,
});

jest.mock('@/store/baseApi', () => ({
  useGetRolesQuery: () => mockRole(),
  useGetPartysQuery: () => mockParty(),
  useGetStatesQuery: () => mockState(),
}));

jest.mock('@/navigation', () => {
  const CatalogScreen = require('../src/screens/Catalog').default;
  return function MockCatalogScreen() {
    return <CatalogScreen />;
  };
});

describe('Filter & Sort', () => {
  beforeEach(() => {
    mockLogin();
    render(<App />);
  });

  describe('Bill Filter & Sort Modals', () => {
    it('Check that filter modal renders', async () => {
      expect(screen.getByTestId(`Ionicons-filter-${colors.tertiary}`)).toBeOnTheScreen();
      fireEvent.press(screen.getByTestId('filter'));

      await act(async () => {
        await waitFor(() => {
          expect(screen.getByText('All')).toBeOnTheScreen();
          expect(screen.getByText('Federal')).toBeOnTheScreen();
          expect(screen.getByText('State')).toBeOnTheScreen();
          expect(screen.getByText('Legislative Body')).toBeOnTheScreen();
          expect(screen.queryByText('Political Party')).not.toBeOnTheScreen();
          expect(screen.getByText('States')).toBeOnTheScreen();
          expect(screen.getByText('Clear all')).toBeOnTheScreen();
          expect(screen.getByText('Apply')).toBeOnTheScreen();
        });
      });

      const federalButton = screen.getByTestId('federalButton');
      fireEvent.press(federalButton);

      await act(async () => {
        await waitFor(() => {
          expect(screen.getByText('Legislative Body')).toBeOnTheScreen();
          expect(screen.queryByText('States')).not.toBeOnTheScreen();
        });
      });

      const stateButton = screen.getByTestId('stateButton');
      fireEvent.press(stateButton);

      await act(async () => {
        await waitFor(() => {
          expect(screen.getByText('States')).toBeOnTheScreen();
          expect(screen.queryByText('Legislative Body')).not.toBeOnTheScreen();
        });
      });
    });

    it('Check that the filter options render', async () => {
      fireEvent.press(screen.getByTestId('filter'));

      const filterOptions = screen.getAllByTestId(`Ionicons-chevron-down-${colors.darkGray}`);
      fireEvent.press(filterOptions[0]);

      await act(async () => {
        await waitFor(() => {
          expect(screen.getByText('Representative')).toBeOnTheScreen();
          expect(screen.getByText('Senate')).toBeOnTheScreen();
        });
      });

      fireEvent.press(filterOptions[1]);

      await act(async () => {
        await waitFor(() => {
          expect(screen.getByText('Select items')).toBeOnTheScreen();
        });
      });
    });

    it('Check that sort modal renders', async () => {
      expect(screen.getByTestId(`Ionicons-swap-vertical-${colors.tertiary}`)).toBeOnTheScreen();
      fireEvent.press(screen.getByTestId('sort'));

      await act(async () => {
        await waitFor(() => {
          expect(screen.getByText('Bill ID (A-Z)')).toBeOnTheScreen();
          expect(screen.getByText('Bill Title (A-Z)')).toBeOnTheScreen();
          expect(screen.getByText('Status Date (Newest)')).toBeOnTheScreen();
        });
      });
    });
  });

  describe('Legislator Filter & Sort Modals', () => {
    beforeEach(() => {
      const legislatorTab = screen.getByTestId('legislatorsTab');
      fireEvent.press(legislatorTab);
    });

    it('Check that filter modal renders', async () => {
      expect(screen.getByTestId(`Ionicons-filter-${colors.tertiary}`)).toBeOnTheScreen();
      fireEvent.press(screen.getByTestId('filter'));

      await act(async () => {
        await waitFor(() => {
          expect(screen.getByTestId('legislatorList')).toBeOnTheScreen();
          expect(screen.getByText('All')).toBeOnTheScreen();
          expect(screen.getByText('Federal')).toBeOnTheScreen();
          expect(screen.getByText('State')).toBeOnTheScreen();
          expect(screen.getByText('Legislative Body')).toBeOnTheScreen();
          expect(screen.getByText('Political Party')).toBeOnTheScreen();
          expect(screen.getByText('States')).toBeOnTheScreen();
          expect(screen.getByText('Clear all')).toBeOnTheScreen();
          expect(screen.getByText('Apply')).toBeOnTheScreen();
        });
      });

      const federalButton = screen.getByTestId('federalButton');
      fireEvent.press(federalButton);

      await act(async () => {
        await waitFor(() => {
          expect(screen.getByText('Legislative Body')).toBeOnTheScreen();
          expect(screen.getByText('Political Party')).toBeOnTheScreen();
          expect(screen.queryByText('States')).not.toBeOnTheScreen();
        });
      });

      const stateButton = screen.getByTestId('stateButton');
      fireEvent.press(stateButton);

      await act(async () => {
        await waitFor(() => {
          expect(screen.getByText('Political Party')).toBeOnTheScreen();
          expect(screen.getByText('States')).toBeOnTheScreen();
          expect(screen.queryByText('Legislative Body')).not.toBeOnTheScreen();
        });
      });
    });

    it('Check that the filter options render', async () => {
      fireEvent.press(screen.getByTestId('filter'));

      const filterOptions = screen.getAllByTestId(`Ionicons-chevron-down-${colors.darkGray}`);
      fireEvent.press(filterOptions[0]);

      await act(async () => {
        await waitFor(() => {
          expect(screen.getByText('Representative')).toBeOnTheScreen();
          expect(screen.getByText('Senate')).toBeOnTheScreen();
        });
      });

      fireEvent.press(filterOptions[1]);

      await act(async () => {
        await waitFor(() => {
          expect(screen.getByText('Democrat')).toBeOnTheScreen();
          expect(screen.getByText('Republican')).toBeOnTheScreen();
        });
      });

      fireEvent.press(filterOptions[2]);

      await act(async () => {
        await waitFor(() => {
          expect(screen.getByText('Select items')).toBeOnTheScreen();
        });
      });
    });

    it('Check that sort modal renders', async () => {
      expect(screen.getByTestId(`Ionicons-swap-vertical-${colors.tertiary}`)).toBeOnTheScreen();
      fireEvent.press(screen.getByTestId('sort'));

      await act(async () => {
        await waitFor(() => {
          expect(screen.getByText('Legislator Name (A-Z)')).toBeOnTheScreen();
        });
      });
    });
  });
});
