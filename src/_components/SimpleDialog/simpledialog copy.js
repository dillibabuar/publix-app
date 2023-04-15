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
import './minicart.js';
import './support.js';



const emails = ['600 037', '600 050', '600 101'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const [zipcode, setZipcode] = React.useState('');

  const handleClose = () => {
    onClose(selectedValue);
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
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Please select delivery zipcode...</DialogTitle>
      <DialogContent dividers>


     















        <div style={{ alignItems: 'center', marginLeft: '100px' }}>






          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">ZipCode</InputLabel>
              <Select
                native
                value={zipcode}
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                {emails.map((email) => (

                  <option button key={email}  >{email}</option>

                ))}

              </Select>


             
            </FormControl>

            


          </form>
        </div>

       
      </DialogContent>

      <DialogActions>
        {/* <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}

export { SimpleDialog };