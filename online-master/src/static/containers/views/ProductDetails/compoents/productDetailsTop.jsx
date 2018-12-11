import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../../components/Grid/GridItem.jsx";
import Parallax from "../../../../components/Parallax/Parallax.jsx";
import Button from "../../../../components/CustomButtons/Button.jsx";
import styles from "../../../../../assets/jss/material-kit-pro-react/views/ecommerceSections/latestOffersStyle.jsx";

const SectionLatestOffers = props => {
    const { classes } = props;
    return (

        <div className={classes.section}>
            <Parallax
                image={require("../../../../images/bg10.jpg")}
                className={classes.parallax90}
            >
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem>
                            <div className={classes.brand}>
                                <h2 className={classes.textWhite}>
                                    全面系统 Python3入门+进阶课程
                                </h2>
                                <br/>
                                <span>从基础语法开始，体验python语言之美</span>
                                <hr/>
                                <span>难度初级· 时长20小时· 学习人数6808· 综合评分9.85分</span>
                                <br className={classes.width70} />
                                <h4>$ 366 </h4>
                                <div  className={classes.title}>
                                    <Button round color="rose">
                                        Add to Cart 
                                    </Button>
                                </div>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
        </div>
    );
};

export default withStyles(styles)(SectionLatestOffers);
