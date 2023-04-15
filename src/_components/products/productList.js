import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { categoryActions, productsActions } from '../../_actions';
import { history } from '../../_helpers';
import { Product } from './product';
import CircularProgress  from './../../_components/Common/circularIndeterminate';
class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			subCode: '',
		};
		
    }

    componentDidMount() {
      
    }

  

    render() {
      
     
       return (
          

            <div className="w3ls_w3l_banner_nav_right_grid1">
			<h6>&nbsp;</h6>
            

                       {this.props.productList && this.props.productList.length > 0 && (
                           this.props.productList && this.props.productList.map((product, index) => (
							<Product cartloading={this.props.cartloading} key={index}  addToCart={this.props.addToCart} product={product} />
							))
						)}          
            </div>
        );
    }
}





const connectedProductList = connect()(ProductList);
export { connectedProductList as ProductList }; 