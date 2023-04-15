import React from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { CheckoutList } from './../../_components/Checkout/checkoutlist';
import { CheckoutPriceList } from './../../_components/Checkout/checkoutpricelist';
import { SignInDialog } from './../../_components/SimpleDialog/signindialog';
import { userActions } from './../../_actions';

class Checkout extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			emptyMsg: '',
			signInFlag: false,
			guessFlag: false,
			open: false, setOpen: false,
			name: '',
			email: '',
			mobile: '',
			helperTextname: '',	
			helperTextemail: '',
			helperTextmobile: '',		
		};
	}

	handleClickOpen = () => {
		this.setState({ open: true, signInFlag: true });
	};


	handleClose = () => {
		this.setState({ open: false, signInFlag: false });
	};

	mapValues = (values) => {
	 this.getAddressDetails(values)
	}

	handleRegister(e) {
		e.preventDefault();	
		this.setState({
			helperTextname: '',
			helperTextemail: '',	
			helperTextmobile: '',	
		});

		if(!this.state.name){
			this.setState({
				helperTextname: 'Please enter the full name'				
			});
		}
		if(!this.state.email){
			this.setState({
				helperTextemail: 'Please enter the email id'				
			});
		}
		if(!this.state.mobile){
			this.setState({
				helperTextmobile: 'Please enter the mobile number'				
			});
		}
		if(this.state.name && this.state.email && this.state.mobile){
			const reqUser = {
				name: this.state.name,
				email: this.state.email,
				mobile: this.state.mobile,
				cartId: (this.props.cart && this.props.cart.id)
			}	
			this.props.guestregister(reqUser,'checkout');    
		}
		    
   }

   getAddressDetails = (data) => {
    const componentForm = {
      street_number: 'short_name',
      route: 'short_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      postal_code: 'short_name',
    };
    let street_address1 = '';
    const test = {};
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: data }, (results, status) => {
      if (status === 'OK') {
        if (results && results[0]) {
          const { address_components } = results[0];

          for (let i = 0, len = address_components.length; i < len; i++) {
            const addressType = address_components[i].types[0];
            if (componentForm[addressType]) {
              const val = address_components[i][componentForm[addressType]];
              if (addressType === 'street_number') {
                street_address1 = address_components[i][componentForm[addressType]];
              } else if (addressType === 'route') {
                street_address1
                  += ' ' + address_components[i][componentForm[addressType]];
                test[addressType] = street_address1;
              } else {
                test[addressType] = val;
              }
            }
          }
          this.updateAddressInput(test);
        }
      }
    });
  };

   updateAddressInput = (data) => {
	
    const computedData = `${data.route ? data.route : ' '},${data.administrative_area_level_1 ? data.administrative_area_level_1 : ' '},${data.locality ? data.locality : ' '},${data.postal_code ? data.postal_code : ' '}`;
	/* fieldObj[this.props.param.field] = computedData;
    this.setState({ input: fieldObj });
    this.keyboard.setInput(computedData);
    this.setState({ showAddress2: true });
    requestObj.address1 = data.route || '';
    requestObj.city = data.locality || '';
    requestObj.state = data.administrative_area_level_1 || '';
    requestObj.zipcode = data.postal_code || '';  */
  }


	render() {

		const { cartItemList } = this.props.cart || [];
        const address = (this.props.user && this.props.user.data && this.props.user.data.user && (this.props.user.data.user.address || this.props.user.data.user.guestaddress)) || [];

		return (

			<div >
				<div className="w3l_banner_nav_right">
					<div className="privacy about">
						<h3>Chec<span>kout</span></h3>
						<div className="checkout-right">
							<h4>Your shopping cart contains: <span>{cartItemList && cartItemList.length} Products</span></h4>
							<CheckoutList cartList={this.props.cart} cartloading={this.props.cartloading} />
						</div>


						<div className="checkout-left">
							<CheckoutPriceList cartList={this.props.cart} cartloading={this.props.cartloading} />
							
                            {this.props.loggedIn && this.props.user && this.props.user.data && this.props.user.data.user  && (
								<div style={{ marginTop: '-5px' }} className="col-md-8 address_form_agile"><a href="/address">
                                <button type="button" style={{ margin: '0 auto', 'text-align': 'center', width: '300px' }} className="submit check_out">Add Address</button>
								</a>									
								</div>
							)}
                         

							{!this.props.loggedIn && (
								<div className="col-md-8 address_form_agile">
									<button onClick={this.handleClickOpen.bind(this)} style={{ margin: '0 auto', 'text-align': 'center', width: '200px' }} className="submit check_out">Sign In</button>
									<div style={{ margin: '0 auto', 'text-align': 'center' }}>&nbsp;</div>
									<div style={{ margin: '0 auto', 'text-align': 'center' }}>OR</div>
									<h4>Add a Details</h4>
									<form className="creditly-card-form agileinfo_form">
										<section className="creditly-wrapper wthree, w3_agileits_wrapper">
											<div className="information-wrapper">
												<div className="first-row form-group">
													<div className="controls">
														<label className="control-label">Full name: </label>
														<FormHelperText style={{color:'red'}} >{this.state.helperTextname}</FormHelperText> 
														<input onChange={e => this.setState({name: e.target.value})} className="billing-address-name form-control" type="text" name="name" placeholder="Full name" />
													</div>
													<div className="w3_agileits_card_number_grids">
														<div className="w3_agileits_card_number_grid_left">
															<div className="controls">
																<label className="control-label">Mobile number:</label>
																<FormHelperText style={{color:'red'}} >{this.state.helperTextemail}</FormHelperText> 
																<input onChange={e => this.setState({mobile: e.target.value})} className="form-control" type="text" placeholder="Mobile number" />
															</div>
														</div>
														<div className="w3_agileits_card_number_grid_right">
															<div className="controls">
																<label className="control-label">Email: </label>
																<FormHelperText style={{color:'red'}} >{this.state.helperTextmobile}</FormHelperText> 
																<input onChange={e => this.setState({email: e.target.value})} className="form-control" type="email" placeholder="Landmark" />
															</div>
														</div>
														<div className="clear"> </div>
													</div>

												</div>
												<button onClick={this.handleRegister.bind(this)} className="submit check_out">Continue</button>
											</div>
										</section>
									</form>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="banner_bottom">
					<div className="wthree_banner_bottom_left_grid_sub">&nbsp;</div>
					<div className="clearfix"> </div>
				</div>
				<div style={{ height: '200px' }}>
				</div>

				{ this.state.signInFlag && (
					<SignInDialog open={this.state.open} onClose={this.handleClose.bind(this)} />
				)}
			</div>
		);
	}
}

function mapState(state) {
	const { users, authentication } = state;
	const { user, loggedIn } = authentication;
	const { dealproducts, loading } = state.productList;
	const { cart } = state.cartList;
	return { user, users, dealproducts, loading, cart, loggedIn };
}

const actionCreators = {
	guestregister: userActions.guestregister,
}

const connectedCheckoutPage = connect(mapState, actionCreators)(Checkout);
export { connectedCheckoutPage as Checkout };
