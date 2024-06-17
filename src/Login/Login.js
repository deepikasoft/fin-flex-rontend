import { useState, React } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function Login() {
    const [inputs, setInputs] = useState({ name: '', pass: '' });
    const navigate = useNavigate();
    const handleChange = (event) => {
        console.log(event)
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        console.log(inputs)
        axios.post('http://localhost:5000/google-auth', {
            "email":inputs.name,
            "password":inputs.pass
        }
        
        ).then((res) => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            navigate("/userInfo")
        },
            (error) => { console.log(error) });
    }
    const responseMessage = (response) => {
        console.log(response);
        console.log(response.credential);


        axios.post('http://localhost:5000/google-auth', { user: "hello" },
            { headers: { 'Authorization': `${response.credential}` } },
        ).then((res) => {
            console.log(res.data);
            localStorage.setItem("token",res.data.token);
           navigate("/userInfo")
        },
            (error) => { console.log(error) });

    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
     <div className='container'>
   <div className='login-page'>
            <Box style={{}}
                component="form"
                noValidate
                autoComplete="off">
                <TextField id="outlined-basic" name ="name" onChange={handleChange} label="Email" variant="outlined" className='mb-3' placeholder='Email'/>
                <br />
                <TextField id="outlined-basic" name='pass' onChange={handleChange} label="Password" variant="outlined" placeholder='Password' />
                <br />
                <IconButton aria-label="fingerprint" onClick={handleSubmit} style={{ width: 50 }} color="secondary">
                    <Fingerprint />
                </IconButton>
                <br />
                <div className='google-map'>
                    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                </div>

            </Box>
        </div>
     </div>

    )
}

export default Login