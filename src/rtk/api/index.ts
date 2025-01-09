import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from '../extras/basequery';

export const adminAPI = createApi({
  reducerPath: 'adminAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({
  }),
});

export default adminAPI;
