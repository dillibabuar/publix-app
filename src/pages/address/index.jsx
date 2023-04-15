import React from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { CheckoutList } from './../../_components/Checkout/checkoutlist';
import  AddressRadio  from './../../_components/Address/address';
import { SignInDialog } from './../../_components/SimpleDialog/signindialog';
import  GoogleMaps from './../../_components/Googlemap/googlemap';

import { userActions, cartActions } from './../../_actions';


class Address extends React.Component {

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
			helperText: ''	
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

	render() {

		const { addressList, id } = this.props.cart || [];
        const address = (this.props.user && this.props.user.data && this.props.user.data.user && (this.props.user.data.user.address || this.props.user.data.user.guestaddress)) || [];

		return (

			<div >
				<div className="w3l_banner_nav_right">
					<div className="privacy about">						
                        <div className="col-md-8 address_form_agile">
                          {/*  <AddressRadio cartId={id} updateAddressToCart={this.props.updateAddressToCart} addressList={addressList} address={address} />                         */}
						  <AddressRadio cartId={id} updateAddressToCart={this.props.updateAddressToCart}  />                        
						</div>
                    </div>
				</div>

				<div className="banner_bottom">
					<div className="wthree_banner_bottom_left_grid_sub">&nbsp;</div>
					<div className="clearfix"> </div>
				</div>
				<div style={{ height: '200px' }}>

				</div>			
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
	updateAddressToCart: cartActions.updateAddressToCart
}

const connectedAddressPage = connect(mapState, actionCreators)(Address);
export { connectedAddressPage as Address };
