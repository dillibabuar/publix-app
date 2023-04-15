import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { categoryActions, productsActions } from '../../_actions';
import CircularProgress  from './../../_components/Common/circularIndeterminate';
import { ProductDtlDialog } from './../../_components/SimpleDialog/productdtldialog';
import { history } from '../../_helpers';


class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			subCode: '',
			prodCode: '',
			open : false, setOpen : false,
			productDtlFlag : false,
		};
		
	}
	
	  handleClickOpen = (e) => {
		  e.preventDefault();
		this.setState({ open: true, productDtlFlag: true });
	  };
  

	  handleClose = () => {		
		this.setState({ open: false , productDtlFlag: false});    
	  };


    componentDidMount() {
      
	}

	componentDidUpdate() {
		if(!this.props.cartloading && this.state.prodCode){
			this.setState({ prodCode: '' });
		}
	}
	
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
        }else{
            const req = {
                product : productObj,
            }
             this.props.addToCart(req);
        }	
     
    } 
    
    render() {
	  
       return (
           
                                <div className="col-md-3 w3ls_w3l_banner_left">
									 {this.props.cartloading  && (
										<div><CircularProgress /></div>
									 )}	
									 {!this.props.cartloading  && (
									<div className="hover14 column">
										<div className="agile_top_brand_left_grid w3l_agile_top_brand_left_grid">
											{ this.props.product && this.props.product.discount > 0 && (
												<div className="agile_top_brand_left_grid_pos">
												<img  src="/png/offer.png" alt=" " className="img-responsive" />
												</div>
											)}                       
										
											<div className="agile_top_brand_left_grid1">
												<figure>
													<div className="snipcart-item block">
														<div className="snipcart-thumb">
															<a onClick={this.handleClickOpen.bind(this)} href="#"><img src={this.props.product.image} alt=" " className="img-responsive" /></a>
                                                              <p>{this.props.product.productName+' '+'('+this.props.product.weight +' '+this.props.product.weightType+')'}</p>
															  <h4>{(this.props.product.discount > 0) ? ('Rs.'+Number(this.props.product.price - this.props.product.discount).toFixed(2)):Number(this.props.product.price).toFixed(2)} <span>{(this.props.product.discount > 0) ? ('Rs.'+Number(this.props.product.price).toFixed(2)):''}</span></h4>
															  
											                  
														</div>
														<div className="snipcart-details">

															<fieldset>
																<input type="submit" onClick={(e) => {
                                                        this.clickMe(e, this.props.product)}} name="submit" value="Add to cart" className="button" />
															</fieldset>

														</div>
													</div>
												</figure>
											</div>                                       	

										</div>
									</div>
									 )}

									{ this.state.productDtlFlag && (
									<ProductDtlDialog addToCart={this.props.addToCart}  product={this.props.product}  open={this.state.open} onClose={this.handleClose.bind(this)} /> 
									)}
								</div>
           
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

const connectedProduct = connect(mapState, actionCreators)(Product);
export { connectedProduct as Product };

