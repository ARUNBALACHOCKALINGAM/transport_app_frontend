import React,{useContext,useEffect, useState} from "react"
import StateContext from "../StateContext";
import Card from '@mui/material/Card';
import { Button } from "@mui/material";
import Dispatchcontext from "../DispatchContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Requests() {
  
  const navigate = useNavigate();
  const [details,setDetails] = useState();
  const appState = useContext(StateContext);
  const appDispatch = useContext(Dispatchcontext);
  const handleLogout = () =>{
    appDispatch({ type: "logout"});
    navigate('/');
  }

  const handleClick = (event) =>{
         event.preventDefault();
         navigate(`/details/${event.target.id}`);
  }

  useEffect(()=>{
     const fetchresults= async ()=>{
        const response= await axios.get('/orders');
        setDetails(response.data);
     }
     fetchresults();
  },[])
  

console.log(details);

  return (
    <>
    <h2>REQUESTS</h2>
   
    {details===undefined ? "" : (  
      details.map((detail)=>{
          return (   
            <Card elevation={4} style={{minWidth:"400px"}}>
                    <div style={{display:"flex",justifyContent:"space-around",margin:"5px"}}>
                    <h4>Name:{detail.name}</h4>
                    <h4>Source:{detail.source}</h4>
                    <h4>Destination:{detail.destination}</h4>
                    <h4>Goodstype: {detail.goodstype}</h4>
                    <h4>Status: {detail.status}</h4>
                    <Button id={detail.orderno}  onClick={handleClick}>more details</Button>
                    </div>
            </Card>
 
      )
      })
 
    )}
   
    <Button onClick={handleLogout} style={{marginTop:"100px"}} variant='contained'>
            Logout
          </Button>
    </>
  )
}

export default Requests