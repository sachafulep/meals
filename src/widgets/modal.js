import React from "react";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.currentModal !== undefined) {
      return "fdsa";
    } else {
      return null;
    }
  }
}

export default Modal;
