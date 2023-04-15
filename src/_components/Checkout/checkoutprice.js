import React from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { cartActions  } from '../../_actions';
import CircularProgress  from './../../_components/Common/circularIndeterminate';

class CheckoutPrice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: this.props.cartItem.qty
        };       
	}
	
	handleChange = (event) => {
		let item = this.props.cartItem;
		this.setState({ qty: event.target.value });
        item.qty = event.target.value
		const req = {
			product : item,
			id: this.props.cart.id
		}
		this.props.updateToCart(req);
	};

	handleRemove = (event, item) => {
	    const req = {
			product : item,
			id: this.props.cart.id
		}
		this.props.removeToCart(req);
	
	};

    render() {
         return (
            <li>{this.props.cartItem.productName} <i>{('(Qty:'+this.props.cartItem.qty+')')}</i> <span>{Number((this.props.cartItem.price - this.props.cartItem.discount) * this.state.qty).toFixed(2)+'(Rs)'} </span></li>                    
        );
    }
}

function mapState(state) {
    const { loggedIn } = state.authentication;
	const { cart, cartloading } = state.cartList;
	return { loggedIn, cart, cartloading };    
}

const actionCreators = {    	
	updateToCart : cartActions.updateToCart,
	removeToCart : cartActions.removeToCart
};

const connectedCheckoutPrice = connect(mapState, actionCreators)(CheckoutPrice);
export { connectedCheckoutPrice as CheckoutPrice };
