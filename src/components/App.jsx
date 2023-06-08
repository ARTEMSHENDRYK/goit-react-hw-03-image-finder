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
    isLoading: false,
  }

  handleSubmit = ({ searchQuery }) => {
    this.setState({ searchQuery: searchQuery.trim() });
  }

  async componentDidUpdate(_prevProps, prevState) {
    const { searchQuery, hits, isLoading } = this.state;  

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ isLoading: true });
      pixabayAPI.resetPage();
      pixabayAPI.query = searchQuery;
      setTimeout(async () => {         
          const response = await pixabayAPI.fetchHits();
          // console.log(response);
          this.setState({ hits: response.hits });
          this.setState({ isLoading: false });
      }, 2000);
    }

    if (isLoading && prevState.searchQuery === searchQuery) {
      // this.setState({ isLoading: true });     
      setTimeout(async () => {         
          const response = await pixabayAPI.fetchHits();
          // console.log(response);
          this.setState({ hits: [...hits, ...response.hits] });
          this.setState({ isLoading: false });
      }, 2000);
    }
  }

  handleLoadMore = () => {
    this.setState({ isLoading: true }); 
  }


  render() {
    const { hits, isLoading } = this.state; 

    return(
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        {hits.length > 0 && <ImageGallery hits={hits} />}
        {isLoading && <Loader />} 
        <Button handleLoadMore={this.handleLoadMore} />
      </div>
    );
  }
};

export default App;
