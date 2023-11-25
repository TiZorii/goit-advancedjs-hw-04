import axios from 'axios';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const API_KEY = '40880648-0c49830a119af18016c24c7ec';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;
let currentPage = 1;
let currentQuery = '';


loadMoreBtn.style.display = 'none';

const fetchImages = async (query, page) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: PER_PAGE,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return null;
  }
};

const renderImages = (images) => {
  gallery.innerHTML = '';

  if (images.length === 0) {
    iziToast.info({
      title: 'Info',
      message: 'Sorry, there are no images matching your search query. Please try again.',
    });
    return;
  }

  images.forEach((image) => {
    const card = document.createElement('a'); 
    card.href = image.largeImageURL; 
    card.classList.add('photo-card');

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.loading = 'lazy';

    const info = document.createElement('div');
    info.classList.add('info');
    info.innerHTML = `
      <p class="info-item"><b>Likes:</b> ${image.likes}</p>
      <p class="info-item"><b>Views:</b> ${image.views}</p>
      <p class="info-item"><b>Comments:</b> ${image.comments}</p>
      <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
    `;

    card.appendChild(img);
    card.appendChild(info);
    gallery.appendChild(card);
  });

    const lightbox = new SimpleLightbox('.gallery a', {
      
  });
  lightbox.refresh();
};


const searchImages = async (query) => {
  currentQuery = query;
  currentPage = 1;

  const data = await fetchImages(query, currentPage);
  if (data) {
      gallery.innerHTML = ''; 
      
    renderImages(data.hits);
    showLoadMoreBtn(data.totalHits);
  }
};

const loadMoreImages = async () => {
  currentPage++;

  const data = await fetchImages(currentQuery, currentPage);
  if (data) {
    renderImages(data.hits);
    showLoadMoreBtn(data.totalHits);
  }
};

const showLoadMoreBtn = (totalHits) => {
  if (currentPage * PER_PAGE < totalHits) {
    loadMoreBtn.style.display = 'block';
  } else {
    loadMoreBtn.style.display = 'none';
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
    });
  }
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value.trim();

  if (query !== '') {
    searchImages(query);
  }
});

loadMoreBtn.addEventListener('click', loadMoreImages);

