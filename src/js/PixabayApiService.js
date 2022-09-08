const axios = require('axios').default;
export default class PixabayApiService {
  constructor() {
    this.searchQuery = ""
    this.page = 1
    }
    
    getImages() {
    const API = "17553601-11a77715f3e073a989ba7d24f"
    const url = "https://pixabay.com/api/"
    const params = {
    "q": `${this.searchQuery}`,
    "key": API,
    "image_type": "photo",
    "orientation": "horizontal",
    "safe-search": true,
    "per_page": 40,
    "page":`${this.page}`  
    }
     return axios(url, { params }).then(data => {
       this.page +=1
      return data.data.hits
    })}
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


