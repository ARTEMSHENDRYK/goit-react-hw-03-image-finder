import React from "react";
import PropTypes from "prop-types";
import css from "./Searchbar.module.css"

class Searchbar extends React.Component {
  state = {
    searchQuery: '',
  }

  handleInputChange = evt => {
    this.setState({ searchQuery: evt.target.value.toLowerCase() });
  } 
  

  handleSubmit = evt => {
    evt.preventDefault();

    if (!this.state.searchQuery.trim()) {
      alert("Some search query needed.");
      return;
    }

    this.props.onSubmit(this.state);
    this.setState({searchQuery: ''});
  }

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <input
            className={css["SearchForm-input"]}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
          />
          <button type="submit" className={css["SearchForm-button"]}>
            <span className={css["SearchForm-button-label"]}>Search</span>
          </button>
        </form>
      </header>
    )
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;