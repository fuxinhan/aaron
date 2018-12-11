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

class ProductPage extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classNames(classes.features, classes.textCenter,classes.lineHeight)}>
              <h3>让你比自学更快的Python视频教程 </h3>
              <span>职场竞争如此激烈，时间浪费不得，名师指导让你学的更快、更好、更扎实</span>
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

export default withStyles(productStyle)(ProductPage);