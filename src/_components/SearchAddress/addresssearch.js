import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
  } from 'react-places-autocomplete';

class AddressSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = { address: '',
		name: '',
		street_address: '',
		city: '',
		state: '',
		zip_code: '',
		googleMapLink: ''
	   };
	  }

	  componentDidMount() {
		let map = new window.google.maps.Map(document.getElementById('map'), {
		  center: {lat: -33.8688, lng: 151.2195},
		  zoom: 13,
		  mapTypeId: 'roadmap',
		});
	  }
	 
	  handleChange = address => {
		this.setState({ address });
	  };

	  postvalue = results => {
		let postalCode = results[0].address_components.find(function (component) {
			return component.types[0] == "postal_code";
		});
		return postalCode.long_name;
	  };

	 
	 
	  handleSelect = address => {	
		
		geocodeByAddress(address)
		  .then(results => { 
			console.log('Success', JSON.stringify(results));
			let postalCode = results[0].address_components.find(function (component) {
				return component.types[0] == "postal_code";
			});
			console.log(postalCode.long_name);
			address = address+', '+postalCode.long_name;
			this.props.onDone(address);
			this.setState({ address });
			console.log(postalCode.long_name);
			  getLatLng(results[0])
			})
		  .then(latLng => console.log('Success', latLng))
		  .catch(error => console.error('Error', error));
	  };

    render() {
        return (
            <div>
       <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
			  <div >
			  <input style={{width:'100%', height:'40px'}}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
			
			  </div>
            
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
					
                  </div>
                );
              })}
            </div>
			
          </div>
        )}
      </PlacesAutocomplete>
	  <div id='map' />
            </div>
        );
    }
}



const connectedAddressSearch = connect()(AddressSearch);
export { connectedAddressSearch as AddressSearch };