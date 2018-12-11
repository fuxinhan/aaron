import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

import Myheader from '../components/MyHeader.jsx'
import Footers from '../components/Footers.jsx'
import ProductTop from './compoents/productTop.jsx'
import ProductTeachers from './compoents/productTeachers.jsx'
import ProductPreFooter from './compoents/productPreFooter.jsx'
// import Carousel from '../components/Carousel.jsx'
import styles from "../../../../assets/jss/material-kit-pro-react/views/ecommerceSections/latestOffersStyle.jsx";
import SingleItem from './compoents/SingleItem.jsx'
// import { getUserDataFetch } from '../../../actions/userdata'

const pt = []
const Teachers = []
const SectionLatestOffers = props => {
    const { classes } = props;
    if(pt.length==0||Teachers.length==0){
        for (var i = 0; i< 4; i++){
            pt.push(<SingleItem/>)
            Teachers.push(<ProductTeachers/>)
        }
    }
    
    
    return (
        <div className={classes.section}>
            <Myheader></Myheader>
            <ProductTop></ProductTop>
            <div>
                <div className={classNames(classes.main,classes.mainRaised)}>
                    <div className={classes.divHW}>
                        <span className={classes.spanQian}>硬件</span>
                        <span className={classes.spanZh}>|</span>
                        <span className={classes.spanHou}>
                            cong ji chu kai shi rang hai zi liao jie bian cheng
                        </span>
                        {/* <button onClick={getUserDataFetch(token)}>this is token</button> */}
                    </div>
                    
                    <GridContainer>
                        {pt}
                    </GridContainer>
                    <div className={classes.divHW}>
                        <span className={classes.spanQian}>软件</span>
                        <span className={classes.spanZh}>|</span>
                        <span className={classes.spanHou}>
                            cong ji chu kai shi rang hai zi liao jie bian cheng
                        </span>
                    </div>
                    <GridContainer>
                        {pt}
                    </GridContainer>
                    <div className={classes.divHW}>
                        <span className={classes.spanQian}>软件 + 硬件</span>
                        <span className={classes.spanZh}>|</span>
                        <span className={classes.spanHou}>
                            cong ji chu kai shi rang hai zi liao jie bian cheng
                        </span>
                    </div>
                    <GridContainer>
                        {pt}
                    </GridContainer>
                    <div className={classes.divHW}>
                        <span className={classes.spanQian}>瓦力精英名师</span>
                    </div>
                    <GridContainer>
                        {Teachers}
                    </GridContainer>
                    
                   
                </div>
            </div>
            {/* <Footers /> */}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div>
                <ProductPreFooter/>
                <Footers></Footers>
            </div>
            
        </div>
    );
};

export default withStyles(styles)(SectionLatestOffers);
