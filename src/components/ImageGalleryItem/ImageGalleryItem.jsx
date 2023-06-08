import React from "react";
import PropTypes from "prop-types";
import css from "./ImageGalleryItem.module.css";

class ImageGalleryItem extends React.Component {
  render() {
    const { tags, webformatURL, largeImageURL} = this.props;
  
    return (
      <li className={css.ImageGalleryItem}>
        <img className={css["ImageGalleryItem-image"]} src={webformatURL} alt={tags} />
      </li>
    )
  }
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
}

export default ImageGalleryItem;