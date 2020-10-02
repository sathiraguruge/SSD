import APIService from './APIService'

export default class GoogleService {
    constructor() {
        this.apiService = new APIService();
    }

    uploadFile(file) {
        const token = localStorage.getItem('Token');
        const h = {}; //headers
        let data = new FormData();
        data.append('token', token);
        data.append('file', file);
        h.Accept = 'application/json'; //if you expect JSON response

        fetch('http://localhost:3000/api/drive', {
            method: 'POST',
            headers: h,
            body: data
        }).then(response => {
            alert('Image Added Successfully')
        }).catch(err => {
            console.log(err)
        });
    }
}