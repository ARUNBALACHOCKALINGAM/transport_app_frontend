import * as React from 'react';
import StateContext from '../StateContext';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import DestinationForm from './DestinationForm';
import Review from './Review';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dispatchcontext from '../DispatchContext';
axios.defaults.baseURL="https://transportapp-backend.herokuapp.com"





const theme = createTheme();

export default function Checkout() {

const steps = ['Shipping address', 'Destination details', 'Review your order'];
const appState = React.useContext(StateContext);


const [sendersDetails,setSendersDetails]=React.useState({firstname:"",
lastname:"",
address:"",
city:"",
state:"",
zipcode:"",
country:"",
goodstype:"",})

const [reciversDetails,setReciversDetails]=React.useState({    firstname:"",
  lastname:"",
  address:"",
  city:"",
  state:"",
  zipcode:"",
  country:"",
  goodstype:"",})

function handleChange(id,data){
  setReciversDetails({...reciversDetails,[id]:data})
  console.log(reciversDetails);
}

function handleaddressChange(id,data){
   setSendersDetails({...sendersDetails,[id]:data})
   console.log(sendersDetails);
}


function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm onChange={handleaddressChange}/>;
    case 1:
      return <DestinationForm onChange={handleChange}/>;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

  const appDispatch = React.useContext(Dispatchcontext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [Id,setId] = React.useState(0);
  
  const navigate = useNavigate();

  const handleNext = async (event) => {
      
      if(sendersDetails===null){
        appDispatch({type:"flashMessage",value:"Can't be empty"})
      }
      if(activeStep==2){
        const res=await axios.post('/create',{sendersDetails:sendersDetails,recieversDetails:reciversDetails});
        setId(res.data);
      }
  

    setActiveStep(activeStep+1);
 
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleLogout = () =>{
    appDispatch({ type: "logout"});
    navigate("/")
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
          <Button onClick={handleLogout} style={{marginLeft:"100px"}} variant='contained'>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{zIndex:"-10"}} component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length  ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is {Id}. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
     
      </Container>
    </ThemeProvider>
  );
}