import { createSlice } from "@reduxjs/toolkit";

export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_ANSWERED: 'SHOW_ANSWERED',
	SHOW_UNANSWERED: 'SHOW_UNANSWERED'
}

const filtersSlice = createSlice({
	name: 'visibilityFilters',
	initialState:"SHOW_ALL",
	reducers:{
		setVisibilityFilter(state, action) {
			return action.payload
		}
	}
})

export const { setVisibilityFilter } = filtersSlice.actions

export default filtersSlice.reducer
