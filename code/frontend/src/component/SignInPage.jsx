//add the relevant imports
import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { withAlert } from 'react-alert'
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import GoogleLogin from "react-google-login";

//initialize SignInPage component
class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    // on change state
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //render component
    render() {
        //giving alert for success or failure
        const alert = this.props.alert;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="paper">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar style={{
                            marginTop: "30px"
                        }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </div>

                    {/* Sign in component */}
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className="" noValidate>
                        {/* Email verification */}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        {/* Password verification */}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className=""
                        >
                            Sign In
                        </Button>

                        <div style={{
                            display: 'flex', justifyContent: 'center', margin: "30px"
                        }}>
                            {/* Google Login component */}
                            <GoogleLogin
                                //initialise the client id from Google developer console
                                clientId="921424005912-gto8ohqq1vkihpjsjrpvbre81efhtntd.apps.googleusercontent.com"
                                buttonText="Sign in with Google"
                                //asking for email, profile and openid scopes access
                                scope={"https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file"}
                                //success
                                onSuccess={(response) => {
                                    //setting the access token with the reveived JSON object
                                    localStorage.setItem('Token', JSON.stringify(response.tokenObj));
                                    //setting the profile with the reveived JSON object
                                    localStorage.setItem('Profile', JSON.stringify(response.profileObj));
                                    //Display the name of the user
                                    alert.info('Hello ' + response.profileObj.name, {
                                        onClose: () => {
                                            //access the protected resource
                                            window.location.href = "/homepage"
                                        }
                                    })
                                }}
                                //failure
                                onFailure={() => {
                                    alert.error('Login Failed !')
                                }}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>

                        {/* Forget Password component */}
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {'Copyright © '}
                        <Link color="inherit" href="https://material-ui.com/">
                            Play Tech
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Box>
            </Container>
        )
    };
}

export default withAlert()(SignInPage)
