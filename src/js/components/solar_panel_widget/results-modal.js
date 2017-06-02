import React from "react";
import Modal from 'react-modal';
//https://www.w3schools.com/bootstrap/bootstrap_modal.asp

const customStyles = {
  content : {
    backgroundColor: '#F8F8F8',
    border: '0',
    borderRadius: '4px',
    bottom: 'auto',
    minHeight: '10rem',
    left: '50%',
    padding: '2rem',
    position: 'fixed',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    minWidth: '20rem',
    width: '80%',
    maxWidth: '60rem'
  }
};

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
    this.subtitle.style.color = 'blue';
  }

  closeModal() {
    this.props.onRequestClose && this.props.onRequestClose();
  }

  render() {
    const h2Style = {
      textColor: 'blue',
      textAlign: 'center'
    };
    return (
      <div>
        <Modal
          isOpen={this.props.modalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button type="button" className="close" style={{color: 'red'}} onClick={this.closeModal}>X</button>
          <h2 ref={subtitle => this.subtitle = subtitle} style={h2Style}>Results</h2>
          <div>{this.props.message}</div>
          <button onClick={this.closeModal} style={{left: '10%'}}>close</button>
        </Modal>
      </div>
    );
  }
}
