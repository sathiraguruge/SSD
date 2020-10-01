import APIService from './APIService'

export default class GoogleService {
    constructor() {
        this.apiService = new APIService();
    }

    //login method
    getGoogleAuthUrl() {
        return new Promise((resolve, reject) => {
            this.apiService.get("getAuthURL").then(response => {
                resolve(response);
            }).catch(error => {
                console.log(error);
            })
        })
    }

    getToken() {
        return new Promise((resolve, reject) => {
            this.apiService.get(resolve).then(response => {
                resolve(response);
            }).catch(error => {
                console.log(error);
            })
        })
    }

    uploadFile(file){
        const token = JSON.parse(localStorage.getItem('Token'));
        return new Promise((resolve, reject) => {
            this.apiService.post("fileUpload", {
                "file"  : file,
                "token" : token
            }).then(response => {
                resolve(response);
            }).catch(error => {
                console.log(error);
            })
        })
    }

    // //login method
    // getAccount(cardNo) {
    //     return new Promise((resolve, reject) => {
    //         this.apiService.get("passenger/getPassengerAccount/" + cardNo).then(response => {
    //             resolve(response);
    //         }).catch(error => {
    //             console.log(error);
    //         })
    //     })
    // }
    //
    // updateProfile(data) {
    //     return new Promise((resolve, reject) => {
    //         this.apiService.put("passenger/update", data).then(response => {
    //             resolve(response);
    //         }).catch(error => {
    //             console.log(error);
    //         })
    //     })
    // }
    //
    // addCard(cardNo, data) {
    //     return new Promise((resolve, reject) => {
    //         this.apiService.post("passenger/addCard/" + cardNo, data).then(response => {
    //             resolve(response);
    //         }).catch(error => {
    //             console.log(error);
    //         })
    //     })
    // }
    //
    // deleteCard(travelCardNo, PaymentCardNo) {
    //     return new Promise((resolve, reject) => {
    //         this.apiService.delete("passenger/deleteCard/" + travelCardNo + "/" + PaymentCardNo).then(response => {
    //             resolve(response);
    //         }).catch(error => {
    //             console.log(error);
    //         })
    //     })
    // }
    //
    // getCards(travelCardNo) {
    //     return new Promise((resolve, reject) => {
    //         this.apiService.get("passenger/getCard/" + travelCardNo).then(response => {
    //             resolve(response);
    //         }).catch(error => {
    //             console.log(error);
    //         })
    //     })
    // }
    //
    // topUp(travelCardNo, data) {
    //     return new Promise((resolve, reject) => {
    //         this.apiService.post("passenger/topUp/" + travelCardNo, data).then(response => {
    //             resolve(response);
    //         }).catch(error => {
    //             console.log(error);
    //         })
    //     })
    // }
}