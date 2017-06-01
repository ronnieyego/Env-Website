import React from "react";
import Modal from 'react-modal';
//https://www.w3schools.com/bootstrap/bootstrap_modal.asp

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


  //let line1 = `You will generate ${electrictyGenerated.toLocaleString()}kwHs of electricity per year.`;
    //    let line2 = `This will save you $${savings.toLocaleString()} per year.`;
      //  let line3 = `This will also prevent ${totalCo2Saved.toFixed(2).toLocaleString()} pounds of CO2 from being produced each year.`;


export default class ResultsModal extends React.Component {

	constructor(props) {
        super();


        this.state = {
          topMessage: 'The message works!',
          howWeGotThisData: ''
        };

        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.props.onRequestClose && this.props.onRequestClose();
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Results</h2>
          <button onClick={this.closeModal}>close</button>
          <div>{this.props.message}</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
  }
}
