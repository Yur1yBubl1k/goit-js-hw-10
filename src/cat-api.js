import Notiflix from 'notiflix';



export function fetchBreeds() {
    const url = 'https://api.thecatapi.com/v1/breeds';   
  return fetch(url).then(response => response.json());
  }

  export function fetchCatByBreed(breedId) {
    const api_key = "live_vKHLYXpTMMrCDzRDlFNFPH8EzcVTR4Mr6oriGMeASnDRekm6E3kJopGhheUEsapq";

    const urlImg = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    
    return fetch(urlImg, { headers: { 'x-api-key': api_key } }).then(response => response.json())
    
}      