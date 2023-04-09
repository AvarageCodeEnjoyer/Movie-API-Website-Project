const container = document.querySelector('.container')

const apiKey = "k_a8qnb1bc"
let searchData, searchTerms

function getData() {
  searchData = []
  searchTerms = document.querySelectorAll("input")
  searchTerms.forEach(data => {
    searchData.push(data.value)
  })
  console.log(searchData)
  callApi()
}

function callApi() {
  fetch(`https://imdb-api.com/en/API/SearchMovie/${apiKey}/${searchData}`)
  .then(response => response.json())
  .then(data => {
    console.log(`https://imdb-api.com/en/API/SearchMovie/${apiKey}/${searchData}`)
    console.table(data.results)
    data.results.forEach( item => {
      // Cut the release date from the beginning of the description and make it a variable
      let release = item.description.substring(0, 4)
      let description = item.description.substring(4)

      container.innerHTML += `
        <div class="movie">
          <img src="${item.image}" alt="${item.image}">
          <div class="info">
            <p><b>Title: </b>${item.title}</p>
            <p><b>Release: </b>${release}</p>
            <p><b>Description: </b>${description}</p>
          </div>
        </div>
      `
    })
    
  })
}

getData()