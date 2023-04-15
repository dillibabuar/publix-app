import React from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { cartActions } from '../../_actions';
import CircularProgress from './../../_components/Common/circularIndeterminate';
import GoogleMaps from './../../_components/Googlemap/googlemap';
import FormHelperText from '@material-ui/core/FormHelperText';
class AddressForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fulladdress: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            postalcode: '',
            helperTextaddress1: '',
            helperTextcity: '',
            helperTextstate: '',
            helperTextpostalcode: ''
        };
    }

    componentDidMount() {
        this.getAddressDetails(this.props.addressJson);      
    }

    getAddressDetails = (data) => {
        if (!data)
            this.setState({ fulladdress: data });
        const componentForm = {
            street_number: 'short_name',
            route: 'short_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            postal_code: 'short_name',
        };
        let street_address1 = '';
        const test = {};
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: data }, (results, status) => {
            if (status === 'OK') {
                if (results && results[0]) {
                    const { address_components } = results[0];

                    for (let i = 0, len = address_components.length; i < len; i++) {
                        const addressType = address_components[i].types[0];
                        if (componentForm[addressType]) {
                            const val = address_components[i][componentForm[addressType]];
                            if (addressType === 'street_number') {
                                /* Saving street_number to prepend it with the route and use as value for Address 1 */
                                street_address1 = address_components[i][componentForm[addressType]];
                            } else if (addressType === 'route') {
                                street_address1
                                    += ' ' + address_components[i][componentForm[addressType]];
                                test[addressType] = street_address1;
                            } else {
                                test[addressType] = val;
                            }
                        }
                    }
                    this.updateAddressInput(test);
                }
            }
        });
    };

    updateAddressInput = (data) => {
       
        const computedData = `${data.route ? data.route : ' '},${data.administrative_area_level_1 ? data.administrative_area_level_1 : ' '},${data.locality ? data.locality : ' '},${data.postal_code ? data.postal_code : ' '}`;
        this.setState({address1: data.route ? data.route : ' ' });
        this.setState({city: data.locality ? data.locality : ' ' });
        this.setState({state: data.administrative_area_level_1 ? data.administrative_area_level_1 : ' ' });
        this.setState({postalcode: data.postal_code ? data.postal_code : ' ' }); 
        
    }

    mapValues = (values) => {
        this.getAddressDetails(values)
    }

    submitAddressInput = (e) => {
        e.preventDefault();
        this.setState({
            helperTextaddress1: '',
            helperTextcity: '',
            helperTextstate: '',
            helperTextpostalcode: '' 
        })
       
        if(!this.state.address1){
            this.setState({helperTextaddress1 : 'Please fill the street address'})
        }
        if(!this.state.city){
            this.setState({helperTextcity : 'Please fill the city'})
        }
        if(!this.state.state){
            this.setState({helperTextstate : 'Please fill the State'})
        }
        if(!this.state.postalcode){
            this.setState({helperTextpostalcode : 'Please fill the Postalcode'})
        }
        
        if(this.state.address1 && this.state.city && this.state.state && this.state.postalcode ){

            const reqObj = {
                address: {
                          "address1": this.state.address1,
                          "address2": this.state.address2 || '',
                          "city": this.state.city,
                          "state": this.state.state,
                          "zipcode": this.state.postalcode, 
                          "type": "shipping"
                      },
                id: this.props.cart.id
                    
              }
              this.props.updateAddressToCart(reqObj);
              this.props.onUpdateAddres(false);
        }
       
    }

    

    render() {


        return (
            <div>
                <form post='#' className="creditly-card-form agileinfo_form">
                    <section className="creditly-wrapper wthree, w3_agileits_wrapper">
                        <div className="information-wrapper">
                            <div className="first-row form-group">
                                <div className="clear"> </div>
                                <div className="clear"> </div>
                                <div className="controls">
                                <p>&nbsp;</p>
                                <label className="control-label">Please type address</label>
                                <p>&nbsp;</p>
                                    <GoogleMaps onDone={this.mapValues} />
                                <p>&nbsp;</p>
                                </div> 
                                
                                <div className="controls">
                                    <label className="control-label">Street: </label>
                                    <FormHelperText style={{color:'red'}} >{this.state.helperTextaddress1}</FormHelperText> 
                                    <input value={this.state.address1} onChange={e => this.setState({ address1: e.target.value })} className="billing-address-name form-control" type="text" name="street" placeholder="Street" />                                     
                                </div>

                                <div className="controls">
                                    <label className="control-label">Apartment/Suite/Unit/Door(optional): </label>
                                    <input value={this.state.address2} onChange={e => this.setState({ address2: e.target.value })} className="billing-address-name form-control" type="text" name="unit" placeholder="Apartment/Suite/Unit" />
                                </div>
                                <div className="controls">
                                    <label className="control-label">City </label>
                                    <FormHelperText style={{color:'red'}} >{this.state.helperTextcity}</FormHelperText> 
                                    <input value={this.state.city} onChange={e => this.setState({ city: e.target.value })} className="billing-address-name form-control" type="text" name="city" placeholder="City" />
                                </div>
                                <div className="controls">
                                    <label className="control-label">State </label>
                                    <FormHelperText style={{color:'red'}} >{this.state.helperTextstate}</FormHelperText> 
                                    <input value={this.state.state} onChange={e => this.setState({ state: e.target.value })} className="billing-address-name form-control" type="text" name="state" placeholder="State" />
                                </div>
                                <div className="controls">
                                    <label className="control-label">Postal-Code </label>
                                    <FormHelperText style={{color:'red'}} >{this.state.helperTextpostalcode}</FormHelperText> 
                                    <input value={this.state.postalcode} onChange={e => this.setState({ postalcode: e.target.value })} className="billing-address-name form-control" type="text" name="postal" placeholder="Postal Code" />
                                </div>
                                
                            </div>
                            <button onClick={this.submitAddressInput.bind(this)} className="submit check_out">Delivery this address</button>
                        </div>
                    </section>
                </form>
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
    updateToCart: cartActions.updateToCart,
    removeToCart: cartActions.removeToCart,
    updateAddressToCart: cartActions.updateAddressToCart
};

const connectedAddressForm = connect(mapState, actionCreators)(AddressForm);
export { connectedAddressForm as AddressForm };
