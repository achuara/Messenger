import {makeStyles} from '@material-ui/core/styles';

import {deepPurple} from '@material-ui/core/colors';

export default makeStyles((theme) =>({

appBar: {

borderRadius: 15,

margin: '0px 0px 20px 0px',

display: 'flex',

flexDirection: 'row',

justifyContent: 'space-between',

alignItems: 'center',
padding: '10px 50px',
},
appBar1: {

    borderRadius: 15,
    
    margin: '0px 0px 20px 0px',
    
    display: 'flex',
    
    flexDirection: 'row',
    
    justifyContent: 'space-between',
    
    alignItems: 'center',
    padding: '10px 10px',
    },
heading: {

color: 'rgba(0,183,255, 1)',

textDecoration: 'none',
},
image: {

marginleft: '15px',
},
toolbar: {

display: 'flex',

JustifyContent: 'flex-end',
 width: '300px',
},
toolbar1: {

    display: 'flex',
    flexDirection: 'column',
    JustifyContent: 'flex-end',
     width: '190px',

     height: '130px',
  
  position: 'absolute',

  border: '3px solid gainsboro',
  backgroundColor: 'white',
  marginLeft: '40%',
    },
profile:{
    display: 'flex',

justifyContent: 'space-between',

width: '300px',
},
profile1:{
    display: 'flex',

justifyContent: 'space-between',

width: '200px',
},
profile2:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: '20px',
    width: '150px',
},
profile3:{
    display: 'flex',

justifyContent: 'space-between',
marginTop: '10px',
width: '150px',
},
userName: {

display: 'flex', 
alignItems: 'center',
}, 
brandContainer: { 
display: 'flex',
alignItems: 'center',
marginleft: '-10px',
},
purple: {

color: theme.palette.getContrastText(deepPurple[500]),
 backgroundColor:deepPurple[500],
},
}
)
);

