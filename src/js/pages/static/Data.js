import React from "react";

import Header from '../../components/header/HeaderHoc';
import DataHoc from '../../components/sources-and-data/DataHoc';

export default class Co2ePage extends React.Component {
	render() {
		return (
			<div className="container-fluid text-center" >
				<Header />
                <DataHoc />
            </div>
        );
    }
}
