
import axios from "axios";

import "../css/styles.css";

// async function to search book on input bar

document.querySelector('#searchBtn').addEventListener('click', searchBooks);

async function searchBooks(event) {
	
  let input = document.querySelector('#searchInp').value.toLowerCase().replace(/\s/g, ''); //take value from input
  
//use input value to load api, after send to screen all book list found
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

        // if book didn't found then..
        if(output == ''){
        document.getElementById('book-list').innerHTML = `<h4><b>Sorry! No books founds</b></h4>`;
      }
}

//-----------------------------------------CATEGORIES---------------------------------------------

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