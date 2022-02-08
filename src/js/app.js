
import axios from "axios";

import "../css/styles.css";

import video1 from '../video/Table.mp4'
import video2 from '../video/TableDesktop.mp4'


// MEDIA QUERRIES FOR VIDEO

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



// FUNCTION TO LOAD DATA FROM 'openlibrary.org'


document.querySelector('#searchBtn').addEventListener('click', searchBooks); //add search book function

// ---------------------function to load book data and show output on screen------------------------
async function searchBooks() {
  
  //remove header display to show books output when user click
  let header = document.querySelector('header');
  header.style.display='none'
  //---

  //add first container where to append book 
  let listContainer = document.getElementById('list-container');
  listContainer.innerHTML =`
  <i id="home" class="fa fa-home"> Back Home</i> 
  <div class="row row-cols-auto book-list" id="book-list"></div>
  `
  //---
  
  //use input value to load api, after send to screen all book list found
  let input = document.querySelector('#searchInp').value.toLowerCase().replace(/\s/g, ''); //take value from input
  const response = await axios.get(`https://openlibrary.org/subjects/${input}.json?details=true`)
  const data = await response.data;
  
  //creating a container for each book and another container that shows description
  await data.works.forEach(book => {
      
    //info-button to show description about book
      let infoBtn = document.createElement('a');
      infoBtn.id = "btn-details";
      infoBtn.href = 'javascript:void(0)';
      infoBtn.innerHTML=`<button><i class="fa fa-info"></i></button>`
    
    //book-container with title and description
      let auth = ''
      book.authors.forEach(author => {auth += author.name}) //take list of author
      
      let bookContainer = document.createElement('div')
      bookContainer.classList.add("all-book-container-2");
      bookContainer.innerHTML +=`              
      <div class="title">
      <h1>${book.title}</h1>
      </div>
      <div class="author">
      <p>Authors:`+ auth + ` .</p>    
      </div>`
      
    //append button and book container to another container
      let bookBtnContainer = document.createElement('div');
      bookBtnContainer.classList.add("col-lg-4","book-btn-container");
      bookBtnContainer.append(bookContainer);
      bookBtnContainer.append(infoBtn)
    
      // append bookBtnContainer
      document.getElementById('book-list').append(bookBtnContainer); 

      //function to show description  
      [bookContainer,infoBtn].forEach(elem => {
                              elem.addEventListener('click', async()=>{
                                 let description='';
                                 const response = await fetch(`https://openlibrary.org${book.key}.json`)
                                 const data = await response.json();
                          
                            try{
                                 description += `    
                                              <div class="popup" id="popup-container">
                                                <div class="container-sm details-container">
                                                    <div class="title-details">
                                                      <h1>Description</h1>
                                                    </div>
                                                    <div class="description">
                                                      <p>${data.description.value ? data.description.value : data.description}</p>
                                                    </div>
                                                </div>
                                                <button id="close-popup"><i class="fa fa-times-circle"></i></button>
                                              </div>
                                              `;
                                 document.getElementById('info').innerHTML = description;
                          } 
                   
                      catch(err){
                                 if (err instanceof TypeError) {
                                     alert('Sorry! No description found')
                                 } else {
                                     throw err; 
                                   }
                      }
                          
                                //close description
                                const popupContainer = document.getElementById('popup-container');
                                const closePopup = document.getElementById('close-popup');
                                closePopup.addEventListener('click', ()=>{
                                                      popupContainer.classList.add('hidden');
                                                      });
                            })
      })
  });

  // if user search a empty string
  if(input.value == ''){
    return false
  }

  // if book dosn't exist
  let bookList = document.getElementById('book-list');
        if(bookList.innerHTML == ''){
        bookList.innerHTML = `<h3><b>Sorry! No books founds</b></h3>`;
        } 
  
  // when user want to search another book
  let home = document.getElementById("home") 
        home.addEventListener('click',()=>{
        header.style.display='inherit';
        listContainer.innerHTML=''
        })
};



