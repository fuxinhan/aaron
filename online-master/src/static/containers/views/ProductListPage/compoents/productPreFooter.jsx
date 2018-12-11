import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Mail from "@material-ui/icons/Mail";
import classNames from "classnames";
import GridItem from "../../../../components/Grid/GridItem";
import Card from "../../../../components/Card/Card";
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import CustomInput from "../../../../components/CustomInput/CustomInput.jsx";
import CardBody from "../../../../components/Card/CardBody.jsx";
import Button from "../../../../components/CustomButtons/Button.jsx";

import styles from "../../../../../assets/jss/material-kit-pro-react/views/componentsSections/preFooter.jsx";

import bg7 from "../../../../images/bg7.jpg";

class ProductPreFooter extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div
        className={classNames(
          classes.subscribeLine,
          classes.subscribeLineImage
        )}
        style={{ backgroundImage: `url(${bg7})` }}
      >
            <div className={classes.container}>
                <GridContainer>
                    <GridItem
                        xs={12}
                        sm={6}
                        md={6}
                        className={classNames(classes.mlAuto, classes.mrAuto)}
                    >
                        <div className={classes.textCenter}>
                            <h3 className={classes.title}>Subscribe to our Newsletter</h3>
                            <p className={classes.description}>
                                Join our newsletter and get news in your inbox every week! We
                                hate spam too, so no worries about this.
                  </p>
                        </div>
                        <Card raised className={classes.card}>
                            <CardBody className={classes.cardBody}>
                                <form>
                                    <GridContainer>
                                        <GridItem xs={12} sm={6} md={6} lg={8}>
                                            <CustomInput
                                                id="emailPreFooter"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.cardForm
                                                }}
                                                inputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Mail />
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "Your Email..."
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={6} lg={4}>
                                            <Button
                                                color="primary"
                                                block
                                                className={classes.subscribeButton}
                                            >
                                                subscribe
                                            </Button>
                                        </GridItem>
                                    </GridContainer>
                                </form>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
            </div>
        )
    }
}

export default withStyles(styles)(ProductPreFooter)