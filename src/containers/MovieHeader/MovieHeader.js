import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const styles = theme => ({   
    colorArrow: {
        backgroundColor: '#efefef',
        padding: '15px 0',
        color: '#ff0000',
        width: '100%',
    },
    tittle: {
        backgroundColor: '#efefef',
        padding: '15px 0',
        textAlign: 'center',
    },
    date: {
        backgroundColor: '#ffffff',
        padding: '15px 0',
        textAlign: 'center',
    },
});


class MovieHeader extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={12}>
                <Grid container item xs={12}>
                    <Grid item xs={1} sm={1}>
                        <Button className={classes.colorArrow} component={Link} to={"/"}>
                            <ArrowBackIosIcon />
                        </Button>
                    </Grid>
                    <Grid item xs={11} sm={11} className={classes.tittle}>
                        SUPER FILM
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={1} sm={1} className={classes.date}>
                    </Grid>
                    <Grid item xs={11} sm={11} className={classes.date}>
                        {this.props.selectDate}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(MovieHeader);