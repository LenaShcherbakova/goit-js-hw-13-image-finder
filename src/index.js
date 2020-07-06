import './styles.css';
import searchService from './apiService';
import imageCardTemplate from './image-card.hbs';

const refs = {
  searchForm: document.querySelector('#search-form'),
  imageList: document.querySelector('#image-list'),
  loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};

refs.searchForm.addEventListener('submit', searchInputHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function searchInputHandler(e) {
  e.preventDefault();

  const inputValue = e.currentTarget.elements.query.value;
  clearImageItems();

  searchService.searchQuery = inputValue;

  searchService.fetchImages().then(data => {
    console.log(data);
    const markup = buildImageListMarkup(data);
    insertImageItems(markup);
  });
}

function loadMoreBtnHandler() {
  const height = refs.imageList.scrollHeight;

  searchService
    .fetchImages()
    .then(data => {
      console.log('imageList 1: ', height);
      const markup = buildImageListMarkup(data);
      insertImageItems(markup);
    })
    .then(() => {
      window.scroll({
        top: height,
        left: 0,
        behavior: 'smooth',
      });
    });
}

function buildImageListMarkup(items) {
  return imageCardTemplate(items);
}

function insertImageItems(items) {
  refs.imageList.insertAdjacentHTML('beforeend', items);
}

function clearImageItems() {
  refs.imageList.innerHTML = '';
}
