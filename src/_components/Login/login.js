import React from 'react';
import { connect } from 'react-redux';


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

   

    handleSubmit(e) {
		e.preventDefault();
		this.props.login(this.state.username, 'password');       
    }


    render() {
         return (
            <div style={{marginTop:'-90px'}} >
             <div class="w3l_banner_nav_right">
                    <div class="w3_login">
			<h3>Sign In & Sign Up</h3>
			
			<div class="w3_login_module">
				<div class="module form-module">
				  <div class="toggle"><i class="fa fa-times fa-pencil"></i>
					<div class="tooltip">Click for Sign up</div>
				  </div>
				  <div class="form">
					<h2>Login to your account..</h2>
					<form >
					  <input type="text" name="Username" onClick={(e) => this.setState({username: e.target.value})} value={this.state.username} placeholder="Username" required=" "/>
					  <input type="password" name="Password" placeholder="Password" required=" "/>
					  <input type="submit" value="Login"/>
					  <div class="clearfix"> &nbsp;</div>
					  <div >
					  <input type="submit" onClick={this.handleSubmit} value="Sign up"/>
					  </div>
					</form>
				  </div>
				
				    <div class="cta"><a href="#">Forgot your password?</a></div>
				</div> 
				
			</div>	
		
		  </div>


                    </div>
            </div>
        );
    }
}



const connectedSignIn = connect()(SignIn);
export { connectedSignIn as SignIn };