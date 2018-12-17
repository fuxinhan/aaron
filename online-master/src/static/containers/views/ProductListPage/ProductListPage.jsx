import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import VolumeUp from "@material-ui/icons/VolumeUp";
// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import Myheader from '../components/MyHeader.jsx';
import Footers from '../components/Footers.jsx';
import ProductTop from './compoents/productTop.jsx';
import ProductTeachers from './compoents/productTeachers.jsx';
import ProductPreFooter from './compoents/productPreFooter.jsx';
import ProductServices from './compoents/productServices.jsx';
import ProductTab from './compoents/productTab.jsx';
import styles from "../../../../assets/jss/material-kit-pro-react/views/ecommerceSections/latestOffersStyle.jsx";
import SingleItem from './compoents/SingleItem.jsx'
import Bg10 from "../../../../assets/img/bg10.jpg"

// pt 课件数组 Teachers 老师数据   为了简化代码。
const pt = []
const Teachers = []
const SectionLatestOffers = props => {
    const { classes } = props;
    if(pt.length==0||Teachers.length==0){
        for (var i = 0; i< 3; i++){
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
                    <div className={classes.notice}>
                        <dir className={classes.noticeIcon}>
                            <VolumeUp/> 
                        </dir>
                    </div>
                    {/* 硬件课程组件 */}
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

                    {/* 软件课程组件 */}
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

                    {/* 硬件和软件课程组件 */}
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

                    {/* 精英名师组件 */}
                    <div className={classes.divHW}>
                        <span className={classes.spanQian}>瓦力精英名师</span>
                        <span className={classes.spanZh}>|</span>
                        <span className={classes.spanHou}>
                            cong ji chu kai shi rang hai zi liao jie bian cheng
                        </span>
                    </div>
                    <GridContainer>
                        {Teachers}
                    </GridContainer>

                    {/* 课程与服务组件 */}
                    <div className={classes.divHW}>
                        <span className={classes.spanQian}>课程与服务</span>
                        <span className={classes.spanZh}>|</span>
                        <span className={classes.spanHou}>
                            cong ji chu kai shi rang hai zi liao jie bian cheng
                        </span>
                    </div>
                    <ProductServices/>

                    {/* 加盟商服务组件 */}
                    <ProductTab/>
                </div>
            </div>
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
