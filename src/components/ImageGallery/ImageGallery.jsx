import React from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";
import css from "./ImageGallery.module.css";

class ImageGallery extends React.Component {
  render() {
    const { hits } = this.props;

    return (
      <ul className={css.ImageGallery}>
        {hits.map(({ id, tags, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              tags={tags}             
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
            />
          )
        })}
      </ul>
    )
  }
}

ImageGallery.propTypes = {
  id: PropTypes.number,
  tags: PropTypes.string,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
}

export default ImageGallery;