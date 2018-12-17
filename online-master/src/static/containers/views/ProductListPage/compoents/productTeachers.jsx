import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "../../../../components/Grid/GridItem";
import Card from "../../../../components/Card/Card";
import CardBody from "../../../../components/Card/CardBody.jsx";
import Button from "../../../../components/CustomButtons/Button.jsx";
import CardAvatar from "../../../../components/Card/CardAvatar.jsx";



import styles from "../../../../../assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.jsx";

import marc from "../../../../images/faces/marc.jpg";

class SingleItem extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <GridItem xs={12} sm={6} md={6} lg={4}>
                <Card profile>
                    <CardAvatar profile>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            <img src={marc} alt="..." />
                        </a>
                    </CardAvatar>
                    <CardBody>
                        <h6
                            className={`${classes.cardCategory} ${
                                classes.cardDescription
                                }`}
                        >
                            CEO / CO-FOUNDER
                        </h6>
                        <h4 className={classes.cardTitle}>Alec Thompson</h4>
                        <p className={classes.cardDescription}>
                            Don't be scared of the truth because we need to
                            restart the human foundation in truth And I love you
                            like Kanye loves Kanye I love Rick Owens’ bed design
                            but the back is...
                        </p>
                        <Button round color="info">
                            Follow
                        </Button>
                    </CardBody>
                </Card>
            </GridItem>
        )
    }
}

export default withStyles(styles)(SingleItem)