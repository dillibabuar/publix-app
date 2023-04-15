import React from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { cartActions  } from '../../_actions';
import CircularProgress  from './../../_components/Common/circularIndeterminate';

class CartView extends React.Component {
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
		this.props.updateToCart(req)
		
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
            <li class="minicart-item">
				                     {this.props.cartloading && (
										<div style={{zIndex:'900'}}><CircularProgress /></div>
									 )}	 
								<div class="minicart-details-name"> <a class="minicart-name"
									href="#">{this.props.cartItem.productName}</a>
									{this.props.cartItem.discount > 0 && (
										<ul class="minicart-attributes">
										<li> Discount: $1.00
							            </li>
									</ul>
									)}
									
								</div>
								<div class="minicart-details-quantity">
									<Select style={{width:'35px', top: '-2px'}} 
										native
										value={this.state.qty}
										onChange={this.handleChange.bind(this )}
										input={<Input id="demo-dialog-native" />}
									>									
										<option value={1}>1</option>
										<option value={2}>2</option>
										<option value={3}>3</option>
										<option value={4}>4</option>
										<option value={5}>5</option>
										<option value={6}>6</option>
									</Select>
									
									</div>
								<div class="minicart-details-remove">
									<button type="button" class="minicart-remove" onClick={(e) => { this.handleRemove(e, this.props.cartItem)}} data-minicart-idx="1">×</button> </div>
								<div class="minicart-details-price"> <span class="minicart-price">{Number((this.props.cartItem.price - this.props.cartItem.discount) * this.state.qty).toFixed(2)}</span> </div> 
								
								   
			</li>
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

const connectedCartView = connect(mapState, actionCreators)(CartView);
export { connectedCartView as CartView };
