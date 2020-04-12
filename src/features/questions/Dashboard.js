import React from 'react'
import { connect } from 'react-redux'
import FilterLink from '../filters/FilterLink'
import { VisibilityFilters } from '../filters/filtersSlice'
import VisibleQuestions from './VisibleQuestions'

const Dashboard = ({authedUser, browserHistory}) =>{

	if(!authedUser.userId)
		browserHistory.push('/login') 

	return (
		<div className="container">
			<ul className="nav nav-fill w-50 mx-auto mb-1">
				<li className="nav-item px-2">
					<FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
				</li>
				<li className="nav-item px-2">
					<FilterLink filter={VisibilityFilters.SHOW_ANSWERED}>Answered</FilterLink>
				</li>
				<li className="nav-item px-2">
					<FilterLink filter={VisibilityFilters.SHOW_UNANSWERED}>Unaswered</FilterLink>
				</li>
			</ul>
				<VisibleQuestions />
		</div>
	)
 }
 
 const mapStateToProps = ({authedUser}, props) => ({
	authedUser,
	browserHistory: props.history
 })
 
 export default connect(mapStateToProps)(Dashboard)