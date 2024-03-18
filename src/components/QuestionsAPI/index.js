// function QuestionsAPI(gameOptions) {
//   let categoryQuery = ''
//   let difficultyQuery = ''
//   let typeQuery = ''

//   if (gameoptions.category !== '') categoryQuery = `&category=${category}`

//   if (difficulty !== '') difficultyQuery = `&difficulty=${difficulty}`

//   if (type !== '') typeQuery = `&typq${type}`

  // let apiUrl = `https://opentdb.com/api.php?amount=5${categoryQuery}${difficultyQuery}${typeQuery}`

//   return fetch(apiUrl)
//     .then(res => res.json())
//     .then(data => data.results)
// }

const api = async (endpoint, params) => {
  const baseUrl = 'https://opentdb.com/'

  // let parametros = new URLSearchParams(params)
  // let keysForDel = []
  // parametros.forEach((value, key) => {
  //   if(value == '' || value == null) {
  //     keysForDel.push(key)
  //   }
  // })

  // keysForDel.forEach(key => {
  //   parametros.delete(key)
  // })
  // console.log(keysForDel)

  // let categoryQuery = ''
  // let difficultyQuery = ''
  // let typeQuery = ''

  // if(params.category !== '') {
  //   categoryQuery = `&category=${params.category}`
  // }

  // if (params.difficulty !== '') {
  //   difficultyQuery = `&difficulty=${params.difficulty}`
  // }

  // if (params.type !== '') {
  //   typeQuery = `&type${params.type}`
  // }
  
  return await fetch(
    `${baseUrl}${endpoint}${params ? `?${new URLSearchParams(params).toString()}` : ''}`
    // `${baseUrl}${endpoint}${`?${parametros.toString()}`}`

    // `${baseUrl}${endpoint}${params ? `?amount=5${categoryQuery}${difficultyQuery}${typeQuery}` : ''}`
  )
    .then(res => res.json())
    .then(data => data)
}

export default api
