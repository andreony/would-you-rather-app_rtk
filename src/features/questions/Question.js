import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { formatQuestion } from '../../utils/helpers'
import { connect } from 'react-redux'

const Question = ({ question, authedUser, users }) => {
	const { id, authorName, avatarURL, optionOne } = question

	if(!authedUser.userId)
		return <Redirect to='/' />

	return (
		<div className="card mb-3">
			<div className="card-header">
				<em> {authorName} </em>
				<span>askes: </span>
			</div>
			<div className="card-body text-center py-2">
				<div className="row">
					<div className="col-sm-4 d-flex flex-column align-items-center border-right w-100">
						<img src={avatarURL} alt="avatar" width="100px" height="100px" className="rounded immage"/>
						<div className='font-weight-bold my-2'>{authorName}</div>
					</div>
					<div className="col-sm-8">
						<div className="card-title font-weight-bold text-left"><em>Would you rather...</em></div>
						<p>{optionOne.text.slice(0,15)}...</p>
						<Link 
							to={ users.entities[authedUser.userId].answers[id] 
									? `/question/${id}/answer`
									: `/question/${id}`}>
								<button className="btn btn-info">View Poll</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = ({questions, users, authedUser}, {id}) => {
	const question = questions.entities[id] 

	return{
		question: question
			? formatQuestion(question, users.entities[question.author], authedUser)
			: null,
		authedUser,
		users
	}
}

export default connect(mapStateToProps)(Question)