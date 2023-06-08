import axios from 'axios';

class PixabayAPI {
  constructor() { 
    this.searchQuery = '';
    this.currentPage = 1;
    this.perPage = 12;
  }
  
  async fetchHits() {
    try {
      const response = await axios('https://pixabay.com/api/', {
        params: {
          key: '35599499-293508be47e3f21a26fab2440',
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: this.currentPage,
          per_page: this.perPage,
        }
      });
      
      response.data.hits = response.data.hits.map(hit => (
        {
          id: hit.id,
          tags: hit.tags,
          webformatURL: hit.webformatURL,
          largeImageURL: hit.largeImageURL,
        }
      ))

      this.incrementPage();
      return response.data;
    }
    catch (error) {
      console.log(error);
    }
  }    
  
  incrementPage() {
    this.currentPage += 1;
  }

  resetPage() {
    this.currentPage = 1;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export default PixabayAPI;