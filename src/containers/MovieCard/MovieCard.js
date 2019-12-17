import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import notFound from '../../img/not_found.jpg';

const styles = theme => ({
    card: {
        display: 'flex',
        padding: '20px',
    },
    nameCard: {
        fontSize: '14px',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: '90px',
        height: '140px',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#e8eaeb',
        marginLeft: '10px',
        padding: '12px',
        minWidth: '180px',
        maxWidth: '180px',
        fontSize: '12px',
    },
});


class MovieCard extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image={!this.props.rowItem.show.image ? notFound : this.props.rowItem.show.image.medium}
                    title={this.props.rowItem.name}
                    onClick={() => this.props.handleOpelImg(!this.props.rowItem.show.image ? notFound : this.props.rowItem.show.image.medium)}
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography className={classes.nameCard}>
                            {this.props.rowItem.show.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {this.props.premiered}
                        </Typography>
                    </CardContent>
                    <Grid className={classes.controls} item xs={12} sm={12}>
                        <Grid item xs={12} sm={6}>
                            Сезон: {this.props.rowItem.season}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            Епизод: {this.props.rowItem.number}
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(MovieCard);