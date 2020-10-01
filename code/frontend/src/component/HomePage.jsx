import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";
import {GoogleLogout} from "react-google-login";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import GoogleService from '../service/GoogleService'

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            imagePreviewUrl: null
        };
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);

        this.googleService = new GoogleService();
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleChange(e) {
        this.setState({
            image: URL.createObjectURL(e.target.files[0])
        })
    };

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                image: file,
                imagePreviewUrl: reader.result
            });
        };
        reader.readAsDataURL(file)
    }


    handleUpload(e) {
        this.googleService.uploadFile(this.state.image)
    };

    render() {
        const profile = JSON.parse(localStorage.getItem('Profile'));
        return (
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="relative">
                    <Toolbar>
                        <CameraIcon className=""/>
                        <Typography variant="h6" color="inherit" noWrap>
                            Play Tech Gallery
                        </Typography>

                        <div style={{
                            display: 'flex', justifyContent: 'right', alignSelf: 'flex-end'
                        }}>
                            <GoogleLogout
                                clientId="921424005912-gto8ohqq1vkihpjsjrpvbre81efhtntd.apps.googleusercontent.com"
                                buttonText="Logout"
                                onLogoutSuccess={() => {
                                    localStorage.clear();
                                    window.location.href = "/";
                                }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <main>
                    {/* Hero unit */}
                    <div className="">
                        <Container maxWidth="sm">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Hi {profile.givenName} !
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                Please choose a Photo to upload to Play Tech gallery
                            </Typography>
                            <div className="">
                                <Grid container spacing={2} justify="center">
                                    <Grid item>
                                        <img
                                            src={this.state.imagePreviewUrl || 'http://vlabs.iitb.ac.in/vlabs-dev/labs_local/machine_learning/labs/exp11/images/no_img.png'}
                                            alt="Uploaded images" height="300"
                                            width="400" className="profilePicture"/>
                                        <input type="file" onChange={this.handleImageChange} className="btn btn-info"
                                               style={{marginLeft: "30px"}} accept="image/*"/>
                                        <Button variant="contained" color="primary" onClick={() => {
                                            this.handleUpload()
                                        }}>
                                            Upload a Photo
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}