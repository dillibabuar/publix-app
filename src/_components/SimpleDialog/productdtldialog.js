import React from 'react';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { categoryActions, productsActions } from '../../_actions';
import './../../assets/js/okzoom.js';
import './../../assets/js/easing.js';
import './../../assets/js/minicart.js';
import './zoom.js';
const emails = ['username@gmail.com', 'user02@gmail.com'];


class ProductDtlDialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			signinFlag: true,
			userName: '',
			passCode: '',
			name: '',
			email: '',
			mobile: ''			
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}

	handleTabChange = () => {
		this.setState({ signinFlag: !this.state.signinFlag });
	}

	handleSubmit(e) {
		 e.preventDefault();
		this.props.SignInDialog(this.state.userName, this.state.passCode);        
	}

	handleRegister(e) {
		e.preventDefault();
		
		const reqUser = {
			username: this.state.userName,
			password: this.state.passCode,
			name: this.state.name,
			email: this.state.email,
			mobile: this.state.mobile,
			isActive: true
		}
	
	   this.props.register(reqUser);        
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

  clickMe(event, productObj){
    
	event.preventDefault();
	this.setState({ prodCode: productObj.productCode });
	productObj.qty = 1;
	if(this.props.cart && this.props.cart.id){
		const req = {
			product : productObj,
			id: this.props.cart.id
		}
		this.props.addToCart(req);
		this.props.onClose(false);
	}else{
		const req = {
			product : productObj,
		}
		 this.props.addToCart(req);
		 this.props.onClose(false);
	}	
 
} 
	
	render() {
		//  const { user, users } = this.props;
		return (
      <Dialog style={{marginTop:'100px'}} onClose={this.handleClose} open={open}>
      <DialogTitle id="simple-dialog-title"><div style={{width:'300px',textAlign:'left'}}>{'Product Detail'}</div>
	  <div onClick={this.handleClose} style={{textAlign:'right', marginTop:'-35px'}}>X</div></DialogTitle>
      <DialogContent dividers>
      		
			<div >
				<div class="col-md-4 agileinfo_single_left">
					<img id="example" src={this.props.product.image} alt=" " class="img-responsive" />
					{this.props.product.productName+' '+'('+this.props.product.weight +' '+this.props.product.weightType+')'}
					{/* <div class="ok-listener" style={{position: 'absolute', 'z-index': '10000', 'display': 'block', width: '194px', height: '194px', top: '750.125px', left: '90.9px'}}></div>	 */}
					{/* <div id="ok-loupe" style={{position: 'absolute', background: url({this.props.product.image}) -42px 15px / auto no-repeat rgb(255, 255, 255); pointer-events: none; opacity: 1; z-index: 7879; width: 150px; height: 150px; border: 1px solid black; border-radius: 50%; box-shadow: rgb(0, 0, 0) 0px 0px 5px; left: 87px; top: 712px;"></div> */}
					</div>
				<div class="col-md-8 agileinfo_single_right">
					<div class="rating1">
						<span class="starRating">
							<input id="rating5" type="radio" name="rating" value="5"/>
							<label for="rating5">5</label>
							<input id="rating4" type="radio" name="rating" value="4"/>
							<label for="rating4">4</label>
							<input id="rating3" type="radio" name="rating" value="3" checked/>
							<label for="rating3">3</label>
							<input id="rating2" type="radio" name="rating" value="2"/>
							<label for="rating2">2</label>
							<input id="rating1" type="radio" name="rating" value="1"/>
							<label for="rating1">1</label>
						</span>
					</div>
					<div style={{width: '300px', marginTop:'-1px'}} class="w3agile_description">
						<h4>Description :</h4>
						<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
							officia deserunt mollit anim id est.</p>
					</div>
					<div class="snipcart-item block">
						<div class="snipcart-thumb agileinfo_single_right_snipcart">
							<h4>$21.00 <span>$25.00</span><span>{/* <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/vegetarian-3-565377.png" alt=" " class="img-responsive" /> */}</span></h4>
						</div>
						<div class="snipcart-details agileinfo_single_right_details">
							<form action="#" method="post">
								<fieldset>									
									<input onClick={(e) => {this.clickMe(e, this.props.product)}} style={{width: '130px'}} type="button" name="submit" value="Add to cart" class="button" />
								</fieldset>
							</form>
						</div>
					</div>
				</div>
				<div class="clearfix"> </div>
			</div>
		
      </DialogContent>     
      </Dialog>
		);
	}
}

function mapState(state) {
    const { loggedIn } = state.authentication;
	const { cart, cartloading } = state.cartList;	
    return { loggedIn, cart, cartloading };    
}

const actionCreators = {
    allCategories: categoryActions.getAllCategories,
    getAllProducts: productsActions.getAllProducts,
    getBestDeals: productsActions.getBestDeals
	//logout: userActions.logout
};

const connectedProductDtlDialogPage = connect(mapState, actionCreators)(ProductDtlDialog);
export { connectedProductDtlDialogPage as ProductDtlDialog };


   // export {  SignInDialog };