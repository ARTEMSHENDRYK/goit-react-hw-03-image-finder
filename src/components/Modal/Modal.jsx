import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

const modalRootRef = document.querySelector("#modal-root");

class Modal extends React.Component {
  
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyESCDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyESCDown);
  }

  handleClickBackdrop = evt => {
    if (evt.currentTarget !== evt.target) {
      this.props.onClose();
    }
  }

  handleKeyESCDown = evt => {
    if (evt.code === "Escape") {
      this.props.onClose();
    }
  }

  render() {
    return (
      createPortal(
        <div className={css.Overlay} onClick={this.handleClickBackdrop}>
          <div class={css.Modal}>
            {this.props.children}
          </div>
        </div>
      , modalRootRef)
    )
  }
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal;