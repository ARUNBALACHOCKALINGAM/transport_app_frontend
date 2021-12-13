import * as React from 'react';
import StateContext from '../StateContext';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dispatchcontext from '../DispatchContext';


export default function AddressForm(props) {
  
  const appDispatch = React.useContext(Dispatchcontext);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstname"
            name="firstName"
            onChange={(e)=>{
             props.onChange(e.target.id,e.target.value);
            }}
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            // value={props.sendersDetails.firstname}
            // onChange={(e)=>{
            //   setData({...data,lastname:e.target.value});
            // }}
            id="lastname"
            name="lastName"
            onChange={(e)=>{
              props.onChange(e.target.id,e.target.value);
             }}
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            // value={data.address}
            // onChange={(e)=>{
            //   setData({...data,address:e.target.value});
            // }}
       
            id="address"
            onChange={(e)=>{
              props.onChange(e.target.id,e.target.value);
             }}
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            // value={data.city}
            // onChange={(e)=>{
            //   setData({...data,city:e.target.value});
            // }}
            
            id="city"
            onChange={(e)=>{
              props.onChange(e.target.id,e.target.value);
             }}
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            // value={data.state}
            // onChange={(e)=>{
            //   setData({...data,state:e.target.value});
            // }}
            onChange={(e)=>{
              props.onChange(e.target.id,e.target.value);
             }}
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            // value={data.zipcode}
            // onChange={(e)=>{
            //   setData({...data,zipcode:e.target.value});
            // }}
            id="zipcode"
            onChange={(e)=>{
              props.onChange(e.target.id,e.target.value);
             }}
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            // value={data.country}
            // onChange={(e)=>{
            //   setData({...data,country:e.target.value});
            // }}
            id="country"
            onChange={(e)=>{
              props.onChange(e.target.id,e.target.value);
             }}
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            // value={data.goodstype}
            // onChange={(e)=>{
            //   setData({...data,goodstype:e.target.value});
            //   appDispatch({ type: "sendersdetails",data:data})
            // }}
            id="goodstype"
            onChange={(e)=>{
              props.onChange(e.target.id,e.target.value);
             }}
            name="goods"
            label="Goods details"
            fullWidth
            autoComplete="shipping goods"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}