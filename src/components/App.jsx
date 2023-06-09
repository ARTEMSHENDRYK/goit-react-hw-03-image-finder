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
    loadMore: false,
  }

  async componentDidUpdate(_prevProps, prevState) {
    const { searchQuery, hits, hitsFlag, loadMore } = this.state;  

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

    if (loadMore && hitsFlag) {
      this.smoothScroll();
      const response = await pixabayAPI.fetchHits();
      this.setState({ hits: [...hits, ...response.hits] });
      this.checkHits(response.hits.length);
      this.setState({ isLoading: false });
      this.setState({ loadMore: false });
    }
  }

  handleSubmit = ({ searchQuery }) => {
    this.setState({ searchQuery: searchQuery.trim() });
  }

  handleLoadMore = () => {
    this.setState({ isLoading: true });
    this.setState({ loadMore: true });
  }

  checkHits = (hitsLength) => {
    if (hitsLength === pixabayAPI.perPage) {
      this.setState({ hitsFlag: true })
    }
    else {
      this.setState({ hitsFlag: false })
    }
  }      

  smoothScroll() {
    const { height: cardHeight } = document.querySelector("ul").firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
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