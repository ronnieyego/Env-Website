import React from "react";
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';

import pages from './pages-index';
import { Capitalize } from '../../utils/capitalize';

export default class CostsFooter extends React.Component {

	render() {
        const keys = Object.keys(pages);
        const links = keys.map(key => <a key={`costs-footer-${key}`} href={key} className="costs-footer-link">{Capitalize(key)}</a>);
            
		return (
            <div>
                <br />
                <Divider />
                <div className="costs-footer">
                    <div className="costs-footer-title">
                        See the CO<sub>2</sub> cost of other things
                    </div>
                    <div className="costs-footer-link-container">
                        {links}
                    </div>
                </div>
            </div>
		);
	}
}


