import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './circle.css';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  /* return (
    <div style={{position:'absolute', top:'50%', left:'50%', 'transform': 'translate(-50%, -50%)'}}>
        <div class="loading" color="secondary" />    
    </div>
  ); */

  return (
    <div class="loader"></div>
  );
}
