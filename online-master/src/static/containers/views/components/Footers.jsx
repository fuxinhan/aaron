import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Footer from "../../../components/Footer/Footer.jsx";
import loginPageStyle from "../../../../assets/jss/material-kit-pro-react/views/loginPageStyle";


class Footers extends React.Component {
    render() {
        const { classes } = this.props;
        return (

            <Footer
                theme="dark"
                content={
                    <div>
                        <div className={classes.left}>
                            <List className={classes.list}>
                                <ListItem className={classes.inlineBlock}>
                                    <a
                                        href="http://blog.creative-tim.com/"
                                        className={classes.block}
                                    >
                                        Blog
                    </a>
                                </ListItem>
                                <ListItem className={classes.inlineBlock}>
                                    <a
                                        href="https://www.creative-tim.com/presentation"
                                        className={classes.block}
                                    >
                                        Presentation
                    </a>
                                </ListItem>
                                <ListItem className={classes.inlineBlock}>
                                    <a
                                        href="#pablito"
                                        onClick={e => e.preventDefault()}
                                        className={classes.block}
                                    >
                                        Discover
                    </a>
                                </ListItem>
                                <ListItem className={classes.inlineBlock}>
                                    <a
                                        href="#pablito"
                                        onClick={e => e.preventDefault()}
                                        className={classes.block}
                                    >
                                        Payment
                    </a>
                                </ListItem>
                                <ListItem className={classes.inlineBlock}>
                                    <a
                                        href="https://www.creative-tim.com/contact-us"
                                        className={classes.block}
                                    >
                                        Contact us
                    </a>
                                </ListItem>
                            </List>
                        </div>
                        <div className={classes.right}>
                            Copyright &copy; {1900 + new Date().getYear()}{" "}
                            <a
                                href="https://www.creative-tim.com"
                                className={classes.aClasses}
                            >
                                Creative Tim
                </a>{" "}
                            All Rights Reserved.
              </div>
                    </div>
                }
            />
        )
    }
}

export default withStyles(loginPageStyle)(Footers);
