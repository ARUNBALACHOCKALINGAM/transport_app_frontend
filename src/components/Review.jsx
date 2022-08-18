import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL="https://transportapp-backend.herokuapp.com"

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];




export default function Review() {

  const activeStep =2;
  const [details,setDetails] = React.useState();
  const [addresses,setAddress] = React.useState([]);
  const [payments,setPayments] = React.useState([]);


  const { id } = useParams();
  console.log(id);

  const handleBookorder = async ()=>{
    const res=await axios.post('/changestatus',{id});
  }


  React.useEffect(()=>{
    const fetchresults = async ()=>{
          const res= await axios.post('/getsingleorder',{id});
          console.log(res.data);
          if(res.data){
          setDetails(res.data);
          setAddress([res.data.sendersDetails.address,res.data.sendersDetails.city,res.data.sendersDetails.state,res.data.sendersDetails.zipcode,res.data.sendersDetails.country]);
          setPayments([{name: res.data.recieversDetails.firstname, detail: res.data.recieversDetails.address}]);
          }
    }
    fetchresults();

  },[])



  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{details === undefined || details===null ? "" : details.sendersDetails.firstname}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Destination details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          
        </Grid>
      </Grid>
     
    </React.Fragment>
  );
}