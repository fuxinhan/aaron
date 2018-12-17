import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "../../../../components/Grid/GridItem";
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import office1 from "../../../../../assets/img/examples/office1.jpg";
import styles from "../../../../../assets/jss/material-kit-pro-react/views/productServices";



class ProductServices extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <div className={classes.services}>
                        <div >
                            <img src={office1} alt="680课时" className={classes.servicesIcon}/>
                        </div>
                        <h4 className={classes.iconTitle}>680课时的知识量</h4>
                        <p className={classes.iconBody}>YAK设计了680课时的内容，函盖孩子6～16周岁的教学课程</p>
                    </div>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <div className={classes.services}>
                        <div >
                            <img src={office1} alt="680课时" className={classes.servicesIcon}/>
                        </div>
                        <h4 className={classes.iconTitle}>680课时的知识量</h4>
                        <p className={classes.iconBody}>YAK设计了680课时的内容，函盖孩子6～16周岁的教学课程</p>
                    </div>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <div className={classes.services}>
                        <div >
                            <img src={office1} alt="680课时" className={classes.servicesIcon}/>
                        </div>
                        <h4 className={classes.iconTitle}>680课时的知识量</h4>
                        <p className={classes.iconBody}>YAK设计了680课时的内容，函盖孩子6～16周岁的教学课程</p>
                    </div>
                </GridItem>

            </GridContainer>

        )
    }
}

export default withStyles(styles)(ProductServices)