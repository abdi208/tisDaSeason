import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function HomeTemplate() {
  const classes = useStyles();

  return (
    <Paper className={classes.root} style={{background: 'none', height: '100vh' }}>
      <Typography style={{fontSize: '50px', color: 'green',fontFamily: 'Mountains of Christmas', display: 'inline-block', marginTop: '39vh' }} variant="h5" component="h3">
      'tis
      </Typography>
      <Typography style={{fontSize: '75px', fontFamily: 'Mountains of Christmas', color: 'blue', display: 'inline-block', marginTop: '39vh' }} variant="h5" component="h3">
      Da
      </Typography>
      <Typography style={{fontSize: '75px', fontFamily: 'Mountains of Christmas', color: 'red',  display: 'inline-block', marginTop: '39vh' }} variant="h5" component="h3">
      Season 
      </Typography>
      <Typography component="p">
        
      </Typography>
      <Button style={{fontSize: '50px', fontFamily: 'Mountains of Christmas', color: 'red', display: 'inline-block', marginTop: '5vh' }}><Link style={{color: 'blue', textDecoration: 'none'}} to='/login'>Login</Link></Button>
            <Button style={{fontSize: '50px', color: 'blue', fontFamily: 'Mountains of Christmas', display: 'inline-block', marginTop: '5vh' }} ><Link style={{color: 'green', textDecoration: 'none'}}to='/signup'>Signup</Link></Button>
    </Paper>
  );
}