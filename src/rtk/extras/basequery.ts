import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_BASE_URL });

const handleRefreshToken = async (
  api: any,
  extraOptions: any
): Promise<any> => {
  const refreshResult = await baseQuery(
    '/refreshToken',
    api,
    extraOptions
  )
  if (refreshResult.data) {
    // api.dispatch(tokenReceived(refreshResult.data))
    return refreshResult.data
  } else {
    // api.dispatch(loggedOut())
    return null
  }
}

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const release = await mutex.acquire()
  try {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
      const refreshTokenResult = await handleRefreshToken(api, extraOptions)
      
      if (refreshTokenResult) {
        result = await baseQuery(args, api, extraOptions)
      }
    }
    return result
  } finally {
    release()
  }
}

export default baseQueryWithReauth;

