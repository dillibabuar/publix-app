import React from 'react';
import { connect } from 'react-redux';
import './../../assets/js/bootstrap.min.js';
import './../../assets/js/jquery-1.11.1.min.js';
import './headersc';
import { CartViewDialog } from './../../_components/SimpleDialog/cartviewdialog';
import { ScrollDialog } from './../../_components/';
import { productsActions, userActions } from './../../_actions';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

//import { } from './../../assets/images/'


const emails = ['username@gmail.com', 'user02@gmail.com'];
 const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
}); 


class Header extends React.Component {    

    constructor(props) {
		super(props);
		this.state = {
            zipCodeFlag: false,
            open : false, setOpen : false,
            selectedValue: emails[1], 
            age: '' ,
            keyword: ''        
			
        };
        this.handleClose = this.handleClose.bind(this);		
	}

    handleClickOpen = () => {
      this.setState({ open: true, zipCodeFlag: true });
    };

    handleKeywordSearch = () => {
      if(this.state.keyword && this.state.keyword.length > 0)
         this.props.getKeywordSearch(this.state.keyword)
    };
    
    handleClose = (value) => {
      this.setState({ open: false, selectedValue: value });    
    };

    handleLogout = () => {
      this.props.logout();    
    };    

    render() {

      const { cartItemList } = this.props.cart || [];
    return (
            <div>
               
                   {/*  <div style={{ position: 'fixed', width: '100%', padding: '0px 0px', zIndex: '500' }} className="agileits_header"> */}
                    <div className="agileits_header">
                        <div className="w3l_offers">                            
                        {/* <a href="/"><img src="https://publix-static.herokuapp.com/png/publogo_trans.png" alt=" " style={{width:'75px'}} /> </a> */}
                      
                        <a href="/"><img src="/png/publogo_trans.png" alt=" " style={{width:'75px'}} /> </a>
                      </div>
                      
                        <div className="w3l_search">                            
                                <input type="text" onChange={(e) => this.setState({keyword: e.target.value})}  placeholder="Search a product..."  />
                                <input onClick={this.handleKeywordSearch.bind(this)} type="button" value=" " />                            
                        </div>
                        <div className="product_list_header">
                            <form className="last">
                                <fieldset>
                                    <input type="hidden" name="cmd" value="_cart" />
                                    <input type="hidden" name="display" value="1" />
                                    <input type="button" onClick={this.handleClickOpen.bind(this)} name="button" value="View your cart" className="button" />
                                    <span style={{marginLeft:'-10px', marginTop:'-15px',  fontSize:'11px'}} className="badge badge-primary">{cartItemList && cartItemList.length}</span>                                   
                                </fieldset>
                            </form>
                        </div>
                        <div className="w3l_header_right">

                       {/*  <nav classNameName="navbar nav_bottom">
                        <div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
                            <ul className="nav navbar-nav nav_1">
                                      <li><a href="#"><Link to="/login"><a href="#">Login</a></Link></a></li>
                             </ul>
                        </div>

                        </nav> */}
                        {/* {this.props.loggedIn && (
                          <div>
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQLoB_LIpS6J9R82h6n2H-BiAt5WpzngwlJIQ&usqp=CAU" alt=" " style={{width:'30px'}} />
                          Sign Out  </div>  
                        )}

                        {!this.props.loggedIn && (
                            <ul>
                            <li className="dropdown profile_details_drop">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                
                                    <i className="fa fa-user" aria-hidden="true"></i><span className="caret"></span></a>
                                
                                    <div className="dropdown-menu mega-dropdown-menu">
                                        <div className="w3ls_vegetables">
                                            <ul>
                                            <li>
                                            
                                            <Link to="/login"><a href="#">Login</a></Link>       
                                            </li>
                                          
                                            </ul>
                                        </div>
                                    </div> 
                            </li>
                        </ul>
                    
                        )} */}
                        </div>
                         <div className="w3l_header_right1">
                         {this.props.loggedIn && (
                            <h2><a  onClick={this.handleLogout.bind(this)} href="#">Sign out</a></h2>
                         )}
                          {!this.props.loggedIn && (
                            <h2><a  href="/login">Sign In</a></h2>
                         )}
                            
                        </div> 
                         <div className="clearfix"></div> 
                    </div>
                    <div className="logo_products">
                    <div className="clearfix"> </div> 
		<div className="container">
			<div className="w3ls_logo_products_leftt">
				<h1><a href="index.html"><span>{/* <img src="https://publix-static.herokuapp.com/png/publogo_trans.png" alt=" " style={{width:'75px'}} /> */}</span></a></h1>
			</div>
			<div className="w3ls_logo_products_left1">
				<ul className="special_items">
					<li><a href="events.html">Events</a><i>/</i></li>
					<li><a href="about.html">About Us</a><i>/</i></li>
					<li><a href="products.html">Best Deals</a><i>/</i></li>
					<li><a href="services.html">Services</a></li>
				</ul>
			</div>
			<div className="w3ls_logo_products_left1">
				<ul className="phone_email">
					<li><i className="fa fa-phone" aria-hidden="true"></i>(+0123) 234 567</li>
					<li><i className="fa fa-envelope-o" aria-hidden="true"></i><a href="mailto:store@grocery.com">store@grocery.com</a></li>
				</ul>
			</div>
			<div className="clearfix"> &nbsp;</div>
           
		</div>
	</div>


    { this.state.zipCodeFlag && (
      <CartViewDialog cartList={this.props.cart} selectedValue={this.state.selectedValue} open={this.state.open} onClose={this.handleClose} /> 
    )}

   
                    
 </div>

        );
    }
}


function mapState(state) {
    const { loggedIn } = state.authentication;
    const { items } = state.categories;
    const { cart } = state.cartList;
    return { loggedIn, items, cart };
}

const actionCreators = {
  getKeywordSearch: productsActions.getKeywordSearch,
  logout: userActions.logout
};

const connectedHeader = connect(mapState, actionCreators)(Header);
export { connectedHeader as Header };