//add relevant imports
import axios from 'axios'

//initialize API Service class
export default class APIService {
    constructor() {
        //initialize the base url to run on port 3000
        this.baseUrl = "http://localhost:3000/";
    }

    //access the defined url
    get(url) {
        return new Promise((resolve, reject) => {
            axios.get(this.baseUrl + url).then(response => {
                resolve(response);
            }).catch(err => {
                resolve(err);
            });
        });
    }

    //post data on the defined url
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(this.baseUrl + url, data).then(response => {
                resolve(response);
            }).catch(err => {
                resolve(err);
            });
        });
    }
}
