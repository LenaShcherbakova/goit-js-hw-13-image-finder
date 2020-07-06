const baseUrl = 'https://pixabay.com/api/';

const apiKey = '17159615-18c8f8df25f590a32f73ff616';

export default {
  page: 1,
  query: '',
  fetchImages() {
    const queryParams = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${apiKey}`;
    return fetch(baseUrl + queryParams)
      .then(response => response.json())
      .then(parsedImages => {
        this.incrementPage();
        return parsedImages.hits;
      });
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
