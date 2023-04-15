import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select';
//import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
//import   Map  from './../SearchAddress/mapContainer';
const options = [
    { value: '600037', label: 'Mogappair-East,West' },
    { value: '600050', label: 'Padi' },
    { value: '600101', label: 'Anna nagar west extn' },
];

class RightBloc extends React.Component {

    constructor() {
        super()
        this.state = {
            selectedOption: null,
            address: '',
            locations: []
        }
      //  this.handleMapClick = this.handleMapClick.bind(this);
    }
    getAddress(address) {
        this.setState({ address: address })
    }

    render() {
        const { selectedOption } = this.state;
        return (
            <div>
                <div style={{zIndex:'45'}} class="w3l_banner_nav_right">
                    <h3><label class="control-label">&nbsp;</label></h3>
                    <h3><label class="control-label">&nbsp;</label></h3>

                    <div style={{ width: '90%', margin: 'auto', padding: '10px', border: '3px solid #84C639' }}>
                        <h3><label class="control-label">&nbsp;</label></h3>
                        <h3><label class="control-label">&nbsp;</label></h3>
                        <label class="control-label">Please select zipcode</label>

                        <label style={{ width: '100%', zIndex: '0px'  }} class="control-label"><Select class="form-control option-w3ls"
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={options}
                            class="form-control option-w3ls"
                        /> </label>
 
                        <h3><label class="control-label">

                            &nbsp;</label></h3>
                        <div style={{ margin: 'auto', padding: '10px', border: '3px solid #84C639' }} class="more">
                            <a href="#" class="button--saqui button--round-l button--text-thick" data-text="Continue">Go</a>
                        </div>

                        <h3><label class="control-label">&nbsp;</label></h3>
                    </div>
                    <h3><label class="control-label">&nbsp;</label></h3>
                    <h3><label class="control-label"> </label></h3>
                   
                   
                </div>
               
                
            </div>
        );
    }
}



const connectedRightBloc = connect()(RightBloc);
export { connectedRightBloc as RightBloc };