import React from 'react';
import {TextField, Grid, InputAdornment, IconButton} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import Visibilityoff from '@material-ui/icons/VisibilityOff';

const Input =({name, handleChange, label, half,
   autofocus, type, handleShowPassword }) =>(

  <Grid item xs={12} sm={half? 6 : 12}>

    <TextField

      name={name}
      
      onChange={handleChange}
      
      variant ="outlined"
      
      required 
      
      fullWidth
      
      label={label}
      
      autoFocus ={autofocus}
      
      type={type}
      
      InputProps= {name ==='password' ? {
      
          endAdornment: (
      
            <InputAdornment position="end">
             <IconButton onClick={handleShowPassword}>
                {type ===  'password' ? <Visibility />: <Visibilityoff />}
              </IconButton>
            </InputAdornment>
      ) ,
      }: null}
      
    />
  </Grid>
);
export default Input;