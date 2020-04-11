import React, { useState } from 'react'
import { handleAsyncSaveQ } from './questionsSlice'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const NewQuestion = ({authedUser, dispatch}) => {

	const [newQuestion, setQuestion] = useState({
		author: authedUser.userId,
		optionOneText:'',
		optionTwoText:'',
	})

	if(!authedUser.userId)
		return(
			<div className="container text-center">
				<h5>You must login in order to submit a question... </h5>
				<Link to='/login'>
					Take me to login page
				</Link>
			</div>
		)
	

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(handleAsyncSaveQ(newQuestion))
	}
	const handleChange = (e) => {
		newQuestion[e.target.id] = e.target.value
		setQuestion(newQuestion)
	}

	return (
		<div className="container w-75 mx-auto">
			<legend className='border-bottom mb-3'>Add a question</legend>
			<form 
				onSubmit={handleSubmit}>
				<h6>Would you rather?...</h6>
				<div className="form-group">
					<label htmlFor="optionOneText">Q1</label>
					<input id="optionOneText" type="text" placeholder="Enter first question..." 
						className="form-control" onChange={handleChange}/>
				</div>
				<div className="form-group">
					<label htmlFor="optionTwoText">Q2</label>
					<input id="optionTwoText" type="text" placeholder="Enter second question..." 
						className="form-control" onChange={handleChange}/>
				</div>
				<button className="btn btn-info w-100" type="submit">Submit</button>
			</form>
		</div>
	)
}

const mapStateToProps = ({authedUser}) => ({
	authedUser
})

export default connect(mapStateToProps)(NewQuestion)