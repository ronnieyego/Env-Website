import React from "react";
import { string } from 'prop-types';
import Divider from 'material-ui/Divider';

import pages from './pages-index';
import { capitalize } from '../../utils/capitalize';

export default class CostsFooter extends React.Component {

    static propTypes = {
        title: string
    }

	render() {
        const keys = Object.keys(pages);
        const links = keys.map(key => {
        return (
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2 costs-footer-link-wrapper" key={`costs-footer-${key}`}>
                    <a href={key} className="costs-footer-link">{capitalize(key)}</a>
                </div>
            );
        })
            
		return (
            <div>
                <br />
                <Divider />
                <div className="costs-footer">
                    <div className="costs-footer-title">
                        {this.props.title ? this.props.title : 'See the carbon cost of other things'}
                    </div>
                    <div className="row">
                        {links}
                    </div>
                </div>
            </div>
		);
	}
}
