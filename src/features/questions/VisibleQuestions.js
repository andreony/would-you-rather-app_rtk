import { createSelector } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import QuestionList from "./QustionList";
import { VisibilityFilters } from "../filters/filtersSlice";

const selectQustions = state => state.questions
const selectUsers = state => state.users
const selectAuthedUser = state => state.authedUser
const selectFilter = state => state.visibilityFilter

let filterdQuestions = {ids:[], entities:{}}

const selectVisibleQuestions = createSelector(
    [selectQustions, selectUsers, selectFilter, selectAuthedUser ],
    (questions, users, filter, authedUser) => {
			if(!authedUser.userId) 
				return filterdQuestions

			switch (filter) {
				case VisibilityFilters.SHOW_ALL:
					return questions

				case VisibilityFilters.SHOW_ANSWERED:
					filterdQuestions = {ids:[], entities:{}}
					questions.ids.map( id => {
						if(id in users.entities[authedUser.userId].answers){
								filterdQuestions.ids.push(id)
								filterdQuestions.entities[id] = questions.entities[id]
						}
						return false
					})
					return filterdQuestions

				case VisibilityFilters.SHOW_UNANSWERED:
					filterdQuestions = {ids:[], entities:{}}
					questions.ids.map( id => {
						if(!(id in users.entities[authedUser.userId].answers)){
							filterdQuestions.ids.push(id)
							filterdQuestions.entities[id] = questions.entities[id]
						}
						return false
					})
					return filterdQuestions
				default:
					throw new Error('Unknown filter: ' + filter)
			}
    }
)

const mapStateToProps = (state) => ({
	questions: selectVisibleQuestions(state),
	authedUser: state.authedUser
})

export default connect(mapStateToProps)(QuestionList)