import {fetchBreeds, fetchCatByBreed} from './cat-api.js';

const elementSet = {
    selectElement: document.querySelector('.breed-select'),
    successTextElement: document.querySelector('.loader'),
    errorTextElement: document.querySelector('.loader'),
}

startSet();

// start settings
function startSet() {
    elementSet.selectElement.style.width = "150px";
}

fetchBreeds().then(responce => {
    console.log(responce);
    responce.data.map(result => {
        let newOpt = document.createElement('option');
        newOpt.getAttribute('value', result.id);
        newOpt.textContent = result.name;
        elementSet.selectElement.appendChild(newOpt);
    });
}).catch(
    
);


const getBrred = function(evt) {
    fetchCatByBreed().then(responce => {
       
    }).catch(
    
    );
};

elementSet.selectElement.addEventListener('change', getBrred);