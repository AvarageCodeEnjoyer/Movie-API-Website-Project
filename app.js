const container = document.querySelector('.container')

const apiKey = "k_a8qnb1bc"
let movieArr = []
let searchData, searchTerms

class movieDiv {
  constructor(image, title, release, description) {
    this.image = image
    this.title = title
    this.release = release
    this.description = description
  }

  addMovie() {
    return `
    <div class="movie">
      <img src="${this.image}" alt="${this.image}">
      <div class="info">
        <p><b>Title: </b>${this.title}</p>
        <p><b>Release: </b>${this.release}</p>
        <p><b>Description: </b>${this.description}</p>
      </div>
    </div>`
  }
}

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
    console.table(data.results)
    data.results.forEach( item => {
      // Cut the release date from the beginning of the description and make it a variable
      let image = item.image
      let title = item.title
      let release = item.description.substring(0, 4)
      let description = item.description.substring(4)
      // Create a new class instance to make the structure of the html div with information passed in
      let createDiv = new movieDiv(image, title, release, description)
      container.innerHTML += createDiv.addMovie()
      movieArr.push(createDiv)
    })
  })
}

getData()