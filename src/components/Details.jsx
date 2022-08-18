import * as React from 'react';
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
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Dispatchcontext from '../DispatchContext';
axios.defaults.baseURL="https://transportapp-backend.herokuapp.com"




const theme = createTheme();

export default function Checkout() {
const activeStep=2;
const appDispatch = React.useContext(Dispatchcontext);
const navigate=useNavigate();

const {id} = useParams();
console.log(id);

function handleBack(){
  navigate('/');
}

const handleBookorder = async ()=>{
  const res=await axios.post('/changestatus',{id});
  appDispatch({type:"flashMessage",value:"Order booked successfully"})
  navigate('/');
}

const handleDeleteorder = async ()=>{
  const response=await axios.post('/deleteorder',{id});
  appDispatch({type:"flashMessage",value:"Order deleted successfully"})
  navigate('/');
}



  
const steps = ['Shipping address', 'Destination details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <DestinationForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
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
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
           Order Details
          </Typography>
         
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
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
                    sx={{ mt: 3, ml: 1 }}
                    onClick={handleDeleteorder}
                  >
                    Delete order
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    onClick={handleBookorder}
                  >
                    Book order
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