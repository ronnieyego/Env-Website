import React from "react";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { Capitalize } from '../utils/capitalize';
import costPagesIndex from './costs/pages-index';

const costsStyle = {
    lineHeight: '48px'
}

export default class Header extends React.Component {

	render() {

        const costsKeys = Object.keys(costPagesIndex);
        const costPages = costsKeys.map(key => {
            return <MenuItem containerElement={<a href={`/costs/${key}`}/>} primaryText={Capitalize(key)} />
        });

		return (
            <Toolbar className="nav">
                <ToolbarGroup firstChild={true}>
                    <a href="/"><img className="navbar-brand" src="/public/footprint.png"/></a>
                    <MenuItem containerElement={<a href="/"/>} primaryText="Footprint" />
                    <DropDownMenu className="nav-dropdown" value={"CO2 Costs"} >
                        <MenuItem className="nav-dropdown" value={"CO2 Costs"} primaryText="CO2 Costs" disabled={true} />
                        {costPages}
                    </DropDownMenu>
                    <MenuItem containerElement={<a href="/how-your-footprint-was-calculated"/>} primaryText="Footprint Calculations" />
                    <MenuItem containerElement={<a href="/data"/>} primaryText="Data" />
                    <MenuItem containerElement={<a href="/co2e"/>} primaryText="CO2e" />
                    <MenuItem containerElement={<a href="/about"/>} primaryText="About" />
                </ ToolbarGroup>
            </Toolbar>
		);
	}
}


