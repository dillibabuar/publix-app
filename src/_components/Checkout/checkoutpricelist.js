import { element } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { CheckoutPrice } from './checkoutprice';
import { SignInDialog } from '../SimpleDialog/signindialog';

const emails = ['username@gmail.com', 'user02@gmail.com'];
class CheckoutPriceList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		   signInFlag : false,
		   guessFlag: false,
		   open : false, setOpen : false,
		  // selectedValue: emails[1], 
		};
    }
    
	
	 handleClickOpen = () => {
		this.setState({ open: true, signInFlag: true });
	  };
  

	  handleClose = () => {		
		this.setState({ open: false , signInFlag: false});    
	  };

	render() {

        const { cartItemList } = this.props.cartList || [];
        let totalDis=0
		let totalVal=0
		if(cartItemList && cartItemList.length > 0){
			for (var i = 0; i < cartItemList.length; i++) {
				totalDis += Number(cartItemList[i].discount * cartItemList[i].qty)
				totalVal += Number(cartItemList[i].price * cartItemList[i].qty)
			}
		}        

       	return (

           <div>
           <div className="col-md-4 checkout-left-basket">
					<h4>Continue to Shopping</h4>
					<ul>

                    {cartItemList && cartItemList.length > 0 && (
					this.props.cartList && cartItemList.map((cartItem, index) => (
						<CheckoutPrice cartItem={cartItem} index={index} key={cartItem.productCode} />
					))
				   )} 
                   
						{/* <li>Product1 <i>-</i> <span>$15.00 </span></li>
						<li>Product2 <i>-</i> <span>$25.00 </span></li>
						<li>Product3 <i>-</i> <span>$29.00 </span></li>
						<li>Total Service Charges <i>-</i> <span>$15.00</span></li>
						<li>Total <i>-</i> <span>$84.00</span></li> */}
					</ul>
                    <ul className='checkout-left-basket-total'>
                    <li>Total Discount <span>{Number(totalDis).toFixed(2)}</span></li>
                    <li>Total Amount <span>{Number(totalVal).toFixed(2)}</span></li>
                    </ul>
					{/* <h4><div onClick={this.handleClickOpen.bind(this)}>Sign in</div></h4>
					<div style={{margin:'0 auto', 'text-align':'center'}}>OR</div> */}
					
					</div>

					<div className="col-md-4 checkout-left-basket">

			</div>
			{ this.state.signInFlag && (
			  <SignInDialog  open={this.state.open} onClose={this.handleClose.bind(this)} /> 
			)}
            </div>

		);
	}
}



const connectedCheckoutPriceList = connect()(CheckoutPriceList);
export { connectedCheckoutPriceList as CheckoutPriceList };