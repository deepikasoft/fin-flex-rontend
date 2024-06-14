import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';

import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


function UserInfo() {
 

    const [formData, setFormData] = useState({ firstName: "", lastName: "", title: "", nationality: "", since: "", residanceOfUAE: true ,dob:""});
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        console.log(formData)
    };
    const handleSwitchChange = (event) => {
        setFormData((prevFormData) => ({ ...prevFormData, ["residanceOfUAE"]: event.target.checked }));
    };
    const handleSubmit = (formData)=>{
        axios.post("http://localhost:5000/persons", formData).then((res)=>{
            toast.success("Data has been saved")
            console.log(res);
           
        }).catch((error)=>{console.warn(error);toast.error("Something went wrong")});

    }

    const title = ['Ms', 'Mr', 'Mrs']
    const nationalityList = ["IN", "IO",]
    const currentYear = (new Date()).getFullYear();
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
    const since = range(currentYear, currentYear - 9, -1);


    return (
        <>
        <div><Toaster/></div>
            <div className='user-info'>
                <div className='container'>
                    <div className='heading'>
                        <h1>UserInfo</h1>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-lg-6'>
                            <div className='name-input'>
                                <TextField label="First Name"  variant="outlined" className='mb-3'
                                    id="firstName" name="firstName" value={formData.firstName} />
                                <TextField label="Last Name" variant="outlined"
                                    id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='col-12 col-lg-6'>
                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                                <InputLabel id="demo-simple-select-autowidth-label">Title</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth-label" className='mb-3'
                                    value={formData.title}
                                    onChange={handleChange}
                                    name='title'
                                    autoWidth
                                    label="Title"
                                ><MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {title.map((value) =>
                                        <MenuItem value={value} key={value}>
                                            {value}
                                        </MenuItem>)}

                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                                <InputLabel id="nationality">Nationality</InputLabel>
                                <Select
                                    labelId="nationality"
                                    id="nationality" className='mb-3'
                                    value={formData.nationality}
                                    onChange={handleChange}
                                    name='nationality'
                                    autoWidth
                                    label="Nationality"
                                ><MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {nationalityList.map((value) =>
                                        <MenuItem value={value} key={value}>
                                            {value}
                                        </MenuItem>)}

                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                                <InputLabel id="demo-simple-select-autowidth-label-Date">Since</InputLabel>
                                <Select
                                    labelId="since"
                                    id="since" className='mb-3'
                                    value={formData.since}
                                    onChange={handleChange}
                                    name='since'
                                    autoWidth
                                    label="Since"
                                ><MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {since.map((value) =>
                                        <MenuItem value={value} key={value}>
                                            {value}
                                        </MenuItem>)}

                                </Select>
                            </FormControl>
                            <TextField
                                id="dob"
                                label="Date of Birth"
                                type="date"
                                name='dob'
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <FormControlLabel control={<Switch checked={formData.residanceOfUAE}

                                onChange={handleSwitchChange}
                                name='residanceOfUAE'
                                defaultChecked />} label="Residence of UAE" className='mt-3 Residence-Of-UAE' />
                            <div className="mt-2 main-btn">
                                <button type="submit" onClick={() =>handleSubmit(formData)} className="btn btn-primary me-2">Save</button>
                                <a type="button" href='/social'  className="btn btn-secondary">Next</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UserInfo