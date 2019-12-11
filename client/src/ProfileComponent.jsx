import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import './css/homepage.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function ProfileComponent(props) {
  const classes = useStyles();

  function FormRow() {
    const mappedLovedOnes = props.lovedOnes.map((lovedone, id) => <Paper style={{display: 'inline-block', marginLeft: '50px', justifyContent: 'center'}} className={classes.paper} key={id}><Link style={{textDecoration: 'none',fontFamily: 'Mountains of Christmas', fontSize: '30px', color: 'black'}} to ={`/lovedonedetail/${lovedone._id}`}>{lovedone.name}</Link></Paper>)
    return (
      <React.Fragment>
        <Grid style={{marginLeft: '31vw'}}item xs={4}>
          {mappedLovedOnes}
        </Grid>
        {/* <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid> */}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        {/* <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid> */}
      </Grid>
    </div>
  );
}