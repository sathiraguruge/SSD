//add relevant imports
import APIService from './APIService'

//initialize Google Service class in order to access GData
export default class GoogleService {
    //default constructor
    constructor() {
        this.apiService = new APIService();
    }

    //file upload functionality
    uploadFile(file) {
        //getting access token generated according to the authorization request
        const token = localStorage.getItem('Token');
        const h = {}; //headers
        let data = new FormData();
        //token
        data.append('token', token);
        //image file to be uploaded
        data.append('file', file);
        h.Accept = 'application/json'; //if you expect JSON response

        //post the JSON object with token and image file to the specified URL
        fetch('http://localhost:3000/api/drive', {
            method: 'POST',
            headers: h,
            body: data
            // success message
        }).then(response => {
            alert('Image Added Successfully')
        }).catch(err => {
            console.log(err)
        });
    }
}