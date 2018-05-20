import React from "react";
import { connect } from 'react-redux';

import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';

@connect((store, props) => {
	return {
		isMobile: store.userInfo.isMobile,
	};
})
export default class HeaderHoc extends React.Component {

	render() {
        const header = this.props.isMobile ? <HeaderMobile /> : <HeaderDesktop />;
		return (
            <div>
                {header}
            </div>
		);
	}
}


