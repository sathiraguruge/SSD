import axios from 'axios'

export default class APIService {
    constructor() {
        this.baseUrl = "http://localhost:3000/";
    }

    get(url) {
        return new Promise((resolve, reject) => {
            axios.get(this.baseUrl + url).then(response => {
                resolve(response);
            }).catch(err => {
                resolve(err);
            });
        });
    }

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
