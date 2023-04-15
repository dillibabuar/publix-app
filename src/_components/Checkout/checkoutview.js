import React from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { cartActions  } from '../../_actions';
import CircularProgress  from './../../_components/Common/circularIndeterminate';

class CheckoutView extends React.Component {
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
            <tr className="rem1">
            <td className="invert">{parseInt(this.props.index + 1)}</td>
            <td className="invert-image"><a><img src={this.props.cartItem.image} alt=" " className="img-responsive"/></a></td>
            <td className="invert">
                 <div className="quantity"> 
                    <div className="quantity-select">                           
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
                </div>
            </td>
            <td className="invert">{this.props.cartItem.productName}</td>
            
            <td className="invert">{'Rs.'+Number((this.props.cartItem.price - this.props.cartItem.discount) * this.state.qty).toFixed(2)}</td>
            <td className="invert">
                <div className="rem" onClick={(e) => { this.handleRemove(e, this.props.cartItem)}}>
                    <div className="close1"> </div>
                </div>

            </td>
            {this.props.cartloading && (
			<div><CircularProgress /></div>
			)}
        </tr>
                    
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

const connectedCheckoutView = connect(mapState, actionCreators)(CheckoutView);
export { connectedCheckoutView as CheckoutView };
