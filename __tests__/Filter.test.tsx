import React from 'react';

import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react-native';

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
  states: [
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

const mockStatus = jest.fn().mockReturnValue({
  data: [
    {
      id: 1,
      name: 'Introduced',
    },
    {
      id: 2,
      name: 'Passed',
    },
  ],
  isLoading: false,
  isError: false,
});

jest.mock('@/store/baseApi', () => ({
  useGetRolesQuery: () => mockRole(),
  useGetPartysQuery: () => mockParty(),
  useGetStatesQuery: () => mockState(),
  useGetStatusesQuery: () => mockStatus(),
}));

jest.mock('@/navigation', () => {
  const CatalogScreen = require('../src/screens/Catalog').default;
  return function MockCatalogScreen() {
    return <CatalogScreen />;
  };
});

describe('Filter & Sort', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockLogin();
    render(<App />);
  });

  describe('Bill Filter & Sort Modals', () => {
    it('Check that filter modal renders', async () => {
      expect(screen.getByTestId(`Ionicons-filter-${colors.tertiary}`)).toBeOnTheScreen();
      await act(async () => {
        fireEvent.press(screen.getByTestId('filterButton'));
      });
      const filterModal = screen.getByTestId('filterModal');
      await waitFor(() => {
        expect(within(filterModal).getByText('All')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Federal')).toBeOnTheScreen();
        expect(within(filterModal).getByText('State')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Legislative Body')).toBeOnTheScreen();
        expect(within(filterModal).queryByText('Political Party')).not.toBeOnTheScreen();
        expect(within(filterModal).getByText('States')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Status')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Clear all')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Apply')).toBeOnTheScreen();
      });

      const federalButton = screen.getByTestId('federalButton');
      await act(async () => {
        fireEvent.press(federalButton);
      });
      await waitFor(() => {
        expect(within(filterModal).getByText('Legislative Body')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Status')).toBeOnTheScreen();
        expect(within(filterModal).queryByText('States')).not.toBeOnTheScreen();
      });

      const stateButton = screen.getByTestId('stateButton');
      await act(async () => {
        fireEvent.press(stateButton);
      });
      await waitFor(() => {
        expect(within(filterModal).getByText('States')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Status')).toBeOnTheScreen();
        expect(within(filterModal).queryByText('Legislative Body')).not.toBeOnTheScreen();
      });
    });

    it('Check that the filter options render', async () => {
      await act(async () => {
        fireEvent.press(screen.getByTestId('filterButton'));
      });
      const filterModal = screen.getByTestId('filterModal');
      const filterOptions = screen.getAllByTestId(`Ionicons-chevron-down-${colors.darkGray}`);

      await act(async () => {
        fireEvent.press(filterOptions[0]);
      });
      await waitFor(() => {
        expect(within(filterModal).getByText('Representative')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Senate')).toBeOnTheScreen();
      });

      await act(async () => {
        fireEvent.press(filterOptions[1]);
      });
      await waitFor(() => {
        expect(within(filterModal).getByText('Select items')).toBeOnTheScreen();
      });

      await act(async () => {
        fireEvent.press(
          within(screen.getByTestId('stateSelect')).getByTestId(
            `Ionicons-chevron-down-${colors.darkGray}`,
          ),
        );
      });
      await waitFor(() => {
        expect(within(filterModal).getByText('New York')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Oregon')).toBeOnTheScreen();
      });

      await act(async () => {
        fireEvent.press(filterOptions[2]);
      });
      await waitFor(() => {
        expect(within(filterModal).getByText('Introduced')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Passed')).toBeOnTheScreen();
      });
    });

    it('Check that sort modal renders', async () => {
      expect(screen.getByTestId(`Ionicons-swap-vertical-${colors.tertiary}`)).toBeOnTheScreen();
      await act(async () => {
        fireEvent.press(screen.getByTestId('sortButton'));
      });
      const sortModal = screen.getByTestId('sortModal');
      await waitFor(() => {
        expect(within(sortModal).getByText('Bill ID (A-Z)')).toBeOnTheScreen();
        expect(within(sortModal).getByText('Bill Title (A-Z)')).toBeOnTheScreen();
        expect(within(sortModal).getByText('Status Date (Newest)')).toBeOnTheScreen();
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
      await act(async () => {
        fireEvent.press(screen.getByTestId('filterButton'));
      });
      const filterModal = screen.getByTestId('filterModal');
      await waitFor(() => {
        expect(screen.getByTestId('legislatorList')).toBeOnTheScreen();
        expect(within(filterModal).getByText('All')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Federal')).toBeOnTheScreen();
        expect(within(filterModal).getByText('State')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Legislative Body')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Political Party')).toBeOnTheScreen();
        expect(within(filterModal).getByText('States')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Clear all')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Apply')).toBeOnTheScreen();
      });

      const federalButton = screen.getByTestId('federalButton');
      await act(async () => {
        fireEvent.press(federalButton);
      });
      await waitFor(() => {
        expect(within(filterModal).getByText('Legislative Body')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Political Party')).toBeOnTheScreen();
        expect(within(filterModal).queryByText('States')).not.toBeOnTheScreen();
      });

      const stateButton = screen.getByTestId('stateButton');
      await act(async () => {
        fireEvent.press(stateButton);
      });
      await waitFor(() => {
        expect(within(filterModal).getByText('Political Party')).toBeOnTheScreen();
        expect(within(filterModal).getByText('States')).toBeOnTheScreen();
        expect(within(filterModal).queryByText('Legislative Body')).not.toBeOnTheScreen();
      });
    });

    it('Check that the filter options render', async () => {
      await act(async () => {
        fireEvent.press(screen.getByTestId('filterButton'));
      });
      const filterModal = screen.getByTestId('filterModal');
      const filterOptions = screen.getAllByTestId(`Ionicons-chevron-down-${colors.darkGray}`);

      await act(async () => {
        fireEvent.press(filterOptions[0]);
      });
      await waitFor(() => {
        expect(within(filterModal).getByText('Representative')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Senate')).toBeOnTheScreen();
      });

      await act(async () => {
        fireEvent.press(filterOptions[1]);
      });
      await waitFor(() => {
        expect(within(filterModal).getByText('Democrat')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Republican')).toBeOnTheScreen();
      });

      await act(async () => {
        fireEvent.press(filterOptions[2]);
      });
      await waitFor(() => {
        expect(within(filterModal).getByText('Select items')).toBeOnTheScreen();
      });

      await act(async () => {
        fireEvent.press(
          within(screen.getByTestId('stateSelect')).getByTestId(
            `Ionicons-chevron-down-${colors.darkGray}`,
          ),
        );
      });
      await waitFor(() => {
        expect(within(filterModal).getByText('New York')).toBeOnTheScreen();
        expect(within(filterModal).getByText('Oregon')).toBeOnTheScreen();
      });
    });

    it('Check that sort modal renders', async () => {
      expect(screen.getByTestId(`Ionicons-swap-vertical-${colors.tertiary}`)).toBeOnTheScreen();
      await act(async () => {
        fireEvent.press(screen.getByTestId('sortButton'));
      });
      const sortModal = screen.getByTestId('sortModal');
      await act(async () => {
        await waitFor(() => {
          expect(within(sortModal).getByText('Legislator Name (A-Z)')).toBeOnTheScreen();
        });
      });
    });
  });
});
