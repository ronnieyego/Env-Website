import React from "react";

export default class SideNav extends React.Component {

  render() {
      return (
        <div className="col-sm-2 sidenav" id="left-side-nav">
          <p><a href="#">Home</a></p>
          <p><a href="#">About</a></p>
          <p><a href="#">Solar Panels</a></p>
          <p><a href="#">Solar Panel Installation</a></p>
        </div>
      );
    }
}
