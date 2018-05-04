import React from "react";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { Capitalize } from '../utils/capitalize';
import costPagesIndex from './costs/pages-index';


const toolbarStyle = { justifyContent: '' };

export default class Header extends React.Component {

	render() {
        const costsKeys = Object.keys(costPagesIndex);
        const costPages = costsKeys.map(key => {
            return <MenuItem key={`header-menu-item-${key}`} containerElement={<a key={`header-link-${key}`} href={`/costs/${key}`}/>} primaryText={Capitalize(key)} />
        });

		return (
            <Toolbar className="nav" style={toolbarStyle}>
                <ToolbarGroup className="nav-item" firstChild={true}>
                    <a key="header-link-logo" href="/"><img className="nav-logo" height="42" width="42" alt="This is not a site about finding Sasquatch" src="/public/footprint.png"/></a>
                </ToolbarGroup>
                <ToolbarGroup className="nav-item">
                    <MenuItem  containerElement={<a key="header-link-data-footprint" className="nav-item" href="/"/>} primaryText="Footprint" />
                    <DropDownMenu className="nav-dropdown" value={"CO2 Costs"} >
                        <MenuItem className="nav-dropdown" value={"CO2 Costs"} primaryText="CO2 Costs" disabled={true} />
                        {costPages}
                    </DropDownMenu>
                    <MenuItem  containerElement={<a className="nav-item" href="/how-much-co2"/>} primaryText="How Much CO2" />
                    <MenuItem  containerElement={<a className="nav-item" href="/energy"/>} primaryText="Energy" />
                    <MenuItem  containerElement={<a key="header-link-footprint-calculater" className="nav-item" href="/how-your-footprint-was-calculated"/>} primaryText="Footprint Calculations" />
                    <MenuItem  containerElement={<a key="header-link-data" className="nav-item" href="/data"/>} primaryText="Data" />
                    <MenuItem  containerElement={<a key="header-link-co2e" className="nav-item" href="/co2e"/>} primaryText="CO2e" />
                    <MenuItem  containerElement={<a key="header-link-about" className="nav-item" href="/about"/>} primaryText="About" />
                </ ToolbarGroup>
            </Toolbar>
		);
	}
}


