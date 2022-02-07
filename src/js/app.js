
import axios from "axios";

import "../css/styles.css";

import video1 from '../video/Table.mp4'//-!file-loader!
import video2 from '../video/TableDesktop.mp4'
// async function to search book on input bar
document.querySelector('#searchBtn').addEventListener('click', searchBooks);

  async function searchBooks() {

  let input = document.querySelector('#searchInp').value.toLowerCase().replace(/\s/g, ''); //take value from input
  let header = document.querySelector('header');
  let listContainer = document.getElementById('list-container');

//use input value to load api, after send to screen all book list found
  const response = await axios.get(`https://openlibrary.org/subjects/${input}.json?details=true`)
  const data = await response.data;
  let output = '';
  await data.works.forEach(book => {
      		output += `
          <div class="col-lg-4 book-btn-container">
          <div class="all-book-container-2" onclick="detailsBook('${book.key}')">
              <div class="title">
                <h1>${book.title}</h1>
              </div>
              
              <div class="author">
                <p>Authors: ` ;
                book.authors.forEach(author => {output += `${author.name}. `});
                output +=`</div>
           </div>
          <a id="btn-details" onclick="detailsBook('${book.key}')" href="javascript:void(0)"><button><i class="fa fa-info"></i></button></a>
          </div>`;
        });
         header.style.display='none'
         listContainer.innerHTML =`
         <i id="home" class="fa fa-home"> Back Home</i> 
         <div class="row row-cols-auto book-list" id="book-list">${output}</div>
         ;`
        
      
        // if book didn't found then..
        let bookList = document.getElementById('book-list');
        if(output == ''){
        bookList.innerHTML = `<h4><b>Sorry! No books founds</b></h4>`;
        } 
      
        let home = document.getElementById("home") 
        home.addEventListener('click',()=>{
        header.style.display='inherit';
        listContainer.innerHTML=''
        })
      
}




 
//-----------------------------------------CATEGORIES---------------------------------------------




let videoTag = document.getElementById('video')
if(window.screen.width < 840){
  let source = document.createElement("source")
  source.src = "./video/Table.mp4"
  source.type = "video/mp4"
  videoTag.append(source);
}else{
  let source = document.createElement("source")
  source.src = "./video/TableDesktop.mp4"
  source.type = "video/mp4"
  videoTag.append(source);
}