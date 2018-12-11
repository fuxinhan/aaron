import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ViewDay from "@material-ui/icons/ViewDay";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
// core components
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../../components/Grid/GridItem.jsx";
import styles from "../../../../../assets/jss/material-kit-pro-react/views/componentsSections/productVip.jsx";
import image from "../../../../../assets/img/faces/avatar.jpg";
import office5 from "../../../../../assets/img/examples/office5.jpg";
class ProductVip extends React.Component{

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <div className={classes.padding40}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
               <h3 className={classes.vipTitle}>学员专享增值服务</h3> 
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <div className={classes.galleryFeed}>
                  <div className={classes.galleryImg}></div>
                  <div>
                    <p>问答专区</p>
                    <p>讲师集中答疑</p>
                    <p>
                      关于课程的问题都可在问答区随时提问，讲师会进行集中答疑
                    </p>
                  </div>
                  
                </div>  
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <div className={classes.galleryFeed}>
                  <div className={classes.galleryImg}></div>
                  <div>
                    <p>问答专区</p>
                    <p>讲师集中答疑</p>
                    <p>
                      关于课程的问题都可在问答区随时提问，讲师会进行集中答疑
                    </p>
                  </div>
                  
                </div>  
              </GridItem>
            </GridContainer>
        </div>
      </div>
    );
  };
}

export default withStyles(styles)(ProductVip);
