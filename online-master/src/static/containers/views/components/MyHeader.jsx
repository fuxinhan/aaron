import React from 'react'
// core components
import Header from "../../../components/Header/Header.jsx";
import HeaderLinks from '../../../components/Header/HeaderLinks'

class MyHeader extends React.Component {
    render() {
        return (
            <div>
                <Header
                    color="transparent"
                    brand="瓦力工厂"
                    links={<HeaderLinks dropdownHoverColor="info" />}
                    fixed
                    changeColorOnScroll={{
                        height: 200,
                        color: "info"
                    }}
                />
            </div>
        )
    }
}

export default MyHeader
