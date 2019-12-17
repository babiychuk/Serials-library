import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Serials";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import 'moment/locale/ru';
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


import MovieHeader from '../../containers/MovieHeader/MovieHeader';
import MovieCard from '../../containers/MovieCard/MovieCard';

const styles = theme => ({
  parrentImg: {
    overflow: 'hidden',
    width: '100%',
  },
  originalImg: {
    height: '450px',
    margin: '0 auto',
  },
  loadMoreButton: {
    width: '100%',
    textTransform: 'none',
    color: '#b0b0b0'
  },
  blockLoadMore: {
    marginTop: '15px',
    backgroundColor: '#ffffff',
    color: '#b0b0b0',
    border: '1px solid #b0b0b0',
    borderRadius: '5px'
  }
});

class Serials extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalForm: false,
      originalImg: "",
      visible: 2,
    };
  }

  handleOpenModal = (value) => {
    this.setState({
      modalForm: value
    })
  }

  handleOpelImg = (img) => {
    this.setState({
      originalImg: img,
      modalForm: true,
    })
  }

  handleClose = () => {
    this.setState({
      modalForm: false
    })
  }

  loadMore(value) {
    var allserials = value;
    this.setState({
      visible: allserials
    });
  }

  render() {
    const { classes } = this.props;
    return (

      <div>

        <MovieHeader
          selectDate={moment(this.props.selectDate).locale('ru').format('DD MMMM YYYY')}
        />
        {this.props.serials.length ?
          <Grid item xs={12}>
            {this.props.serials.slice(0, this.state.visible).map((row, num) => (
              <MovieCard
                premiered={moment(row.show.premiered).format("YYYY")}
                handleOpelImg={this.handleOpelImg}
                rowItem={row}
                key={num} />
            ))}

            {this.state.visible > 3 ?
              <Grid container item xs={12} className={classes.blockLoadMore} justify="center">
                <Button className={classes.loadMoreButton} onClick={() => this.loadMore(2)}>
                  Показать основное
           <ExpandLessIcon />
                </Button>
              </Grid> :
              <Grid container item xs={12} className={classes.blockLoadMore} justify="center">
                <Button className={classes.loadMoreButton} onClick={() => this.loadMore(this.props.serials.length)}>
                  Еще {this.props.serials.length - this.state.visible} сериала
            <ExpandMoreIcon />
                </Button>
              </Grid>
            }

            <Dialog className={classes.parrentImg}
              open={this.state.modalForm}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title">
              <img className={classes.originalImg} alt="original img" src={this.state.originalImg} />
            </Dialog>
          </Grid> :
          <Grid container item xs={12} justify="center">
            За выбранную дату материалы отсутствуют
            <Button component={Link} to={"/"}>
              <ArrowBackIosIcon /> вернутся назад
            </Button>
          </Grid>
        }

      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    serials: state.serialsReduce.serials,
    selectDate: state.serialsReduce.selectDate
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}



export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(Serials));