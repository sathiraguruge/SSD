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
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Link from "@material-ui/core/Link";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword1: '',
            visibleModal: false,
            visibleProfileModal: false,
            image: null,
            url: '',
            progress: 0,
            barVisibleFlag: false
        };
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    render() {
        const profile = JSON.parse(localStorage.getItem('Profile'));
        const cards = [1, 2, 3];

        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <CameraIcon className="" />
                        <Typography variant="h6" color="inherit" noWrap>
                            Play Tech Gallery
                        </Typography>

                        <div style={{
                            display: 'flex', justifyContent: 'right', alignSelf: 'flex-end'
                        }}>
                            <GoogleLogout
                                clientId="422221100383-ekq8mird13g7g6cjlu6l7kpnmi8su9ij.apps.googleusercontent.com"
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
                                            src={this.state.image || 'http://vlabs.iitb.ac.in/vlabs-dev/labs_local/machine_learning/labs/exp11/images/no_img.png'}
                                            alt="Uploaded images" height="300"
                                            width="400" className="profilePicture"/>
                                        <input type="file" onChange={this.handleChange} className="btn btn-info"
                                               style={{marginLeft: "30px"}} accept="image/*"/>
                                        <Button variant="contained" color="primary" onClick={() => {
                                            const token = localStorage.getItem('Token');
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