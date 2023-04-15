import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import GoogleMaps from './../../_components/Googlemap/googlemap';
import { AddressForm } from './addressform';
const useStyles = makeStyles((theme) => ({

  formControl: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));




export default function AddressRadio(props) {
  const classes = useStyles();
  

  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [editaddress, setEditaddress] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');

  const [fulladdress, setFulladdress] = React.useState('');
  const [address1, setAddress1] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [address2, setAddress2] = React.useState('');
  const [postal_code, setPostal_code] = React.useState('');
  const [cartId, setCartId] = React.useState('');
  const [addressJson, setAddressJson] = React.useState({});
  //setRoute('ssss')
  /* {"route":"337 Mt Gallant Rd","locality":"Rock Hill","administrative_area_level_1":"SC","postal_code":"29730"}
 */

  const getAddressDetails = (data) => {
    setFulladdress(data);
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
          console.log(JSON.stringify(test));
          updateAddressInput(test);
        }
      }
    });
  };

  const updateAddressInput = (data) => {
    
    const computedData = `${data.route ? data.route : ' '},${data.administrative_area_level_1 ? data.administrative_area_level_1 : ' '},${data.locality ? data.locality : ' '},${data.postal_code ? data.postal_code : ' '}`;
    /* fieldObj[this.props.param.field] = computedData;
    this.setState({ input: fieldObj });
    this.keyboard.setInput(computedData);
    this.setState({ showAddress2: true });
    requestObj.address1 = data.route || '';
    requestObj.city = data.locality || '';
    requestObj.state = data.administrative_area_level_1 || '';
    requestObj.zipcode = data.postal_code || '';  */
    console.log(JSON.stringify(data));
    setAddressJson(data)
    setAddress1(data.route || '')
    setCity(data.locality || '')
    setState(data.administrative_area_level_1 || '')
    setPostal_code(data.postal_code || '')

  }

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const address1Change = (event) => {
    setAddress1(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const mapValues = (values) => {
    setAddressJson(values)
    //getAddressDetails(values)
  }

  const handleSetAddress = (e) => {
		e.preventDefault();	
		
		const reqUser = {
			name: this.state.name,
			email: this.state.email,
			mobile: this.state.mobile,
			cartId: (this.props.cart && this.props.cart.id)
		}	
		this.props.guestregister(reqUser,'Address');        
   }


  const editAddress = (event) => {
    event.preventDefault();
    setEditaddress(!editaddress);    
  };

  const updateAddressFlag = (flag) => { 
    setEditaddress(flag);    
  };


  const updateAddressRadio = (data) => { 

    if(!address1)
      setAddress1(data.addr1);
    if(!address2)
      setAddress2(data.addr2?data.addr2:'.');  
    if(!city)
      setCity(data.city);  
    if(!state)
      setState(data.state);  
    if(!postal_code)
      setPostal_code(data.zip);  
    
   }

   const submitAddressInput = (e) => {
           e.preventDefault();
           const reqObj = {
            address: {
                      "address1": address1,
                      "address2":  '',
                      "city": city,
                      "state": state,
                      "zipcode": postal_code, 
                      "type": "shipping"
                  },
            id: props.cartId
                
          }
          props.updateAddressToCart(reqObj);
          setEditaddress(false);    
    
    }


  const jsonObj = addressJson;
 
  return (
    <form >
      <FormControl component="fieldset" error={error} className={classes.formControl}>
        
        

        {!editaddress && props.addressList && props.addressList.length > 0  && (

            <div>
                <form className="creditly-card-form agileinfo_form">
                    <section className="creditly-wrapper wthree, w3_agileits_wrapper">
                        <div className="information-wrapper">
                            <div className="first-row form-group">
                               
                                <div className="clear"> </div>
                               {/*  <div className="controls">
                                <p>&nbsp;</p>
                                <label className="control-label">Shipping address</label>                               
                                </div>  */}
                                
                                <div className="controls">
                                    <label className="control-label">Delivery address</label>   
                                </div>
                                <div className="controls">
                                    <label className="control-label">&nbsp;</label>                                                                 
                                </div>
                                <div className="controls">
                                    <label className="control-label">Street: </label>
                                    <span>{props.addressList && props.addressList.length > 0 && props.addressList[0].address1}</span>                                   
                                </div>
                                <div className="controls">
                                    <label className="control-label">City: </label>
                                    <span>{props.addressList && props.addressList.length > 0 && props.addressList[0].city}</span>                                   
                                </div>
                                <div className="controls">
                                    <label className="control-label">State: </label>
                                    <span>{props.addressList && props.addressList.length > 0 && props.addressList[0].state}</span>                                   
                                </div>
                                <div className="controls">
                                    <label className="control-label">Postal Code: </label>
                                    <span>{props.addressList && props.addressList.length > 0 && props.addressList[0].zipcode}</span>                                   
                                </div>                              
                                
                            </div>
                            <button onClick={editAddress} className="submit check_out">Edit address</button>
                            
                        </div>
                        <div className="checkout-right-basket">
				        	        <a >Make a Payment <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
			      	          </div>
                    </section>
                </form>
            </div>

        )} 

      {editaddress && props.addressList && props.addressList.length > 0  && (
        <div>
        <FormLabel component="legend">Please select your delivery address</FormLabel>
        <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
          {props.address && props.address.length > 0  &&  props.address.map((data, index) => (
                  <Button onClick={updateAddressRadio(data)}  type="button" key={index} variant="outlined" color="primary" className={classes.button}>
                    <div >
                      <FormControlLabel key={index} value={data.id} control={<Radio />} label={data.addr1 +' '+(data.addr2?data.addr2:'') +' '+data.city +' '+data.state +' '+data.zip } />
                    </div>
                 </Button>
          ))}

          <Button type="button" variant="outlined" color="primary" className={classes.button}>
            <div >
              <FormControlLabel value="0" control={<Radio />} label="Add a New Address" />
            </div>
          </Button>
        </RadioGroup>
        </div>
      )}  
       
      {!editaddress && props.addressList && props.addressList.length < 1  && (
        <div>
        <FormLabel component="legend">Please select your delivery address</FormLabel>
        <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
          {props.address && props.address.length > 0  &&  props.address.map((data, index) => (
                  <Button onClick={updateAddressRadio(data)}   type="button" key={index} variant="outlined" color="primary" className={classes.button}>
                  <div >
                    <FormControlLabel key={index} value={data.id} control={<Radio />} label={data.addr1 +' '+(data.addr2?data.addr2:'') +' '+data.city +' '+data.state +' '+data.zip } />
                  </div>
                </Button>
          ))}

          <Button type="button" variant="outlined" color="primary" className={classes.button}>
            <div >
              <FormControlLabel value="0" control={<Radio />} label="Add a New Address" />
            </div>
          </Button>
        </RadioGroup></div>
      )}  
        
         
        { value && value !== '0' && editaddress && (
          <div className="controls">          
          <p>&nbsp;</p>
          <button onClick={submitAddressInput.bind(this)} className="submit check_out">Delivery this address</button>
        </div>
          
        )}

        { addressJson && (props.addressList && props.addressList.length < 1 || editaddress )  && value === '0' && (
          <AddressForm onUpdateAddres={updateAddressFlag} addressJson={addressJson && addressJson.length > 0 && addressJson} />
        )}

      


      </FormControl>
    </form>
  );
}
