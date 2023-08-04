import axios from "axios";

export function fetchBreeds() {
    axios.defaults.headers.common["x-api-key"] = "live_TigvCqcTlTd4c51aeWgfanqzHss3JGKnyy7NTrBPUf55EREpsyLLphgPuu0az52J";
    return axios.get('https://api.thecatapi.com/v1/breeds').then(responce => {
        return responce;
    });
}

export function fetchCatByBreed(breedId){
    axios.defaults.headers.common["x-api-key"] = "live_TigvCqcTlTd4c51aeWgfanqzHss3JGKnyy7NTrBPUf55EREpsyLLphgPuu0az52J";
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`).then(responce => {
        return responce;
    });
}