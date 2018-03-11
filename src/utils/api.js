import axios from 'axios'

const API = {
  fetchPopularLanguages: (lang) => {
    const uri = window.encodeURI(
      `https://api.github.com/search/repositories?q=stars:>1+language:${lang}`
      + `&sort=stars&order=desc&type=Repositories`
    )
    return axios.get(uri).then(response => response.data.items)
  }
}

export default API
