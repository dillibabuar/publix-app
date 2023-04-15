import React from 'react';
import { connect } from 'react-redux';
import { CheckoutView } from './checkoutview';

class CheckoutList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		const { cartItemList } = this.props.cartList || [];
		return (
                <table className="timetable_sub">
					<thead>
						<tr>
							<th>SNo.</th>	
							<th>Product</th>
							<th>Quality</th>
							<th>Product Name</th>
						
							<th>Price</th>
							<th>Remove</th>
						</tr>
					</thead>
					<tbody>


                   {cartItemList && cartItemList.length > 0 && (
					this.props.cartList && cartItemList.map((cartItem, index) => (
						<CheckoutView cartItem={cartItem} index={index} key={cartItem.productCode} />
					))
				   )} 
				</tbody>                
                </table>
		);
	}
}



const connectedCheckoutList = connect()(CheckoutList);
export { connectedCheckoutList as CheckoutList };