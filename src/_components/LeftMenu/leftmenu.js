import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { categoryActions, productsActions } from './../../_actions';
import { history } from '../../_helpers';




class LeftMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subCode: 'navbar-collapse collapse',
            showTab: false
		};
		
    }

    componentDidMount() {
        this.props.allCategories();   
    }

    clickMe(event, sub, categoryName){
        event.preventDefault();
        this.props.getAllProducts(sub.subCategoryCode, categoryName);
        this.setState({ showTab: true, subCode: 'navbar-collapse collapse'});
    }

    clickMenu(event){
        event.preventDefault();
        this.setState({ showTab: true, subCode: 'navbar-collapse collapse in', });
    }

    render() {
      //   /navbar-collapse collapse in  -- close    navbar-collapse collapse
       const categories = this.props.items && this.props.items.data && this.props.items.data.products || [];
       return (
            <div>
                <div className="banner">
                    <div className="w3l_banner_nav_left">
                       {/*  <MenuPopupState /> */}
                        <nav className="navbar nav_bottom">

                             <div className="navbar-header nav_2" >
                                <button style={{backgroundColor:'#F1DD3F'}} onClick={(e) => { this.clickMenu(e) }} type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
                                  <span className="sr-only">Toggle navigation</span>
                                  <div><b></b></div>
                                  <div><b>Menu</b></div>
                                  <div><b></b></div>
                                   {/* <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span> */}
                                </button>
                            </div> 
                           {/*  { this.state.showTab && (
                               <div className="collapse navbar-collapse"  id="bs-megadropdown-tabs">
                            )}
                            { this.state.showTab && (
                              <div className="collapse navbar-collapse"  id="bs-megadropdown-tabs">
                            )} */}
                            
                            <div className={this.state.subCode} aria-expanded="true"  id="bs-megadropdown-tabs">
                                {categories.map((cat, index) => (
                                   <ul className="nav navbar-nav nav_1">
                                       {cat.subcategorys && cat.subcategorys.length < 1 && (
                                           <li key={index}><a >{cat.categoryName}</a></li>
                                       )}

                                       {cat.subcategorys && cat.subcategorys.length > 0 && (
                                           <li key={index} disabled className="dropdown mega-dropdown active">
                                           <a href="#" className="dropdown-toggle" data-toggle="dropdown">{cat.categoryName}<span className="caret"></span></a>
                                           <div className="dropdown-menu mega-dropdown-menu w3ls_vegetables_menu">
                                               <div className="w3ls_vegetables">
                                                   <ul className="nav navbar">
                                                   {cat.subcategorys.map((sub, i) => (
                                                      <li><a href="#" key={sub.subCategoryCode} onClick={(e) => {
                                                        this.clickMe(e, sub, cat.categoryName)
                                                   }} >{sub.subCategoryName}</a></li>       
                                                   ))}
                                                   </ul>
                                            </div>
                                        </div>
                                    </li>
                                       )} 
                                    </ul>
                                ))} 
                            </div>
                        </nav>
                    </div> 
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { loggedIn } = state.authentication;
    const { items } = state.categories;
    const { products } = state.productList;
    
	return { loggedIn, items, products };
}

const actionCreators = {
    allCategories: categoryActions.getAllCategories,
    getAllProducts: productsActions.getAllProducts,
    getBestDeals: productsActions.getBestDeals
	//logout: userActions.logout
};

const connectedLeftMenu = connect(mapState, actionCreators)(LeftMenu);
export { connectedLeftMenu as LeftMenu };

/* const connectedLeftMenu = connect()(LeftMenu);
export { connectedLeftMenu as LeftMenu }; */