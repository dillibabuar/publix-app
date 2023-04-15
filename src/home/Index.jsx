import React from 'react';
import { connect } from 'react-redux';
import { Header } from './../_components/Header/header';
import { LeftMenu } from './../_components/LeftMenu/leftmenu';
import { RightBloc } from './../_components/Right/rightblock';
import { Footer } from './../_components/Footer/footer';

class Home extends React.Component {
    

    render() {
      //  const { user, users } = this.props;
        return (
            <div >
<Header />

<LeftMenu />
<RightBloc />
<div  class="clearfix"> </div>
                <div class="clearfix"> </div>
                <div class="clearfix"> </div>
                <div class="clearfix"> </div>
               
                <div class="clearfix"> </div>
                <div class="clearfix"> </div>
                <div class="clearfix"> </div>

                <div class="clearfix"> </div>
                <div class="clearfix"> </div>

                <div class="newsletter">
                
                    <div class="container">
                        
                        <div class="clearfix"> </div>
                    </div>
                </div>

<Footer />


            </div>
            );
        }
    }

    function mapState(state) {
        /* const { users, authentication } = state;
        const { user } = authentication;
        return { user, users }; */
    }
    
    const actionCreators = {
        /* getUsers: userActions.getAll,
        deleteUser: userActions.delete */
    }
    
    const connectedHomePage = connect(mapState, actionCreators)(Home);
    export { connectedHomePage as Home };
   

   // export {  Home };