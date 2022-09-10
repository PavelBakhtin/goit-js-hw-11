import Notiflix from 'notiflix'
import PixabayApiService from './js/PixabayApiService';
import cardBuilder from "./js/CardBuilder"
const galleryMaker = new PixabayApiService()
import {refs} from "./js/refs"



refs.searchForm.addEventListener('submit', onSearch)
refs.loadMore.addEventListener('click', onLoadMore)

function onSearch(e) {
    e.preventDefault() 
    clearGalleryContainer()
    galleryMaker.resetPage()
    refs.loadMore.classList.add('d-none')
    const form = e.currentTarget
    galleryMaker.query = form.elements.searchQuery.value
    galleryMaker.getImages().then(data => 
    {
     checkSearch(data)
      return cardBuilder(data.hits)
    }
    
  ).catch(err => console.log(err))
  
  
}

function onLoadMore() {
  galleryMaker.getImages().then(data =>
  {
    checkLoadMore(data)
    cardBuilder(data.hits)
    smoothScroll()
    }).catch(err => console.log(err))
    }
  


function clearGalleryContainer() {
 refs.gallery.innerHTML = ""
}
 
function checkLoadMore(data) {
  galleryMaker.updatePhotosShown(data.totalHits)
 
      if (galleryMaker.photosToShow <= 0) {
           Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
           refs.loadMore.classList.add('d-none')
           return
  }
  
       
}
function checkSearch(data){
  if (data.hits.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again."')
    
    refs.loadMore.classList.add('d-none')
    return 
   }
   refs.loadMore.classList.remove('d-none')
  Notiflix.Notify.success(`"Hooray! We found ${data.totalHits} images."`)
 galleryMaker.updatePhotosShown(data.totalHits)

  if (galleryMaker.photosToShow <= 0){
    refs.loadMore.classList.add('d-none')
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();
  
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
  
  
}