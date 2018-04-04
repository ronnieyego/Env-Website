import React from "react";
import PropTypes from 'prop-types';
import { Divider } from 'material-ui';

import pages from './pages-index';

import {Capitalize} from '../../utils/capitalize';


export default class PageWrapper extends React.Component {

    static propTypes = {
        page: PropTypes.string.isRequired
    }

	render() {
        const keys = Object.keys(pages);
        const links = keys.map(key => {
            return (<a href={`${key}`}>{Capitalize(key)}</a>);
        })
            
		return (
            <div>
                <br />
                <Divider />
                <div className="costs-footer">
                    <div>
                        See the CO<sub>2</sub> of other things
                    </div>
                    <div className="costs-footer-links">
                        {links}
                    </div>
                </div>
            </div>
		);
	}
}


