import React from 'react'
import ProgressBar from './ProgressBar'
import { formatQuestion } from '../../utils/helpers'
import { connect } from 'react-redux'

const PollResult = ({question, authedUser, browsingHistory }) => {

	if(!question)
		return <div>Loading...</div>	

	const {authorName, avatarURL, hasAnsweredOptOne, hasAnsweredOptTwo} = question
	const optOneCounts = question.optionOne.votes.length
	const optTwoCounts = question.optionTwo.votes.length

	if(!authedUser.userId)
		browsingHistory.push('/login')

	return (
		<div className="card w-50 mx-auto mb-3">
			<div className="card-header">
				<b>Asked by {authorName} </b>
			</div>
			<div className="card-body py-2">
				<div className="row align-intems-center">
					<div className="col-sm-4 d-flex flex-column justify-content-center align-items-center border-right w-100">
						<img src={avatarURL} alt="avatar" width="120px" height="120px" className="rounded immage"/>
						<div className="text-center my-2">
								<b>{authorName}</b>
						</div>
					</div>
					<div className="col-sm-8">
						<div className="card-title font-weight-bold">Results:</div>
							<div className="row">
								<div className="col-sm-12">
									<div 
										className={hasAnsweredOptOne 
												? "card bg-success-light position-relative mb-2"
												: "card mb-2"
										}>
										<div className="your-answer">You</div>
										<div className="card-body py-2">
												<p>{question.optionOne.text}</p>
												<ProgressBar percentage={(optOneCounts * 100 / (optOneCounts + optTwoCounts)).toFixed(1) }/>
												<p><b>{`${optOneCounts} out of ${optOneCounts + optTwoCounts} votes`}</b></p>
										</div>
								</div>
							</div>
							<div className="col-sm-12">
								<div 
									className={hasAnsweredOptTwo 
											? "card bg-success-light your-answer mb-2"
											: "card mb-2"
									}>
									<div className="your-answer">You</div>
									<div className="card-body py-2">
											<p>{question.optionTwo.text}</p>
											<ProgressBar percentage={(optTwoCounts *100 / (optOneCounts + optTwoCounts)).toFixed(1)}/>
											<p><b>{`${optTwoCounts} out of ${optOneCounts + optTwoCounts} votes`}</b></p>
									</div>
								</div>
							</div>
						</div>
																			
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = ({ questions, users, authedUser }, props) => {
	const { id } = props.match.params
	const question = questions.entities[id]

	return{
			id,
			authedUser,
			question: question 
				? formatQuestion(question, users.entities[question.author], authedUser)
				: null,
			browsingHistory: props.history
	}
}

export default connect(mapStateToProps)(PollResult)