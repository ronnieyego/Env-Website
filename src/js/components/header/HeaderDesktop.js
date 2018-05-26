import React from "react";
import { connect } from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { Capitalize } from '../../utils/capitalize';
import costPagesIndex from '../costs/pages-index';


const toolbarStyle = { justifyContent: '' };


export default class HeaderDesktop extends React.Component {

	render() {
        const costsKeys = Object.keys(costPagesIndex);
        const costPages = costsKeys.map(key => {
            return <MenuItem key={`header-menu-item-${key}`} containerElement={<a key={`header-link-${key}`} href={`/costs/${key}`}/>} primaryText={Capitalize(key)} />
        });

		return (
            <Toolbar className="material-ui-nav" style={toolbarStyle}>
                <ToolbarGroup className="material-ui-nav-item" firstChild={true}>
                    <a key="header-link-logo" href="/"><img className="material-ui-nav-logo" height="42" width="42" alt="This is not a site about finding Sasquatch" src="/public/footprint.png"/></a>
                </ToolbarGroup>
                <ToolbarGroup className="material-ui-nav-item">
                    <MenuItem  containerElement={<a key="header-link-data-footprint" className="material-ui-nav-item" href="/"/>} primaryText="Footprint" />
                    <DropDownMenu className="material-ui-nav-dropdown" value={"CO2 Costs"} >
                        <MenuItem className="material-ui-nav-dropdown" value={"CO2 Costs"} primaryText="CO2 Costs" disabled={true} />
                        {costPages}
                    </DropDownMenu>
                    <MenuItem  containerElement={<a className="material-ui-nav-item" href="/static/how-much-co2"/>} primaryText="How Much CO2" />
                    <MenuItem  containerElement={<a className="material-ui-nav-item" href="/energy"/>} primaryText="Energy" />
                    <MenuItem  containerElement={<a className="material-ui-nav-item" href="/static/how-the-form-works"/>} primaryText="Footprint Calculations" />
                    <MenuItem  containerElement={<a className="material-ui-nav-item" href="/static/data"/>} primaryText="Data" />
                    <MenuItem  containerElement={<a className="material-ui-nav-item" href="/static/co2e"/>} primaryText="CO2e" />
                    <MenuItem  containerElement={<a className="material-ui-nav-item" href="/static/about"/>} primaryText="About" />
                </ ToolbarGroup>
            </Toolbar>
		);
	}
}


