import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Serials";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import moment from "moment";
import Calendar from 'react-calendar';
import tv from '../../img/tv.jpg';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from "axios";

const ColorLinearProgress = withStyles({
    colorPrimary: {
        backgroundColor: '#dfcab2',
    },
    barColorPrimary: {
        backgroundColor: '#693900',
    },
})(LinearProgress);

const styles = theme => ({

    tittle: {
        backgroundColor: '#efefef',
        padding: '15px 0',
    },
    centerContent: {
        textAlign: 'center',
        margin: '0',
        position: 'absolute',
        top: '35%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    imgTv: {
        width: '50%',
        heigth: '50%',
    },
    mainText: {
        padding: '30px',
    },
    calendar: {
        margin: '0 auto',
        bottom: '0',
        position: 'absolute',
        width: '100%',
        marginLeft: '-8px',
    },
    progress: {
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },

});

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }


    handleClickDate = (value) => {
        this.props.clickDate(moment(value).format("YYYY-MM-DD"));
        this.props.getSerials();
        this.setState({
            loading: true,
        });

        let selectDate = moment(value).format("YYYY-MM-DD");
        const proxy = `https://cors-anywhere.herokuapp.com/`;
        const url = `http://api.tvmaze.com/schedule?country=US&date=${selectDate}`;
        axios.get(proxy + url)
            .then( (response) => {
                this.props.getSerials(response.data); 
                this.setState({
                    loading: false,
                });
                this.props.history.push('/serials');
            })
            .catch((error) => {
                console.log(error);
            });

    }

    render() {
        const { classes } = this.props;
        return (

            <Grid container item xs={12} sm={12}>
                <Grid className={classes.tittle} container item xs={12} sm={12} justify="center">
                    SUPER FILM
                    </Grid>
                {this.state.loading ?
                    <div className={classes.progress} open={this.state.loading}>
                        <ColorLinearProgress className={classes.margin} />
                    </div>
                    : null}
                <Grid className={classes.centerContent} item xs={12} sm={12}>
                    <div>
                        <img className={classes.imgTv} alt="tv img" src={tv} />
                    </div>
                    <div className={classes.mainText}>
                        Для получения списка сериалов, пожалуйста, выберите необходимый месяц и день.
                        </div>
                </Grid>
                <Calendar className={classes.calendar} onChange={this.handleClickDate} />

            </Grid>
        );
    }
}


function mapStateToProps(state) {
    return {
        serialsReduce: state.serialsReduce.serials,
        selectDate: state.serialsReduce.selectDate
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(Main));
