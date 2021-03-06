import axios from 'axios'

const getProfile = (username) => (
  axios.get(`https://api.github.com/users/${username}`)
    .then(user => user.data)
)

const getRepos = (username) => (
  axios.get(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then(repos => repos.data)
)

const getStarCount = (repos) => {
  return repos.reduce(function (count, repo) {
    return count + repo.stargazers_count
  }, 0)
}

const calculateScore = (profile, repos) => {
  const followers = profile.followers
  const totalStars = getStarCount(repos)
  return (followers * 3) + totalStars
}

const handleError = (err) => {
  console.warn(err)
  return null
}

const getUserData = (player) => (
  axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(data => {
    const profile = data[0]
    const repos = data[1]
    return {
      profile,
      score: calculateScore(profile, repos)
    }
  })
)

const sortPlayers = (players) => (
  players.sort((a, b) => b.score - a.score)
)

const API = {
  battle: (players) => axios.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError)
  ,
  fetchPopularLanguages: (lang) => {
    const uri = window.encodeURI(
      `https://api.github.com/search/repositories?q=stars:>1+language:${lang}`
      + `&sort=stars&order=desc&type=Repositories`
    )
    return axios.get(uri).then(response => response.data.items)
  }
}

export default API
