import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const loaderText = document.querySelector('.loader');
const errorText = document.querySelector('.error');
const selectCat = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

loaderText.style.display = 'block'
errorText.style.display = 'none'
selectCat.style.cursor = 'pointer'

function makeHtmlSelectOptions (data) {
    const cats = data.forEach(cat=> {
        const markup = `<option value=${cat.id}>${cat.name}</option>`;
        selectCat.insertAdjacentHTML("afterbegin", markup);
    })
}

fetchBreeds().then(data=> {
    
    loaderText.style.display = 'none'
    makeHtmlSelectOptions(data);
    new SlimSelect({
        select: '.breed-select'
      })

}).catch(error=> {
    Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!")
    console.log(error)
})


function makeHtmlCatInfo (data) {
    const cat = data[0];
    const catHtml = `
    <img src="${cat.url}" alt="Cat Image" width="300">
    <h2>${cat.breeds[0].name}</h2>
    <p>${cat.breeds[0].description}</p>
    <p>Temperament: ${cat.breeds[0].temperament}</p>`;
    catInfo.innerHTML = catHtml;
}


selectCat.addEventListener('change', ()=> {
    loaderText.style.display = 'block'
    errorText.style.display = 'none'
   
    selectCat.style.cursor = 'pointer'
    
    const selectedBreedId = selectCat.value;

   
    catInfo.style.display = 'none'

    fetchCatByBreed(selectedBreedId).then(data=> {
        
        loaderText.style.display = 'none'
        catInfo.style.display = 'block'
        makeHtmlCatInfo (data)

    })
    .catch(error=> {
        Notiflix.Notify.failure(error, "Oops! Something went wrong! Try reloading the page!")
          
    });
    
})

