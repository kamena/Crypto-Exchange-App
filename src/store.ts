import { configureStore } from '@reduxjs/toolkit'
import pairPricesReducer from './components/PairPrice.slice'

const store = configureStore({
  reducer: {
    pairPrices: pairPricesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
