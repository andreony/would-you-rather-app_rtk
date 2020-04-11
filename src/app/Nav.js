import React, { Fragment } from 'react'
import mainLogo from '../logo.svg'
import { NavLink, Link } from 'react-router-dom'
import { selectUserEntities } from '../features/users/usersSlice'
import { selectAuthedUser } from '../features/auth/authedUserSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Nav() {
	const authedUser = useSelector(selectAuthedUser)
	const users = useSelector(selectUserEntities) 
	const dispatch = useDispatch()
	
	return (
	<nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
		<Link className="navbar-brand" to="/home">
			<img width="48px" height="48px" src={mainLogo} alt="Navbar"/>
		</Link>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse" id="navbarNav">
			<ul className="navbar-nav align-items-center w-75 mx-auto">
					<li className="nav-item px-3">
							<NavLink to="/" exact activeClassName='active-nav'>
									Home
							</NavLink>
					</li>
					{authedUser && (
					<Fragment>
						<li className="nav-item px-3">
								<NavLink to="/add" activeClassName='active-nav'>
										New Question
								</NavLink>
						</li>
						<li className="nav-item px-3">
								<NavLink to="/leader-board" activeClassName='active-nav'>
										Leader Board
								</NavLink>
						</li>
						<li className="nav-item ml-auto">
								<em>Welcome! </em>
								<img width="48px" height="48px" 
										className="rounded-circle mx-2"
										src={users[authedUser.user].avatarURL} 
										alt={users[authedUser.user].name}/>
								<span>{users[authedUser.user].name}</span>
						</li>
						<li className="nav-item mx-2 pb-2">
								<NavLink 
										className="btn btn-outline-info"
										to="/"
										onClick={() => {/* todo // dispatch(logoutUser(authedUser)) */}}>
										Logout
								</NavLink>
						</li>
					</Fragment>
			)}
			</ul>
		</div>
	</nav>
)
}