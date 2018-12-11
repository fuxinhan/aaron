import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ChatBubble from "@material-ui/icons/ChatBubble";
import Favorite from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";


import GridItem from "../../../../components/Grid/GridItem";
import Card from "../../../../components/Card/Card";
import CardHeader from "../../../../components/Card/CardHeader";
import CardBody from "../../../../components/Card/CardBody.jsx";
import CardFooter from "../../../../components/Card/CardFooter.jsx";
import office1 from "../../../../../assets/img/examples/office1.jpg";
import styles from "../../../../../assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.jsx";
import Badge from "../../../../components/Badge/Badge.jsx";

import christian from "../../../../images/faces/christian.jpg";

class SingleItem extends React.Component {

    render() {
        const { classes } = this.props;
        return (
                <GridItem xs={12} sm={6} md={4} lg={3}>
                    <Card>
                        <CardHeader image>
                            <Link to="ProductDetails">
                                <img src={office1} alt="..." />
                                <div className={classes.cardTitleAbsolute}>
                                    PhP Programming tutorial
                                </div>
                            </Link>
                            <div
                                className={classes.coloredShadow}
                                style={{
                                    backgroundImage: `url(${office1})`,
                                    opacity: "1"
                                }}
                            />
                        </CardHeader>
                        <CardBody>
                            <Badge color="rose" className={classes.margin15}>VIP</Badge>
                            <Badge color="primary" className={classes.margin15}>硬件+软件</Badge>
                            <Badge color="warning" className={classes.margin15}>推荐入门</Badge>
                            <div className={classes.cardDescription}>
                                PHP is a widely used open source, multi-purpose scripting .....
                                    </div>
                        </CardBody>
                        <CardFooter>
                            <div className={classes.author}>
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                    <img
                                        src={christian}
                                        alt="..."
                                        className={`${classes.imgRaised} ${
                                            classes.avatar
                                            }`}
                                    />
                                    <span className={classes.positionAbsBottom1_5em}>Lord Alex</span>
                                </a>
                            </div>
                            <div className={`${classes.stats} ${classes.mlAuto}`}>
                                <Favorite />
                                <span className={classes.marginTop6}>456</span>
                                <ChatBubble />
                                <span className={classes.marginTop6}> 245</span>
                            </div>
                        </CardFooter>
                    </Card>

                </GridItem>
        )
    }
}

export default withStyles(styles)(SingleItem)