import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import LocalShipping from "@material-ui/icons/LocalShipping";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Favorite from "@material-ui/icons/Favorite";
// core components
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../../components/Grid/GridItem.jsx";
import InfoArea from "../../../../components/InfoArea/InfoArea.jsx";
import productStyle from "../../../../../assets/jss/material-kit-pro-react/views/productStyle.jsx";

class ProductDay extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classNames(classes.features, classes.textCenter,classes.lineHeight)}>
              <h3>适合人群 </h3>
              <span>对Python感兴趣的人都可以学习本课程，这是一门真正入门课程，但并不止步于入门将带你从入门向进阶过渡</span>
              <GridContainer>
                <GridItem md={4} sm={4}>
                  <InfoArea
                    title="2 Days Delivery"
                    description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                    icon={LocalShipping}
                    iconColor="info"
                    vertical
                  />
                </GridItem>
                <GridItem md={4} sm={4}>
                  <InfoArea
                    title="Refundable Policy"
                    description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                    icon={VerifiedUser}
                    iconColor="success"
                    vertical
                  />
                </GridItem>
                <GridItem md={4} sm={4}>
                  <InfoArea
                    title="Popular Item"
                    description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                    icon={Favorite}
                    iconColor="rose"
                    vertical
                  />
                </GridItem>
              </GridContainer>

            </div>
        )
    }

}

export default withStyles(productStyle)(ProductDay);