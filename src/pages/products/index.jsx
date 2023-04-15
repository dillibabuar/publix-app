import React from 'react';
import { connect } from 'react-redux';
import { Footer } from './../../_components/Footer/footer';
import { productsActions } from './../../_actions/products.actions';
import { cartActions } from './../../_actions/cart.action';
import { ProductList } from './../../_components/products/productList';
import CircularProgress  from './../../_components/Common/circularIndeterminate';

class Products extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            emptyMsg: '',
           
        };
	}

	componentDidMount() {
		this.setState({ emptyMsg : 'Search Criteria product are not avilable' });
	}


	render() {
		  
	  const size = 4; 
	  const subcategoryName = this.props.products && this.props.products.subcategoryName;
	  const categoryName = this.props.products && this.props.products.categoryName;
	  const res = this.props.products && this.props.products.data && this.props.products.data.product.reduce((acc, curr, i) => {
		if ( !(i % size)  ) {    // if index is 0 or can be divided by the `size`...
		  acc.push(this.props.products && this.props.products.data && this.props.products.data.product.slice(i, i + size));   // ..push a chunk of the original array to the accumulator
		}
		return acc;
	  }, []);

    	return (

			<div>			               
				<div className="w3l_banner_nav_right">
				
					<div style={{ marginTop: '-30px' }} className="w3ls_w3l_banner_nav_right_grid w3ls_w3l_banner_nav_right_grid_sub">
					

						{res && res.length > 0 && (
							<h3>{categoryName}<span><h4>{subcategoryName}</h4></span></h3>
						)}

                        {(this.props.loading)  && (
							<div style={{zIndex:'50'}} ><CircularProgress /></div>
						)}	

                        {(!res || res.length < 1) && !this.props.loading  && (
							
							<h3>{this.state.emptyMsg}<span><h4></h4></span></h3>
						)}							

						{res && res.length > 0 && (
                           res && res.map((productL, index) => (
							<ProductList cartloading={this.props.cartloading} cart={this.props.cart} addToCart={this.props.addToCart} productList={productL} />
							))
						)}

					
					</div>
				</div>





					<div className="banner_bottom">
						<div className="wthree_banner_bottom_left_grid_sub">&nbsp;
						</div>

						<div className="clearfix"> </div>
					</div>



					<div style={{ height: '200px' }}>
						
					</div>



				</div>
        );
    }
}

function mapState(state) {
    const { users, authentication} = state;
	const { user} = authentication;
	const { products, loading } = state.productList;
	const { cart, cartloading } = state.cartList;	
    return { user, users, products, loading, cartloading, cart};
}

const actionCreators = {
	getAllProducts: productsActions.getAllProducts,
	getBestDeals: productsActions.getBestDeals,
	addToCart : cartActions.addToCart
}

const connectedProductsPage = connect(mapState, actionCreators)(Products);
export { connectedProductsPage as Products};
