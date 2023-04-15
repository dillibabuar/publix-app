import React from 'react';
import { connect } from 'react-redux';
import { productsActions } from './../../_actions/products.actions';
import { cartActions } from './../../_actions/cart.action';
import { ProductList } from './../../_components/products/productList';


import './../../assets/css/flexslider.css';
import './../../assets/js/jquery.flexslider.js';
import './../../assets/js/jquery-1.11.1.min.js';
import './scroll.js';


class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getBestDeals();    
	}

    render() {
		//  const { user, users } = this.props;
		
		const size = 4; 
		const subcategoryName = this.props.dealproducts && this.props.dealproducts.subcategoryName;
		const categoryName = this.props.dealproducts && this.props.dealproducts.categoryName;
		const res = this.props.dealproducts && this.props.dealproducts.data && this.props.dealproducts.data.product.reduce((acc, curr, i) => {
		  if ( !(i % size)  ) {    // if index is 0 or can be divided by the `size`...
			acc.push(this.props.dealproducts && this.props.dealproducts.data && this.props.dealproducts.data.product.slice(i, i + size));   // ..push a chunk of the original array to the accumulator
		  }
		  return acc;
		}, []);






        return (
            <div >
             
                <div class="w3l_banner_nav_right">
				<section class="slider">
				<div class="flexslider">
					<ul class="slides">
						<li>
							<div class="w3l_banner_nav_right_banner">
								<h3>Make your <span>food</span> with Spicy.</h3>
								<div class="more">
									<a href="#" class="button--saqui button--round-l button--text-thick" data-text="Shop now">Shop now</a>
								</div>
							</div>
						</li>
						<li>
							<div class="w3l_banner_nav_right_banner1">
								<h3>Make your <span>food</span> with Spicy.</h3>
								<div class="more">
									<a href="#" class="button--saqui button--round-l button--text-thick" data-text="Shop now">Shop now</a>
								</div>
							</div>
						</li>
						<li>
							<div class="w3l_banner_nav_right_banner2">
								<h3>upto <i>50%</i> off.</h3>
								<div class="more">
									<a href="#" class="button--saqui button--round-l button--text-thick" data-text="Shop now">Shop now</a>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</section>
				
					<div style={{ marginTop: '-30px' }} class="w3ls_w3l_banner_nav_right_grid w3ls_w3l_banner_nav_right_grid_sub">
						{res && res.length > 0 && (
							<h3>{categoryName}<span><h4>{subcategoryName}</h4></span></h3>
						)}	

                        {!res  && (
							<h3>Selected Criteria products are not avilable<span><h4></h4></span></h3>
						)}							

						{res && res.length > 0 && (
                           res && res.map((productL, index) => (
							<ProductList cart={this.props.cart} addToCart={this.props.addToCart} productList={productL} />
							))
						)}
					
					</div>			

				    </div>

					<div class="clearfix"> </div>
					<div class="clearfix"> </div>

               <div style={{height:'100px'}} class="clearfix"> </div>
				
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
	const { user } = authentication;
	const { dealproducts,loading } = state.productList;
	const { cart } = state.cartList;	
    return { user, users, dealproducts, loading, cart };
}

const actionCreators = {
	getBestDeals: productsActions.getBestDeals,
	addToCart : cartActions.addToCart
}

const connectedHomePage = connect(mapState, actionCreators)(Home);
export { connectedHomePage as Home };


   // export {  Home };