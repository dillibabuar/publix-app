import React from 'react';
import { connect } from 'react-redux';
import { Header } from './../../_components/Header/header';
import { LeftMenu } from './../../_components/LeftMenu/leftmenu';
import { RightBloc } from './../../_components/Right/rightblock';
import { Footer } from './../../_components/Footer/footer';
import { userActions } from './../../_actions';

class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			signinFlag: true,
			userName: '',
			passCode: '',
			name: '',
			email: '',
			mobile: ''			
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}

	handleTabChange = () => {
		this.setState({ signinFlag: !this.state.signinFlag });
	}

	handleSubmit(e) {
		 e.preventDefault();
		 this.props.login(this.state.userName, this.state.passCode, (this.props.cart && this.props.cart.id));        
	}

	handleRegister(e) {
		e.preventDefault();
		
		const reqUser = {
			username: this.state.userName,
			password: this.state.passCode,
			name: this.state.name,
			email: this.state.email,
			mobile: this.state.mobile,
			isActive: true
		}
	
	   this.props.register(reqUser);        
   }
	
	render() {
		//  const { user, users } = this.props;
		return (
			<div >
				
				<div class="w3l_banner_nav_right">				

					<div class="w3_login">
						<h3>Sign In & Sign Up</h3>
						<div class="w3_login_module">
							<div class="module form-module">
								
								{this.state.signinFlag && (
                               <div>
                                <div style={{zIndex:'10'}} class="toggle"><i class="fa fa-times fa-pencil"></i>
									<div class="tooltip" onClick={this.handleTabChange} >Click for Sign up</div>
								</div>
									<div class="form">
										<h2>Login to your account</h2>
										<form action="#" method="post">
											<input type="text" onChange={e => this.setState({userName: e.target.value})} name="Username" placeholder="Username" required=" " />
											<input type="password"  onChange={e => this.setState({passCode: e.target.value})} name="Password" placeholder="Password" required=" " />
											<input type="submit" onClick={this.handleSubmit} value="Login" />
											<div class="clearfix"> &nbsp;</div>
											<div >
												<input type="submit" onClick={this.handleTabChange} value="Sign up" />
											</div>
										</form>
										</div></div>

								)}

								{!this.state.signinFlag && (
									<div>
                                <div class="toggle"><i class="fa fa-times fa-pencil"></i>
									<div class="tooltip" onClick={this.handleTabChange} >Click for Sign In</div>
								</div>
									<div class="form">
										<h2>Create an account</h2>
										<form action="#" method="post">
											<input type="text" name="Username" onChange={e => this.setState({userName: e.target.value})} placeholder="Username" required=" " />
											<input type="password" name="Password" onChange={e => this.setState({passCode: e.target.value})} placeholder="Password" required=" " />
											<input type="text" name="Fullname" onChange={e => this.setState({name: e.target.value})} placeholder="Full Name" required=" " />
											<input type="email" name="Email" onChange={e => this.setState({email: e.target.value})} placeholder="Email Address" required=" " />
											<input type="text" name="Phone" onChange={e => this.setState({mobile: e.target.value})} placeholder="Mobile Number" required=" " />
											<input type="submit" onClick={this.handleRegister} value="Register" />
											<div class="clearfix"> &nbsp;</div>
											<div >
												<input type="submit" onClick={this.handleTabChange} value="Sign In" />
											</div>
										</form>
									</div></div>

								)}


								<div class="cta"><a href="#">Forgot your password?</a></div>
							</div>

						</div>


					</div>


				</div>
				<div class="clearfix"></div>
				<div class="clearfix"> </div>
				<div class="clearfix"> </div>
				<div class="clearfix"> </div>

				<div class="clearfix"> </div>
				<div class="clearfix"> </div>
				<div class="clearfix"> </div>

				<div class="clearfix"> </div>
				<div class="clearfix"> </div>

			
			</div>
		);
	}
}

function mapState(state) {
	const { loggingIn } = state.authentication;
	const { cart, cartloading } = state.cartList;	
	return { loggingIn, cart, cartloading };
}

const actionCreators = {
	login: userActions.login,
	register: userActions.register,
	logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(Login);
export { connectedLoginPage as Login };


   // export {  Login };