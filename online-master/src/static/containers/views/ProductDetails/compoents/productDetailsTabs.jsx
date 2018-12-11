import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";
// core components
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../../components/Grid/GridItem.jsx";
import CustomTabs from "../../../../components/CustomTabs/CustomTabs.jsx";
import tabsStyle from "../../../../../assets/jss/material-kit-pro-react/views/componentsSections/tabsStyle.jsx";

class SectionTabs extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <div id="nav-tabs">
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomTabs
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: "课程章节",
                      tabIcon: Face,
                      tabContent: (
                        <p className={classes.textCenter}>
                          I think that’s a responsibility that I have, to push
                          possibilities, to show people, this is the level that
                         
                          the nucleus.
                        </p>
                      )
                    },
                    {
                      tabName: "用户评价",
                      tabIcon: Chat,
                      tabContent: (
                        <p className={classes.textCenter}>
                          I think that’s a responsibility that I have, to push
                          possibilities, to show people, this is the level that
                          things could be at. I will be the leader of a company
                          that ends up being worth billions of dollars, because
                          I got the answers. I understand culture. I am the
                      
                          level that things could be at.
                        </p>
                      )
                    },
                    {
                        tabName: "售前咨询",
                        tabIcon: Build,
                        tabContent: (
                          <p className={classes.textCenter}>
                            think that’s a responsibility that I have, to push
                            possibilities, to show people, this is the level that
                           
                          </p>
                        )
                      }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(tabsStyle)(SectionTabs);
