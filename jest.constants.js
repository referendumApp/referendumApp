import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

import { setBillDetails } from './src/screens/BillDetail/redux/duck';
import { setLegislators } from './src/screens/LegislatorDetail/redux/duck';
import { login, logout } from './src/screens/Login/redux/duck';
import store from './src/store';

export const mockSignUp = jest.fn().mockImplementation(() => ({
  unwrap: jest.fn().mockResolvedValue({
    data: {
      email: 'tester',
      name: 'Tester',
      id: 1,
      followedBills: [],
      followedTopics: [],
      followedLegislators: [],
    },
  }),
}));

export const mockLogin = jest.fn().mockImplementation(async () => {
  const result = {
    unwrap: jest.fn().mockResolvedValue({
      data: {
        refreshToken: 'test',
        accessToken: 'test',
        tokenType: 'bearer',
      },
    }),
  };

  const unwrappedResult = await result.unwrap();
  store.dispatch(login(unwrappedResult));

  return result;
});

export const mockLogout = jest.fn(() => store.dispatch(logout()));

export const mockReduxState = jest.fn(() => store.getState());

export const mockBills = jest.fn().mockImplementation(() => {
  const result = jest.fn().mockReturnValue({
    data: [
      {
        billId: 1741372,
        legiscanId: 1741372,
        identifier: 'HB1',
        title:
          'Lower Energy Costs Act TAPP American Resources Act Water Quality Certification and Energy Project Improvement Act of 2023 Transparency, Accountability, Permitting, and Production of American Resources Act',
        description:
          'To lower energy costs by increasing American energy production, exports, infrastructure, and critical minerals processing, by promoting transparency, accountability, permitting, and production of American resources, and by improving water quality certification and energy projects, and for other purposes.',
        currentVersionId: 2769605,
        status: 'Introduced',
        statusDate: '2023-03-14',
        sessionId: 2041,
        sessionName: '118th Congress',
        stateId: 52,
        stateName: 'US Congress',
        legislativeBodyId: 114,
        roleId: 1,
        legislativeBodyRole: 'Representative',
        sponsors: [
          {
            billId: 1741372,
            legislatorId: 9209,
            legislatorName: 'Gus Bilirakis',
            rank: 34,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 9216,
            legislatorName: 'Robert Latta',
            rank: 14,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 9217,
            legislatorName: 'Tom McClintock',
            rank: 8,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 9273,
            legislatorName: 'Sam Graves',
            rank: 4,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 9274,
            legislatorName: 'Brett Guthrie',
            rank: 25,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 9329,
            legislatorName: 'Glenn Thompson',
            rank: 42,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 9346,
            legislatorName: 'Robert Aderholt',
            rank: 26,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 9381,
            legislatorName: 'Harold Rogers',
            rank: 44,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 9384,
            legislatorName: 'Steve Scalise',
            rank: 1,
            type: 'Primary Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 11049,
            legislatorName: 'Jeff Duncan',
            rank: 43,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 11077,
            legislatorName: 'Tim Walberg',
            rank: 29,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 14084,
            legislatorName: 'Richard Hudson',
            rank: 23,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 14922,
            legislatorName: 'Randy Weber',
            rank: 22,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 16447,
            legislatorName: 'Rick Allen',
            rank: 15,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 16454,
            legislatorName: 'Earl Carter',
            rank: 18,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 16477,
            legislatorName: 'Elise Stefanik',
            rank: 5,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 16480,
            legislatorName: 'Bruce Westerman',
            rank: 3,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 16483,
            legislatorName: 'Ryan Zinke',
            rank: 27,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 16490,
            legislatorName: 'Gary Palmer',
            rank: 24,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 16503,
            legislatorName: 'Garret Graves',
            rank: 6,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 17717,
            legislatorName: 'Darin LaHood',
            rank: 45,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 18300,
            legislatorName: 'Neal Dunn',
            rank: 17,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 18303,
            legislatorName: 'Drew Ferguson',
            rank: 9,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 18335,
            legislatorName: 'Claudia Tenney',
            rank: 33,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 19436,
            legislatorName: 'John Curtis',
            rank: 12,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 20040,
            legislatorName: 'Kelly Armstrong',
            rank: 13,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 20049,
            legislatorName: 'Dan Crenshaw',
            rank: 19,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 20076,
            legislatorName: 'John Joyce',
            rank: 11,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 20083,
            legislatorName: 'Dan Meuser',
            rank: 7,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 20092,
            legislatorName: 'Gregory Pence',
            rank: 32,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 20114,
            legislatorName: 'William Timmons',
            rank: 50,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 21927,
            legislatorName: 'Lauren Boebert',
            rank: 10,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 21928,
            legislatorName: 'Kat Cammack',
            rank: 30,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 21940,
            legislatorName: 'Mariannette Miller-Meeks',
            rank: 40,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 21941,
            legislatorName: 'Mary Miller',
            rank: 31,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 21945,
            legislatorName: 'Jacob Laturner',
            rank: 49,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 21963,
            legislatorName: 'Stephanie Bice',
            rank: 47,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 21971,
            legislatorName: 'August Pfluger',
            rank: 16,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 21974,
            legislatorName: 'Burgess Owens',
            rank: 46,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 22915,
            legislatorName: 'Julia Letlow',
            rank: 35,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 22967,
            legislatorName: 'Mike Carey',
            rank: 28,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 23997,
            legislatorName: 'Mark Alford',
            rank: 41,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 24007,
            legislatorName: 'Juan Ciscomani',
            rank: 36,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 24012,
            legislatorName: 'Monica De La Cruz',
            rank: 38,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 24026,
            legislatorName: 'Harriet Hageman',
            rank: 39,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 24039,
            legislatorName: 'Nicholas Langworthy',
            rank: 48,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 24069,
            legislatorName: 'Brandon Williams',
            rank: 37,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 9193,
            legislatorName: 'Cathy McMorris Rodgers',
            rank: 2,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 19676,
            legislatorName: 'Troy Balderson',
            rank: 20,
            type: 'Co-Sponsor',
          },
          {
            billId: 1741372,
            legislatorId: 9176,
            legislatorName: 'Michael Burgess',
            rank: 21,
            type: 'Co-Sponsor',
          },
        ],
      },
      {
        billId: 1642389,
        legiscanId: 1642389,
        identifier: 'SR9',
        title: 'A resolution to make effective appointment of Deputy Senate Legal Counsel.',
        description: 'A resolution to make effective appointment of Deputy Senate Legal Counsel.',
        currentVersionId: 2624417,
        status: 'Introduced',
        statusDate: '2023-01-03',
        sessionId: 2041,
        sessionName: '118th Congress',
        stateId: 52,
        stateName: 'US Congress',
        legislativeBodyId: 115,
        roleId: 2,
        legislativeBodyRole: 'Senator',
        sponsors: [
          {
            billId: 1642389,
            legislatorId: 9414,
            legislatorName: 'Charles Schumer',
            rank: 1,
            type: 'Primary Sponsor',
          },
        ],
      },
      {
        billId: 1642421,
        legiscanId: 1642421,
        identifier: 'SR7',
        title: 'A resolution fixing the hour of daily meeting of the Senate.',
        description: 'A resolution fixing the hour of daily meeting of the Senate.',
        currentVersionId: 2624933,
        status: 'Introduced',
        statusDate: '2023-01-03',
        sessionId: 2041,
        sessionName: '118th Congress',
        stateId: 52,
        stateName: 'US Congress',
        legislativeBodyId: 115,
        roleId: 2,
        legislativeBodyRole: 'Senator',
        sponsors: [
          {
            billId: 1642421,
            legislatorId: 9414,
            legislatorName: 'Charles Schumer',
            rank: 1,
            type: 'Primary Sponsor',
          },
        ],
      },
    ],
  });

  const { data } = result();
  if (mockReduxState().bills.detail.length === 0) {
    store.dispatch(setBillDetails(data));
  }

  return { data, isLoading: false, isError: false };
});

