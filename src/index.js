
import Notiflix from 'notiflix'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import PixabayApiService from './js/PixabayApiService';

const galleryMaker = new PixabayApiService()

const refs = {
    searchForm: document.querySelector(".search-form"),
    loadMore: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery')
    
}


refs.searchForm.addEventListener('submit', onSearch)
refs.loadMore.addEventListener('click', onLoadMore)

function onSearch(e) {
    refs.gallery.innerHTML = ""
    galleryMaker.resetPage()
    e.preventDefault() 
    refs.loadMore.classList.remove('d-none')
    const form = e.currentTarget
    galleryMaker.query = form.elements.searchQuery.value
    galleryMaker.getImages().then(data => cardBuilder(data))
}

function onLoadMore() {
    galleryMaker.getImages().then(data => cardBuilder(data))
}


function cardBuilder(data) {
    const galleryTemplate = data.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads}) => {
        return `
 <div class="photo-card">
   <img src="${webformatURL}" alt="${tags}" loading="lazy" width="480" height="320px"/>
   <div class="info">
     <p class="info-item">
       <b>Likes</b> ${likes}
     </p>
     <p class="info-item">
       <b>Views</b> ${views}
     </p>
     <p class="info-item">
       <b>Comments</b> ${comments}
     </p>
     <p class="info-item">
       <b>Downloads</b> ${downloads}
     </p>
   </div>
 </div>`
  })
    
    
    refs.gallery.insertAdjacentHTML('beforeend', galleryTemplate.join(''))
}