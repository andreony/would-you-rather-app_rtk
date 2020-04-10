import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter({
    loading: false
})

const initialState = usersAdapter.getInitialState()

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers:{
        addUser: usersAdapter.addOne,
        receiveUsers(state, action){
            usersAdapter.setAll(state, action.payload)
        },
        /* for later */
        removeUser: usersAdapter.removeOne
    }
})

export const { addUser, receiveUsers, removeUser } = usersSlice.actions

export default usersSlice.reducer