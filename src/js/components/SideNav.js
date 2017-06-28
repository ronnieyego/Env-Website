import React from "react";

export default class SideNav extends React.Component {

  render() {
      return (
        <div className="col-sm-2 sidenav" id="left-side-nav">
          <h3>Site Navigation</h3>
          <div className="sidenav-text">
            <p><a href="#">Home</a></p>
            <p><a href="#">About</a></p>
            <p><a href="/solar/WA">Solar Panels</a></p>
            <p><a href="#">Solar Panel Installation</a></p>
          </div>
        </div>
      );
    }
}
