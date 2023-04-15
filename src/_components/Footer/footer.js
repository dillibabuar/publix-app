import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Footer extends React.Component {


    render() {
        return (
            <div  >
                <div className="footer">
                    <div >       
                        
                        <div className="wthree_footer_copy">
                            <p>© 2021 Grocery Store. All rights reserved | Design by <a href="http://w3layouts.com/">W3layouts</a></p>
                        </div>
                    </div>
                </div>
                <a href="#" id="toTop" style={{display: 'block'}}><span id="toTopHover" style={{opacity: '0'}}></span>To Top</a>
            </div>
        );
    }
}



const connectedFooter = connect()(Footer);
export { connectedFooter as Footer };