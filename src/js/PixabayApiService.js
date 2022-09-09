import Notiflix from 'notiflix'
const axios = require('axios').default;
const APIKEY = "17553601-11a77715f3e073a989ba7d24f"
const url = "https://pixabay.com/api/"
export default class PixabayApiService {
  constructor() {
    this.searchQuery = ""
    this.page = 0 
    this.photosShown = (this.page + 1)*40
    }
    
    async getImages() {
    
    const params = {
    "q": `${this.searchQuery}`,
    "key": APIKEY,
    "image_type": "photo",
    "orientation": "horizontal",
    "safe-search": true,
    "per_page": 40,
    "page":`${this.page}`  
    }
      
       try { const data = await axios(url, { params })
       
         
         
         
         this.page += 1
         
  
         return data.data
        
       } catch(err) {
         console.log(err)
    
      }
     
  }
  
  get query() {
      return this.searchQuery
  }
  set query(newQuery) {
    this.searchQuery = newQuery
  }
  resetPage() {
    this.page = 1
  }
}

//   


