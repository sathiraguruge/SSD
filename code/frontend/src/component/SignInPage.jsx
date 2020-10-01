import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {withAlert} from 'react-alert'
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import GoogleLogin from "react-google-login";

class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const alert = this.props.alert;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className="paper">
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Avatar style={{
                            marginTop: "30px"
                        }}>
                            <LockOutlinedIcon/>
                        </Avatar>
                    </div>

                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className="" noValidate>
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
                            control={<Checkbox value="remember" color="primary"/>}
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
                        <GoogleLogin
                            clientId="921424005912-gto8ohqq1vkihpjsjrpvbre81efhtntd.apps.googleusercontent.com"
                            buttonText="Sign in with Google"
                            scope={"https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file"}
                            onSuccess={ (response) => {
                                localStorage.setItem('Token', JSON.stringify(response.tokenObj));
                                localStorage.setItem('Profile', JSON.stringify(response.profileObj));

                                // var retrievedObject = localStorage.getItem('testObject');
                                //
                                // console.log('retrievedObject: ', JSON.parse(retrievedObject));

                                alert.info('Hello ' + response.profileObj.name, {
                                    onClose: () => {
                                        window.location.href = "/homepage"
                                    }
                                })
                            }}
                            onFailure={() => {
                                alert.error('Login Failed !')
                            }}
                            cookiePolicy={'single_host_origin'}
                        />
                        </div>

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
