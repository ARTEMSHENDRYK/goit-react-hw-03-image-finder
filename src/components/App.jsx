import React from "react";
import PixabayAPI from "api/PixabayAPI";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
import css from "./App.module.css";

const pixabayAPI = new PixabayAPI();

class App extends React.Component {
  state = {
    searchQuery: '',
    hits: [],
    hitsFlag: false,
    isLoading: false,
  }

  async componentDidUpdate(_prevProps, prevState) {
    const { searchQuery, hits, isLoading, hitsFlag } = this.state;  

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ isLoading: true });
      pixabayAPI.resetPage();
      pixabayAPI.query = searchQuery;
      this.setState({ hits: [] });
      const response = await pixabayAPI.fetchHits();
      this.setState({ hits: response.hits });
      this.checkHits(response.hits.length);
      this.setState({ isLoading: false });
    }

    if (isLoading && hitsFlag) {
      const response = await pixabayAPI.fetchHits();
      this.setState({ hits: [...hits, ...response.hits] });
      this.checkHits(response.hits.length);
      this.setState({ isLoading: false });
    }
  }

  handleSubmit = ({ searchQuery }) => {
    this.setState({ searchQuery: searchQuery.trim() });
  }

  handleLoadMore = () => {
    this.setState({ isLoading: true }); 
  }

  checkHits = (hitsLength) => {
    if (hitsLength === pixabayAPI.perPage) {
      this.setState({ hitsFlag: true })
    }
    else {
      this.setState({ hitsFlag: false })
    }
  }

  render() {
    const { hits, isLoading, hitsFlag } = this.state; 

    return(
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        {hits.length > 0 && <ImageGallery hits={hits} />}
        {isLoading && <Loader />} 
        {hitsFlag && <Button handleLoadMore={this.handleLoadMore} />}
      </div>
    );
  }
};

export default App;