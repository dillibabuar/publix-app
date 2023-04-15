import React from 'react';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormHelperText from '@material-ui/core/FormHelperText';
import { userActions } from '../../_actions';
const emails = ['username@gmail.com', 'user02@gmail.com'];

class SignInDialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			signinFlag: true,
			userName: '',
			passCode: '',
			name: '',
			email: '',
			mobile: '',
			helperTextuserName: '',
			helperTextpassCode: '',		
			helperTextname: '',
			helperTextemail: '',	
			helperTextmobile: '',			
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}

	handleTabChange = () => {
		this.setState({ signinFlag: !this.state.signinFlag });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			helperTextuserName: '',
			helperTextpassCode: '',		
			
		});
		if(this.state.signinFlag && !this.state.userName){
			this.setState({
				helperTextuserName: 'Please enter the user name'				
			});
		}
		if(this.state.signinFlag && !this.state.passCode){
			this.setState({
				helperTextpassCode: 'Please enter the password'				
			});
		}
		if(this.state.signinFlag && this.state.userName && this.state.passCode){
			this.props.login(this.state.userName, this.state.passCode, (this.props.cart && this.props.cart.id), 'checkout'); 
			this.props.onClose(false);  
		}
		     
	}

	handleRegister(e) {
		e.preventDefault();
		this.setState({
			helperTextuserName: '',
			helperTextpassCode: '',		
			helperTextname: '',
			helperTextemail: '',	
			helperTextmobile: '',	
		});
		if(!this.state.signinFlag && !this.state.userName){
			this.setState({
				helperTextuserName: 'Please enter the user name'				
			});
		}
		if(!this.state.signinFlag && !this.state.passCode){
			this.setState({
				helperTextpassCode: 'Please enter the password'				
			});
		}
		if(!this.state.signinFlag && !this.state.name){
			this.setState({
				helperTextname: 'Please enter the full name'				
			});
		}
		if(!this.state.signinFlag && !this.state.email){
			this.setState({
				helperTextemail: 'Please enter the email id'				
			});
		}
		if(!this.state.signinFlag && !this.state.mobile){
			this.setState({
				helperTextmobile: 'Please enter the mobile number'				
			});
		}

		if(!this.state.signinFlag && this.state.userName && this.state.passCode && this.state.name && this.state.email && this.state.mobile){
			
			const reqUser = {
				username: this.state.userName,
				password: this.state.passCode,
				name: this.state.name,
				email: this.state.email,
				mobile: this.state.mobile,
				isActive: true
			}
			
		   this.props.register(reqUser);  
		   this.props.onClose(false); 
		}
		     
	   
   }

  handleClickOpen = () => {    
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.onClose(false);
  };

  handleGo = () => {    
   // history.push('/checkout')
  };
	
	render() {
		//  const { user, users } = this.props;
	return (
      <Dialog onClose={this.handleClose} open={open}>
      <DialogTitle id="simple-dialog-title"><div style={{width:'300px',textAlign:'left'}}>{this.state.signinFlag?'Sign In':'Register'}</div>
	  <div onClick={this.handleClose} style={{textAlign:'right', marginTop:'-35px'}}>X</div></DialogTitle>
      <DialogContent dividers>
       <div style={{marginTop:'-50px'}} class="w3_SignInDialog_module">
							<div class="module form-module">
                {this.state.signinFlag && (
                    <div> 
						        <FormHelperText style={{color:'red'}} >{this.state.helperTextuserName}</FormHelperText> 
                                <FormHelperText style={{color:'red'}} >{this.state.helperTextpassCode}</FormHelperText> 
                               
										<form action="#" method="post">
										    <div className="controls"><label className="control-label">Username: </label>
											<input type="text" onChange={e => this.setState({userName: e.target.value})} name="Username" placeholder="Username" required=" " />
											</div>
										    <div className="controls"><label className="control-label">Password: </label>
											<input type="password"  onChange={e => this.setState({passCode: e.target.value})} name="Password" placeholder="Password" required=" " />
											</div>
										    <input type="submit" onClick={this.handleSubmit} value="Sign In" />
											<div class="clearfix"> &nbsp;</div>
											<div >
												<input type="submit" onClick={this.handleTabChange} value="Sign up" />
											</div>
										</form>
					</div>

				)}
                {!this.state.signinFlag && (
                    <div> 
						        <FormHelperText style={{color:'red'}} >{this.state.helperTextuserName}</FormHelperText> 
                                <FormHelperText style={{color:'red'}} >{this.state.helperTextpassCode}</FormHelperText> 
						        <FormHelperText style={{color:'red'}} >{this.state.helperTextname}</FormHelperText> 
                                <FormHelperText style={{color:'red'}} >{this.state.helperTextemail}</FormHelperText> 
                                <FormHelperText style={{color:'red'}} >{this.state.helperTextmobile}</FormHelperText> 
                               		
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
					</div>

				)}
              </div>
       </div>
      </DialogContent>
      </Dialog>
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

const connectedSignInDialogPage = connect(mapState, actionCreators)(SignInDialog);
export { connectedSignInDialogPage as SignInDialog };


   // export {  SignInDialog };