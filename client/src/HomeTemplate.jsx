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
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        Create Gifts for all your lovedones.
      </Typography>
      <Typography component="p">
        
      </Typography>
      <Button><Link to='/login'>Login</Link></Button>
            <Button><Link to='/signup'>Signup</Link></Button>
    </Paper>
  );
}