import React from 'react'
import logo from '../../logo.svg'
import { authenticateUser } from './authedUserSlice'
import { connect } from "react-redux";

const Login = ({ users, dispatch, history }) => {

	const handleLogin = (e) => {
		const userId = e.target.value 
		const user = users.entities[userId]
		dispatch(authenticateUser(user))
		history.push('/home')
	}

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-lg-8">
					<div className="card">
						<div className="card-header text-center">
							<h6><b>Welcome! This is Would You Rather App.</b></h6>
							<small>Please sign in to continue</small>
						</div>
						<div className="card-body text-center">
							<img className="App-logo"	src={logo} alt="logo"/>
							<legend className="text-center text-info">Sign In As...</legend>
							<select 
								name="user"
								className="form-control" 
								id="userDrDown"
								onChange={handleLogin}>
									<option value="" defaultValue>Select Username...</option>
									{users && (Object.keys(users.entities).map( (id) => (
										<option value={id} key={id}>{users.entities[id].name}</option>
									)))}
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = ({users}, props) => ({
	users,
	props
})

export default connect(mapStateToProps)(Login)