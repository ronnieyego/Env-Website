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

          <div class="col-sm-8 text-left">
            <h1>Solar Panel Installation</h1>
            <p>There are 4 main types of solar panels, each comes with their own unique benfits and costs.
            </p>
            <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Relative Cost</th>
              <th>Advantages</th>
              <th>Disadvantages</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>Monocrystalline Silicon</td>
              <td>Most Expensive</td>
              <td>Highest effiency rating<br />Longest lifespan</td>
              <td>Suspectable to dirt and debris<br />Creates silicon waste</td>
            </tr>
            <tr>
              <td>Polycrystalline Silicon</td>
              <td>Moderate</td>
              <td>Longest on the market.<br />Cheapest option</td>
              <td>Low effiency</td>
            </tr>
            <tr>
              <td>String Ribbon</td>
              <td>Cheap</td>
              <td>Low cost due to only using about 50% as much silicon as other panels</td>
              <td>Low efficiency</td>
            </tr>
             <tr>
              <td>Thin Film</td>
              <td>Cheapest</td>
              <td>Easily mass produced</td>
              <td>Lowest efficiency.  Generally not recommended for residential use</td>
            </tr>
          </tbody>
        </table>

        <WidgetContainer sunHours={this.props.sunHours} />



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