export const mockBillVotes = jest.fn().mockImplementation(() => {
  const data = [];

  return { data, isLoading: false, isError: false };
});

export const mockFollowedBills = jest.fn().mockImplementation(() => {
  const data = [];

  return { data, isLoading: false, isError: false };
});

export const mockBillVotingHistory = jest.fn().mockImplementation(() => {
  const data = {
    billId: 1741372,
    votes: [
      {
        billActionId: 1290287,
        date: '2023-03-30',
        actionDescription: 'On Agreeing to the Amendment RC# 177',
        legislatorVotes: [
          {
            legislatorId: 8955,
            legislatorName: 'Joe Biden',
            partyName: 'Democrat',
            stateName: 'US Congress',
            roleName: 'Representative',
            voteChoiceId: 1,
          },
          {
            legislatorId: 8957,
            legislatorName: 'Donald Trump',
            partyName: 'Republican',
            stateName: 'US Congress',
            roleName: 'Representative',
            voteChoiceId: 2,
          },
        ],
      },
      {
        billActionId: 1290285,
        date: '2023-03-30',
        actionDescription: 'On Agreeing to the Amendment RC# 175',
        legislatorVotes: [
          {
            legislatorId: 8955,
            legislatorName: 'Joe Biden',
            partyName: 'Democrat',
            stateName: 'US Congress',
            roleName: 'Representative',
            voteChoiceId: 1,
          },
          {
            legislatorId: 8957,
            legislatorName: 'Donald Trump',
            partyName: 'Democrat',
            stateName: 'US Congress',
            roleName: 'Representative',
            voteChoiceId: 2,
          },
        ],
      },
    ],
  };

  return { data, isLoading: false, isError: false };
});

export const mockBillUserVotes = jest.fn().mockImplementation(() => {
  const data = [];

  return { data, isLoading: false, isError: false };
});

