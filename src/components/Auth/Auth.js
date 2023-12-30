import React, { useState } from 'react';

import {Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core' ;
import useStyles from './styles';
import Input from './Input';
import { signin, signup, googleauth } from '../../actions/auth';

import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
//import axios from "axios";


import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//import { applyMiddleware } from 'redux';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };


const Auth = () => {
    const classes = useStyles();

const [showPassword, setShowPassword] = useState(false);
const [isSignup, setIsSignup] = useState(false);
const [formData, setFormData] = useState(initialState);
const dispatch = useDispatch();
const history = useNavigate();


const handleShowPassword =()=> setShowPassword((prevShowPassword) => !prevShowPassword);


const handleSubmit = (e)=>{

        e.preventDefault();

        if (isSignup) {
        
            dispatch(signup(formData, history));
            
        
        } else {
        
            dispatch(signin(formData, history));
        }
};

const handleChange= (e)=> {
    setFormData({...formData, [e.target.name]: e.target.value });
};

const switchMode = ()=> {
    setIsSignup((prevIsSignup) => !prevIsSignup); 
    setShowPassword(false);
};

return (
 
<Container component="main" maxWidth="xs">
<Paper className={classes.paper} elevation ={3}>
    
    <Avatar className={classes.avatar}>
    
    <LockOutlinedIcon />
    
    </Avatar>
   
    
    
    <Typography variant ="h5">{isSignup? 'Sign Up': 'Sign In'}</Typography> 
    <form className={classes.form} onSubmit= {handleSubmit}> 
         <Grid container spacing={2}> 
         { isSignup && (
           <>
            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half  />
            <Input name="lastName" label="last Name" handleChange ={handleChange}  half />
            </>
         )}
            <Input name="email" label="Email Address" handleChange ={handleChange} type="email"  />
            <Input name ="password" label="Password" handleChange={handleChange} 
                type= {showPassword ? 'text' : 'password'} 
                handleShowPassword ={handleShowPassword}
             />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type ="password" />}
        
            </Grid>

            <Button type="submit" fullWidth variant ="contained" color ="primary" className ={classes.submit} >
            {isSignup ? 'Sign Up' : 'Sign In'}
           </Button>

           <Button  variant ="contained"  className ={classes.googleButton} >
           <GoogleOAuthProvider  clientId="1074256558585-2v85ggb21qje9gipkqhll0ru8fjtsclm.apps.googleusercontent.com">
                <GoogleLogin
                onSuccess={credentialResponse => {
                    var decoded = jwt_decode(credentialResponse.credential);
                    //console.log(decoded);

                    const formData = { email:decoded.email,
                                     name: decoded.name
                    };
                    dispatch(googleauth(formData, history));
                   

                    /*const getFriends = async () => {
                        const res = await axios.post("/user/googleAuth",  result);
                        console.log("google auth result from server");
                        console.log(JSON.parse(localStorage.getItem('profile')));
                        console.log(res.data);
                        console.log("google auth result from server");
                        localStorage.setItem('profile', JSON.stringify({...res.data}));
                        console.log(JSON.parse(localStorage.getItem('profile')));
                        console.log("google auth result from server");
                    };
                    getFriends();*/
                    
                    // add to local storage
                    //history('/');
                
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                />    
        
            </GoogleOAuthProvider>
            </Button>
            
          


            

                <Grid container justify ="flex-end">
                    <Grid item>
                    <Button onClick={switchMode}>
                     { isSignup ? 'Already have an acccount? Sign In' : "dont't have account ? Sign up"}
                    </Button>
                    </Grid>
                </Grid>

    </ form>
</ Paper>
</Container>
);
 };
export default Auth;  
