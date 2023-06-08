import React from "react";
import PropTypes from "prop-types";
import css from "./Button.module.css";

class Button extends React.Component {
  render() {
    const { handleLoadMore } = this.props;

    return (
        <button className={css.Button} type="button" onClick={handleLoadMore}>Load more</button>
    )
  }
}

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
}

export default Button;