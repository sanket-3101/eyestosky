import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './slice/Auth'
import NavigationReducer from './slice/Navigation'
export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        navigation: NavigationReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

