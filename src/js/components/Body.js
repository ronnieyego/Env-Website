import React from "react";

import SideNav from './SideNav.js';
import WidgetContainer from './solar_panel_widget/widget-container.js';

export default class Body extends React.Component {

  render() {
    return (
      <div className="container-fluid text-center">
        <div style={{marginLeft: 'auto'}}>
          <h1>Solar Panels</h1>
          <p style={{marginLeft: '15px'}}>Solar panels are a great way to generate energy!  They can usually supply excess power for a household and actually become a revenue source.  You can use the tool below to see how much CO<sub>2</sub> a solar panel set up can prevent as well as cost savings.</p>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <WidgetContainer {...this.props} />
          </div>
        </div>
      </div>

    );
  }
}