export const mockBillBriefing = jest.fn().mockImplementation(() => {
  const data = { briefing: 'Test Briefing' };

  return { data, isLoading: false, isError: false };
});

export const mockBillText = jest.fn().mockImplementation(() => {
  const data = { text: 'Test Text' };

  return { data, isLoading: false, isError: false };
});

export const mockLegislators = jest.fn().mockImplementation(() => {
  const result = jest.fn().mockReturnValue({
    data: [
      {
        id: 9209,
        legiscanId: 9209,
        name: 'Gus Bilirakis',
        imageUrl:
          'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Gus_Bilirakis.jpg',
        district: 'HD-FL-12',
        partyId: 2,
        roleId: 1,
        stateId: 52,
        address: null,
        facebook: null,
        instagram: null,
        phone: null,
        twitter: null,
        committees: [],
        state: {
          id: 52,
          name: 'US Congress',
        },
        party: {
          id: 2,
          name: 'Republican',
        },
        role: {
          id: 1,
          name: 'Representative',
        },
      },
      {
        id: 9216,
        legiscanId: 9216,
        name: 'Robert Latta',
        imageUrl: 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Bob_Latta.jpg',
        district: 'HD-OH-5',
        partyId: 2,
        roleId: 1,
        stateId: 52,
        address: null,
        facebook: null,
        instagram: null,
        phone: null,
        twitter: null,
        committees: [],
        state: {
          id: 52,
          name: 'US Congress',
        },
        party: {
          id: 2,
          name: 'Republican',
        },
        role: {
          id: 1,
          name: 'Representative',
        },
      },
    ],
  });

  const { data } = result();
  if (mockReduxState().legislators.list.length === 0) {
    store.dispatch(setLegislators(data));
  }

  return { data, isLoading: false, isError: false };
});

export const mockLegislatorFollows = jest.fn().mockImplementation(() => {
  const data = [];

  return { data, isLoading: false, isError: false };
});

export const mockLegislatorVotingHistory = jest.fn().mockImplementation(() => {
  const data = [
    {
      billId: 1741372,
      identifier: 'HB1',
      title:
        'Lower Energy Costs Act TAPP American Resources Act Water Quality Certification and Energy Project Improvement Act of 2023 Transparency, Accountability, Permitting, and Production of American Resources Act',
      billActionVotes: [
        {
          billActionId: 1290287,
          date: '2023-03-30',
          actionDescription: 'On Agreeing to the Amendment RC# 177',
          voteChoiceId: 1,
        },
        {
          billActionId: 1290286,
          date: '2023-03-29',
          actionDescription: 'On Agreeing to the Amendment RC# 176',
          voteChoiceId: 2,
        },
      ],
    },
    {
      billId: 1724917,
      identifier: 'HB5',
      title: 'Parents Bill of Rights Act',
      billActionVotes: [
        {
          billActionId: 1284914,
          date: '2023-03-24',
          actionDescription: 'On Passage RC# 161',
          voteChoiceId: 1,
        },
        {
          billActionId: 1284913,
          date: '2023-03-24',
          actionDescription: 'On Motion to Recommit RC# 160',
          voteChoiceId: 2,
        },
        {
          billActionId: 1284912,
          date: '2023-03-24',
          actionDescription: 'On Agreeing to the Amendment RC# 159',
          voteChoiceId: 1,
        },
        {
          billActionId: 1284911,
          date: '2023-03-24',
          actionDescription: 'On Agreeing to the Amendment RC# 158',
          voteChoiceId: 2,
        },
        {
          billActionId: 1284910,
          date: '2023-03-24',
          actionDescription: 'On Agreeing to the Amendment RC# 157',
          voteChoiceId: 1,
        },
        {
          billActionId: 1284909,
          date: '2023-03-24',
          actionDescription: 'On Agreeing to the Amendment RC# 156',
          voteChoiceId: 1,
        },
        {
          billActionId: 1284908,
          date: '2023-03-24',
          actionDescription: 'On Agreeing to the Amendment RC# 155',
          voteChoiceId: 2,
        },
        {
          billActionId: 1284907,
          date: '2023-03-24',
          actionDescription: 'On Agreeing to the Amendment RC# 154',
          voteChoiceId: 1,
        },
        {
          billActionId: 1283751,
          date: '2023-03-23',
          actionDescription: 'On Agreeing to the Amendment RC# 153',
          voteChoiceId: 1,
        },
        {
          billActionId: 1283750,
          date: '2023-03-23',
          actionDescription: 'On Agreeing to the Amendment RC# 152',
          voteChoiceId: 1,
        },
        {
          billActionId: 1283749,
          date: '2023-03-23',
          actionDescription: 'On Agreeing to the Amendment RC# 151',
          voteChoiceId: 2,
        },
        {
          billActionId: 1283748,
          date: '2023-03-23',
          actionDescription: 'On Agreeing to the Amendment RC# 150',
          voteChoiceId: 2,
        },
      ],
    },
  ];

  return { data, isLoading: false, isError: false };
});
