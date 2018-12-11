import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
// core components
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../../components/Grid/GridItem.jsx";
import styles from "../../../../../assets/jss/material-kit-pro-react/views/componentsSections/footerStyle.jsx";
import image from "../../../../../assets/img/faces/avatar.jpg";
import office5 from "../../../../../assets/img/examples/office5.jpg";
class ProductInfoVideo extends React.Component{
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <div
            className={classes.padding40}
          >
            <GridContainer>
              <GridItem xs={12} sm={3} md={3}>
                <div className={classes.galleryFeed}>
                      <img
                        src={image}
                        alt="..."
                        className={classes.imgRoundedCircle + " " + classes.imgFluid}
                        onClick={this.handleOpen}
                      />
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                  >
                    <div className={classes.paper} onClick={this.handleClose}
                    >
                      <Typography variant="h6" id="modal-title">
                        Text in a modal
                      </Typography>
                      <Typography variant="subtitle1" id="simple-modal-description">
                        <img src={office5} alt="..." className={classes.paperImg}/>
                      </Typography>
                    </div>
                  </Modal>
                  
                </div>
                <div className={classes.galleryFeed}>
                  <h5>观看导学视频 </h5>
                  <div>python gao ji kai fa gong cheng shi </div>
                 </div>
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <h3 style={{color:"#333"}}>Python入门与实战 常用组件API开发技巧项目实战</h3>
                <div>
                  bobo老师特为机器学习初学者量身打造，使用最新的python3语言和最流行的scikit-learn框架，算法与编程两翼齐飞，由浅入深，一步步的进入机器学习的世界。学到的不只是一门课程，更是不断思考的能力。
                </div>
              </GridItem>
              <GridItem xs={12} sm={3} md={3}>
                <div className={classes.galleryFeed}>
                  <img
                    src={image}
                    alt="..."
                    className={classes.imgRoundedCircle + " " + classes.imgFluidRight}
                  />
                </div>
                <div className={classes.galleryFeed}>AARON</div>
              </GridItem>
            </GridContainer>
        </div>
      </div>
    );
  };
}
ProductInfoVideo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductInfoVideo);
