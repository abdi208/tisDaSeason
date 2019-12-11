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

export default function LovedOneComponent(props) {
    const classes = useStyles();

    function FormRow() {
        const mappedGifts = lovedone.map((lovedone, id) => <div key={id}><Paper style={{display: 'inline-block', marginLeft: '50px', justifyContent: 'center'}} className={classes.paper} key={id} ><Link  style={{fontSize: '25px', color: 'black', textDecoration: 'none', fontFamily: 'Mountains of Christmas'}} to={`/lovedone/${this.props.match.params.id}/giftedit/${lovedone._id}`}> 🎁 {lovedone.name}</Link></Paper></div>)
        return (
        <React.Fragment>
            <Grid style={{marginLeft: '31vw'}}item xs={4}>
            {mappedGifts}
            
            </Grid>
        </React.Fragment>
        );
    }

    return (
        <div className={classes.root}>
        <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
            <FormRow />
            </Grid>
        </Grid>
        </div>
    );
}