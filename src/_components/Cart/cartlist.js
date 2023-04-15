import React from 'react';
import { connect } from 'react-redux';
import { CartView } from './cartview';

class CartList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		const { cartItemList } = this.props.cartList || [];
		return (


			<ul>
			<li class="minicart-item">
			<div class="minicart-details-name"> <a class="minicart-name"
				href="#"><b>{'Product Name'}</b></a>				
			</div>
			<div class="minicart-details-quantity"><b>Qty</b></div>
			<div class="minicart-details-remove">&nbsp; </div>
			<div class="minicart-details-price"> <span class="minicart-price"><b>{'Price(Rs).'}</b></span> </div>
			</li>
				{cartItemList && cartItemList.length > 0 && (
					this.props.cartList && cartItemList.map((cartItem, index) => (
						<CartView cartItem={cartItem} key={index} key={cartItem.productCode} />
					))
				)}
				{/* {cartItemList && cartItemList.length > 0 && (
					<div>
					<li class="minicart-item">
						<div class="minicart-details-name"> <a 
							href="#">{'Sub Total'}</a>
						</div>
						<div class="minicart-details-quantity">
							Rs.1200</div>
						<div class="minicart-details-remove">
							&nbsp; </div>
						<div class="minicart-details-price"> <span class="minicart-price">{''}</span> </div>
					</li>

					<li class="minicart-item">
					<div class="minicart-details-name"> <a 
						href="#">{'Discount'}</a>
					</div>
					<div class="minicart-details-quantity">
						Rs.12</div>
					<div class="minicart-details-remove">
						&nbsp; </div>
					<div class="minicart-details-price"> <span class="minicart-price">{''}</span> </div>
				   </li>

				   <li class="minicart-item">
					<div class="minicart-details-name"> <a 
						href="#">{'Total'}</a>
					</div>
					<div class="minicart-details-quantity">
						&nbsp;</div>
					<div class="minicart-details-remove">
						&nbsp; </div>
					<div class="minicart-details-price"> <span class="minicart-price">{'Rs.1200'}</span> </div>
				   </li>

				   </div>
				)} */}


			</ul>


		);
	}
}



const connectedCartList = connect()(CartList);
export { connectedCartList as CartList };