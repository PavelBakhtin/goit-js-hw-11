import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { refs } from "./refs";
export default function cardBuilder(data) {
  
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
    lightbox.refresh()
    function galleryModalOpener(e) { 
    e.preventDefault()
        if(!e.target.classList.contains('gallery__image')){
        return}

}

    
}