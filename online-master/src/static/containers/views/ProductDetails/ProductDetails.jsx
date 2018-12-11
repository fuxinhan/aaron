import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import MyHeader from "../components/MyHeader.jsx";
import Footers from "../components/Footers.jsx";
import ProductDetailsTop from "./compoents/productDetailsTop.jsx";
import ProductDetailsTabs from "./compoents/productDetailsTabs.jsx";
import ProductPage from "./compoents/productPage";
import ProductDay from "./compoents/productDay"
import ProductInfoVideo from "./compoents/productInfoVideo"
import ProductVip from './compoents/productVip'
import productStyle from "../../../../assets/jss/material-kit-pro-react/views/productStyle.jsx";


class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorSelect: "0",
      sizeSelect: "0"
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.productPage}>
        <MyHeader></MyHeader>
        <ProductDetailsTop/>
        <div className={classNames(classes.section, classes.sectionGray)}>
          <div className={classes.container}>
            <div className={classNames(classes.main, classes.mainRaised)}>
             <ProductInfoVideo/>
             <ProductPage/>
             <ProductVip/>
             <ProductDay/>
             <ProductDetailsTabs/> 
            </div>
          </div>
        </div>
        <Footers></Footers>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductDetails);
