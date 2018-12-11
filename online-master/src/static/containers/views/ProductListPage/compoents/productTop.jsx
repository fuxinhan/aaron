import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../../components/Grid/GridItem.jsx";
import Parallax from "../../../../components/Parallax/Parallax.jsx";
import styles from "../../../../../assets/jss/material-kit-pro-react/views/ecommerceSections/latestOffersStyle.jsx";

const SectionLatestOffers = props => {
    const { classes } = props;
    return (

        <div className={classes.section}>
            <Parallax
                image={require("../../../../images/bg4.jpg")}
                className={classes.parallax}
            >
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem>
                            <div className={classes.brand}>
                                <h1>
                                    Material Kit React{" "}
                                    <span className={classes.proBadge}>PRO</span>
                                </h1>
                                <h3 className={classes.title}>All Components</h3>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
        </div>
    );
};

export default withStyles(styles)(SectionLatestOffers);
