import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../../components/Grid/GridItem.jsx";
import Card from "../../../../components/Card/Card.jsx";
import CardBody from "../../../../components/Card/CardBody.jsx";

import styles from "../../../../../assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.jsx";
import cardBlog5 from "../../../../../assets/img/examples/card-blog5.jpg";


class ProductCards extends React.Component {

  componentDidMount() {
    const { classes } = this.props;
    var rotatingCards = document.getElementsByClassName(classes.cardRotate);
    for (let i = 0; i < rotatingCards.length; i++) {
      var rotatingCard = rotatingCards[i];
      var rotatingWrapper = rotatingCard.parentElement;
      var cardWidth = rotatingCard.parentElement.offsetWidth;
      var cardHeight = rotatingCard.children[0].children[0].offsetHeight;
      rotatingWrapper.style.height = cardHeight + "px";
      rotatingWrapper.style["margin-bottom"] = 30 + "px";
      var cardFront = rotatingCard.getElementsByClassName(classes.front)[0];
      var cardBack = rotatingCard.getElementsByClassName(classes.back)[0];
      cardFront.style.height = cardHeight + 35 + "px";
      cardFront.style.width = cardWidth + "px";
      cardBack.style.height = cardHeight + 35 + "px";
      cardBack.style.width = cardWidth + "px";
    }
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
            <div className={classes.container}>
              <GridContainer>
                <GridItem xs={12} sm={6} md={6} lg={4}>
                  <div className={classes.rotatingCardContainer}>
                    <Card background className={classes.cardRotate}>
                      <div
                        className={`${classes.front} ${
                          classes.wrapperBackground
                        }`}
                        style={{
                          backgroundImage: `url(${cardBlog5})`
                        }}
                      >
                        <CardBody background className={classes.cardBodyRotate}>
   
                            <h4 className={classes.cardTitleWhite}>
                              线上授课
                            </h4>

                          <p className={classes.cardDescriptionWhite}>
                            全新推出PC端线上客户端及Pad端在线版客户端，随时练习、复习。
                          </p>
                        </CardBody>
                      </div>
                      <div
                        className={`${classes.back} ${
                          classes.wrapperBackground
                        }`}
                        style={{
                          backgroundImage: `url(${cardBlog5})`
                        }}
                      >
                        <CardBody background className={classes.cardBodyRotate}>
                          <h4 className={classes.cardTitleWhite}>
                            时间
                          </h4>
                          <p className={classes.cardDescriptionWhite}>
                            你还在为上课时间冲突而担忧吗？线上授课，根据你的时间上课。

                          </p>
                        </CardBody>
                      </div>
                    </Card>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={4}>
                  <div className={classes.rotatingCardContainer}>
                    <Card background className={classes.cardRotate}>
                      <div
                        className={`${classes.front} ${
                          classes.wrapperBackground
                        }`}
                        style={{
                          backgroundImage: `url(${cardBlog5})`
                        }}
                      >
                        <CardBody background className={classes.cardBodyRotate}>

                            <h4 className={classes.cardTitleWhite}>
                              知识点记不住？
                            </h4>

                          <p className={classes.cardDescriptionWhite}>
                            逻辑思维，开发大脑习惯。
                          </p>
                        </CardBody>
                      </div>
                      <div
                        className={`${classes.back} ${
                          classes.wrapperBackground
                        }`}
                        style={{
                          backgroundImage: `url(${cardBlog5})`
                        }}
                      >
                        <CardBody background className={classes.cardBodyRotate}>
                          <h4 className={classes.cardTitleWhite}>
                            直播没赶上？
                          </h4>
                          <p className={classes.cardDescriptionWhite}>
                            录播陪你，录播随时可看，一遍不够？那就看10遍20遍
                          </p>
                        </CardBody>
                      </div>
                    </Card>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={4}>
                  <div className={classes.rotatingCardContainer}>
                    <Card background className={classes.cardRotate}>
                      <div
                        className={`${classes.front} ${
                          classes.wrapperBackground
                        }`}
                        style={{
                          backgroundImage: `url(${cardBlog5})`
                        }}
                      >
                        <CardBody background className={classes.cardBodyRotate}>
                            <h4 className={classes.cardTitleWhite}>
                              This Background
                            </h4>
                          <p className={classes.cardDescriptionWhite}>
                            Don't be scared of the truth because we need to
                            restart the ......
                          </p>
                        </CardBody>
                      </div>
                      <div
                        className={`${classes.back} ${
                          classes.wrapperBackground
                        }`}
                        style={{
                          backgroundImage: `url(${cardBlog5})`
                        }}
                      >
                        <CardBody background className={classes.cardBodyRotate}>
                          <h4 className={classes.cardTitleWhite}>
                            Manage Post
                          </h4>
                          <p className={classes.cardDescriptionWhite}>
                            As an Admin, you have shortcuts to edit, view or
                            delete the posts.
                          </p>
                        </CardBody>
                      </div>
                    </Card>
                  </div>
                </GridItem>
              </GridContainer>
            </div>
    );
  }
}

export default withStyles(styles)(ProductCards);
