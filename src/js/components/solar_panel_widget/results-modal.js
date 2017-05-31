import React from "react";
//https://www.w3schools.com/bootstrap/bootstrap_modal.asp

export default class Results extends React.Component {

	render() {
		return (
			<div id="solar-results" class="modal fade" role="dialog">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">X</button>
                    <h4 class="modal-title">Solar Panel Information</h4>
                  </div>
                  <div class="modal-body">
                    <p>You will generate 10,512kwHs of electricity per year.</p>
                    <p>This will save you $1,006 per year and prevent 326.92 pounds of CO2 from being produced each year.</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>

              </div>
            </div>
		);
	}
}


// npm create-react-app
