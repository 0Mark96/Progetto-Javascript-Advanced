
import axios from "axios";
import style from "./main.css"
document.querySelector('#searchBtn').addEventListener('click', searchBooks);


async function searchBooks(event) {
	
  let input = document.querySelector('#searchInp').value.toLowerCase();
  const response = await axios.get(`https://openlibrary.org/subjects/${input}.json?details=true`)
  const data = await response.data;
  let output = '';
  await data.works.forEach(book => {
      		output += `
          <div class="all-book-container">
          <div class="all-book-container-2">
              <div class="title">
                <h1>${book.title}</h1>
              </div>
              
              <div class="author">
                <p>Authors: ` ;
                book.authors.forEach(author => {output += `${author.name}. `});
                output +=`</div>
           </div>
          <a id="btn-details" onclick="detailsBook('${book.key}')" href="javascript:void(0)"><button>details</button></a>
          </div>`;
        });
      	
    document.getElementById('book-list').innerHTML = output;
    if(output == ''){
      document.getElementById('book-list').innerHTML = `<h4><b>Sorry! No books founds</b></h4>`;
    }
}

// categories 

// Search fantasy books

document.getElementById('fantasy').addEventListener('click', searchFantasyBooks);

async function searchFantasyBooks(event) {

  const response = await axios.get(`https://openlibrary.org/subjects/fantasy.json?details=true`)
  const data = await response.data;
  let output = '';
  await data.works.forEach(book => {
      		output += `
          <div class="all-book-container">
          <div class="all-book-container-2">
              <div class="title">
                <h1>${book.title}</h1>
              </div>
              
              <div class="author">
                <p>Authors: ` ;
                book.authors.forEach(author => {output += `${author.name}. `});
                output +=`</div>
           </div>
          <a id="btn-details" onclick="detailsBook('${book.key}')" href="javascript:void(0)"><button>details</button></a>
          </div>`;
        });
      	
    document.getElementById('book-list').innerHTML = output;
    if(output == ''){
      document.getElementById('book-list').innerHTML = `<h4><b>Sorry! No books founds</b></h4>`;
    }
}