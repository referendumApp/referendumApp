// import React from 'react';
// import { Provider } from 'react-redux';
//
// import { configureStore } from '@reduxjs/toolkit';
// import { render as rtlRender } from '@testing-library/react-native';
//
// import baseApi from '../src/store/baseApi';
// import rootReducer from '../src/store/rootReducer';
// import { getMiddlewareOptions } from '../src/store/utils';
//
// // Mock the API with default responses
// jest.mock('../src/store/baseApi', () => ({
//   ...jest.requireActual('../src/store/baseApi'),
//   useQuery: () => ({ data: null, isLoading: false }),
//   useMutation: () => [() => {}, { isLoading: false }],
// }));
//
// const createTestStore = () => {
//   return configureStore({
//     reducer: rootReducer,
//     middleware: getDefaultMiddleware =>
//       getDefaultMiddleware(getMiddlewareOptions()).concat(baseApi.middleware),
//   });
// };
//
// function render(ui: React.ReactElement, { store = createTestStore(), ...renderOptions } = {}) {
//   function Wrapper({ children }: { children: React.ReactNode }) {
//     return <Provider store={store}>{children}</Provider>;
//   }
//   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// }
//
// // re-export everything
// export * from '@testing-library/react-native';
// // override render method
// export { render, createTestStore };
