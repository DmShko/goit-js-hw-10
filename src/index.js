import {fetchBreeds, fetchCatByBreed} from './cat-api.js';
import Notiflix from 'notiflix';

const elementSet = {
    selectElement: document.querySelector('.breed-select'),
    infoElement: document.querySelector('.cat-info'),
    successTextElement: document.querySelector('.loader'),
    errorTextElement: document.querySelector('.error'),
}

// start settings
elementSet.selectElement.style.width = "150px";
elementSet.selectElement.style.display = "none";
elementSet.errorTextElement.style.display = "none";
elementSet.infoElement.style.display = "flex";
elementSet.infoElement.style.flexDirection = "row";
elementSet.infoElement.style.gap = "20px";

elementSet.successTextElement.style.position = "absolute";
elementSet.successTextElement.style.left = "50vw";
elementSet.successTextElement.style.top = "300px";

function newSettings() {
    const textBlock = document.querySelector('[name="text-block"]');
    const titleDes = document.querySelector('[name="des"]');
    const titleTemp = document.querySelector('[name="temp"]');
    const textTemp = document.querySelector('[name="text-temp"]');
    
    textBlock.style.display = "flex";
    textBlock.style.flexDirection = "column";

    titleDes.style.fontSize = "24px";
    titleDes.style.fontWeight = "700";
    titleDes.style.fontWeight = "bold";
    titleDes.style.marginBottom = "10px";
   
    titleTemp.style.fontWeight = "bold";

    textTemp.style.marginTop = "20px";
}

fetchBreeds().then(responce => {

    elementSet.selectElement.style.display = "block";
    elementSet.successTextElement.style.display = "none";
    elementSet.errorTextElement.style.displey = "none";
  
    // add 'options' element to 'select'
    const newOptList = responce.data.reduce((elements, { id, name }) => {
        return elements + `<option value=${id}>${name}</options>`;
    })
    elementSet.selectElement.insertAdjacentHTML('beforeend', newOptList);
    
}).catch(() => {

    elementSet.successTextElement.style.display = "none";
    elementSet.errorTextElement.style.visibility = "visible";
 } 
);

function getBrred (evt) {

    elementSet.successTextElement.style.display = "block";
    elementSet.infoElement.style.display = "none";

    fetchCatByBreed(evt.target.value).then(responce => {
       
        elementSet.successTextElement.style.display = "none";
        elementSet.infoElement.style.display = "flex";
    
        elementSet.infoElement.innerHTML = ""; 
        
        // my error
        if(responce.hasOwnProperty("data") && responce.data.length === 0)  
            throw new Error("Breed array is empty!");

        const { url, breeds } = responce.data[0]
        const { description, temperament, name} = breeds[0]
        

        elementSet.infoElement.innerHTML = `
        <img src=${url} width="300" hight="250">
        </img> 
        <div name="text-block">
            <p1 name="des">${name}</p1>
            <a>${description}</a>
            <a name="text-temp"><span name="temp">Temperament: </span>${temperament}</a>
        </div>`;
        newSettings();
        
    }).catch(error => {

        elementSet.successTextElement.style.display = "none";
        elementSet.errorTextElement.style.visibility = "visible";
        Notiflix.Notify.warning(error.message);
     } 
    );
};

elementSet.selectElement.addEventListener('change', getBrred);