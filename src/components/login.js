import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import Cookie from './cookie';
import docker from '../images/docker.png'

let BASE_URL = '';
class Login extends Component {
    componentDidMount() {
        document.title = "Swarm Visualizer | Login"
    }

    state = {
        email: '',
        password: '',
        showPassword: false,
        openSnackbar: false,
        typeSnackbar: '',
        msgSnackbar: '',
        loading: false
    }

    sendData = (e) => {
        e.preventDefault();
        let email = this.state.email;
        let password = this.state.password;
        let data = { "email": email, "password": password };
        data = JSON.stringify(data);
        this.setState({ loading: true });
        let type, msg;
        axios.post(BASE_URL + '/auth/verifyUser', data, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                msg = response.data.message;
                if (response.data.code === 0) {
                    type = 'success';
                    let cookie = response.data.cookies.CP;
                    Cookie.setCookie('CP', cookie);
                    this.setState({ openSnackbar: true, typeSnackbar: type, msgSnackbar: msg, firstLogin: response.data.firstLogin });
                }
                else {
                    type = 'error';
                    this.setState({ openSnackbar: true, typeSnackbar: type, msgSnackbar: msg })
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
                type = 'error';
                msg = 'Could not login. Please refresh and try again';
                // console.log(type,msg);
                this.setState({ openSnackbar: true, typeSnackbar: type, msgSnackbar: msg })
            }.bind(this));
        // this.setState({loading: false});
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    onClose = () => {
        this.setState({ openSnackbar: false, loading: false });
        // if (Cookie.getCookie('')) {
        //     this.props.history.push('/dashboard');
        // }
    }

    render() {
        let vertical = 'top';
        let horizontal = 'center';
        return (
            <div>
                <Paper className="paper login-paper">
                    <div className="center-vert center-hor">
                    <img src={docker} alt="Docker" className="brand-img mright-half" />
                    <Typography variant="title" className="">Swarm Visualizer</Typography><br/><br/>
                    </div><br/><br/>
                    <Typography component="h3" className="c-align">Login to continue</Typography>
                    <form className="c-align login-form" onSubmit={this.sendData}>
                        <TextField required id="standard-required" label="Email" className="f-width"
                            margin="normal" onChange={this.handleChange('email')} /><br />
                        <FormControl className="f-width">
                            <InputLabel htmlFor="adornment-password">Password</InputLabel>
                            <Input id="adornment-password" type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword} >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl><br /><br /><br /><br />
                        {/* <div className="left-align">
                            <NavLink to="/forgotpassword" className="navlink">
                                <Typography className="text-trans color-theme f-bold btn-padding">Forgot Password ?</Typography>
                            </NavLink>
                        </div><br /> */}
                        <div className="signup-btn-div">
                            {/* <NavLink to="/signup" className="navlink">
                                <Button className="text-trans color-theme f-bold">Create account</Button>
                            </NavLink> */}
                            {!this.state.loading &&
                                <Button type="submit" size="medium"
                                    className="signup-form-btn text-trans pos-absolute">Login</Button>
                            }
                            {this.state.loading &&
                                <div className="center-vert">
                                    <Button disabled={this.state.loading} type="submit" size="medium"
                                        className="pos-absolute text-trans">Login</Button>
                                    <CircularProgress className="color-theme" size={24} />
                                </div>
                            }
                        </div>
                    </form>
                </Paper>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={this.state.openSnackbar}
                    message={this.state.msgSnackbar}
                    autoHideDuration={4000}
                    onClose={this.onClose}
                />
            </div>
        );
    }
}

export default Login;