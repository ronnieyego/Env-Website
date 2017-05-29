import React from "react";

import SideNav from './SideNav.js';
import WidgetContainer from './solar_panel_widget/widget-container.js';

export default class Body extends React.Component {

  // <SideNav /> goes in the gap space.  Its showing up as a header tho.  Not sure why

  render() {
    return (
      <div class="container-fluid text-center">
        <div class="row content">

        <SideNav />

          <div class="col-sm-8 text-left" display="inline-block">
            <h1>Solar Panels</h1>
            <p>Solar panels are a great way to generate energy!  They can usually supply excess power for a household and actually become a revenue source.  You can use the tool below to see how much CO<sub>2</sub> a solar panel set up can prevent as well as cost savings.</p>
            <WidgetContainer {...this.props} />
            <p>this is a test to see where this text goes</p>

          </div>
          <div class="col-sm-2 sidenav">
            <div class="well">
              <p>ADS</p>
            </div>
            <div class="well">
              <p>ADS</p>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
