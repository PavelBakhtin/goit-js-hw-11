
import Notiflix from 'notiflix'
import simpleLightbox from "simplelightbox";
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
    e.preventDefault() 
    clearGalleryContainer()
    galleryMaker.resetPage()
    refs.loadMore.classList.remove('d-none')
    const form = e.currentTarget
    galleryMaker.query = form.elements.searchQuery.value
    galleryMaker.getImages().then(data => 
    {
      testResult(data)
      return cardBuilder(data.hits)
    }
  )
}

function onLoadMore() {
  galleryMaker.getImages().then(data =>
  {
    testResult(data)
    cardBuilder(data.hits)
    console.log(data)
    })
    }
  

function cardBuilder(data) {
  
    const galleryTemplate = data.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads}) => {
        return `
 <div class="photo-card">
   <a href="${largeImageURL}"><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="360" height="240px" title=""/></a>
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
    refs.gallery.addEventListener('click', galleryModalOpener)

    var lightbox = new SimpleLightbox('.gallery a', {captionsData : 'alt', captionDelay : 250})

    function galleryModalOpener(e) { 
    e.preventDefault()

        if(!e.target.classList.contains('gallery__image')){
        return}

}

lightbox.refresh()
}
function clearGalleryContainer() {
 refs.gallery.innerHTML = ""
}
// console.log(galleryMaker.photosShown)  
function testResult(data) {
  
     if (data.hits.length === 0) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again."')
          console.log(data.hits.length)
          return 
         }
      if (galleryMaker.photosShown >= data.totalHits) {
           Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
  }
  
         Notiflix.Notify.success(`"Hooray! We found ${data.totalHits} images."`)
}