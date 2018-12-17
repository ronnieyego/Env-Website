import React from "react";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ListIcon from 'material-ui/svg-icons/navigation/menu';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';

import { capitalize } from '../../utils/capitalize';
import costPagesIndex from '../costs/pages-index';


const toolbarStyle = { justifyContent: '', backgroundColor: '' };

export default class HeaderMobile extends React.Component {

	render() {
        const costsKeys = Object.keys(costPagesIndex);
        const costPages = costsKeys.map(key => {
            return <MenuItem key={`header-menu-item-${key}`} containerElement={<a key={`header-link-${key}`} href={`/costs/${key}`}/>} primaryText={capitalize(key)} />
        });

		return (
            <div className="header">
                <div className="header-background" />
                <Toolbar className="material-ui-nav" style={toolbarStyle}>
                    <ToolbarGroup className="material-ui-nav-item" firstChild={true}>
                        <a key="header-link-logo" href="/"><img className="material-ui-nav-logo" height="32" width="32" alt="This is not a site about finding Sasquatch" src="/public/footprint.png"/></a>
                    </ToolbarGroup>
                    <ToolbarGroup className="material-ui-nav-item-right">
                        <IconMenu
                            iconButtonElement={
                            <IconButton touch={true}>
                                <ListIcon />
                            </IconButton>
                            }
                            menuStyle={{backgroundColor: '#91e0c0'}}
                        >
                            <MenuItem containerElement={<a key="header-link-data-footprint" className="material-ui-nav-item" href="/"/>} primaryText="Footprint" />
                            <MenuItem containerElement={<a className="material-ui-nav-item" href="/costs"/>} primaryText="CO2 of Things" />
                            <MenuItem containerElement={<a className="material-ui-nav-item" href="/static/how-much-co2"/>} primaryText="How Much CO2" />
                            <MenuItem containerElement={<a className="material-ui-nav-item" href="/energy"/>} primaryText="Energy" />
                            <MenuItem containerElement={<a className="material-ui-nav-item" href="/static/data"/>} primaryText="Data" />
                            <MenuItem containerElement={<a className="material-ui-nav-item" href="/static/co2e"/>} primaryText="CO2e" />
                            <MenuItem containerElement={<a className="material-ui-nav-item" href="/static/about"/>} primaryText="About" />
                        </IconMenu>
                    </ ToolbarGroup>
                </Toolbar>
            </div>
		);
	}
}

        
