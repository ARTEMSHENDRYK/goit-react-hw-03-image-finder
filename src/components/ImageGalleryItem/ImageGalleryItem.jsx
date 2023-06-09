import React from "react";
import Modal from "components/Modal/Modal";
import PropTypes from "prop-types";
import css from "./ImageGalleryItem.module.css";

class ImageGalleryItem extends React.Component {
  state = {
    showModal: false,
  }
  
  toggleModal = () => {
        this.setState(({ showModal }) => ({
          showModal: !showModal
        }));
    }

  openModal = (largeImageURL) => {
    this.toggleModal();
  }

  render() {
    const { tags, webformatURL, largeImageURL} = this.props;
  
    return (
      <li className={css.ImageGalleryItem} onClick={() => { this.openModal(largeImageURL)}}>
        <img
          className={css["ImageGalleryItem-image"]}
          src={webformatURL}
          alt={tags}
        />
        {this.state.showModal && <Modal onClose={this.toggleModal}>
          <img
            src={largeImageURL}
            alt={tags}
          />
        </Modal>}
      </li>
    )
  }
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
}

export default ImageGalleryItem;