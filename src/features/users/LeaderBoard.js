import React from 'react'
import UserSummary from './UserSummary'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const LeaderBoard = ({users, sortedUserIds, authedUser }) => {

	if(!authedUser.userId){
		return(
			<div className="container text-center">
				<h5>You must login in order to submit a question... </h5>
				<Link to='/login'>
					Take me to login page
				</Link>
			</div>
		)
	}

	return (
		<div className="w-50 mx-auto pl-0">
			{sortedUserIds.map(userId => {
				return <UserSummary key={userId} {...users.entities[userId]} />
			})}
		</div>
	)
}

const mapStateToProps = ({users, authedUser}) => {
	return {
		users,
		sortedUserIds: Object.keys(users.entities)
				.sort((a,b) => (Object.keys(users.entities[b].answers).length + users.entities[b].questions.length)
				 - (Object.keys(users.entities[a].answers).length + users.entities[a].questions.length)),
			authedUser
	}
}

export default  connect(mapStateToProps)(LeaderBoard)