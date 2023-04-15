import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { CartList } from './../../_components/Cart/cartlist';
import { history } from '../../_helpers';
import './minicart.js';
import './minicart.css';
import './support.js';



const emails = ['600 037', '600 050', '600 101'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function CartViewDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, cartList } = props;
  const [zipcode, setZipcode] = React.useState('');


  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleGo = () => {
    onClose(selectedValue);
    history.push('/checkout')
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(true);
  };

  const handleChange = (event) => {
    setZipcode((event.target.value) || '');
    onClose(true);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div class="minicart-showing">
        <div id="PPMiniCart">
          <form target="">
            <div >
              <button type="button" onClick={handleClose} class="minicart-closer">×</button>
            </div>
            <CartList cartList={cartList} />
            <div class="minicart-footer">
              {cartList && cartList.cartItemList && cartList.cartItemList.length > 0 && (
                <button style={{ backgroundColor: '#1C1E36' }} onClick={handleGo} class="minicart-submit" type="button" data-minicart-alt="undefined">Check Out with  </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}

export { CartViewDialog };