import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Residential() {
    const [formData, setFormData] = useState({
        country: "",
        streetName: "",
        area: "",
        flatOrVilla: "",
        emirate: "",
        numOfBedrooms: "",
        owned: "Yes",
        rent: "",
        monthlyRent: "",
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        console.log(event)
    };

    const handleSubmit = (formData) => {
        console.log(formData)
        axios.post("http://localhost:5000/resedential", formData).then((res) => {
            console.log(res);
            toast.success("data saved")
        }).catch((error) => { console.warn(error); toast.success("Something went wrong") });

    }


    const area = ['Area1', 'Area2', 'Area3']
    const countryList = ["IN", "IO",]
    const emirate = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah and Fujairah']


    return (
        <>
            <div><Toaster /></div>
            <div className='container'>
            <div className='user-info'>

                    <div className='heading'>
                        <h1 className='pb-3 pb-lg-4'>Residential Information</h1>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-lg-6 col-md-6'>
                            <div className='name-input'>
                                <FormControl sx={{ m: 1, minWidth: 80 }}>
                                    <InputLabel id="country">Country</InputLabel>
                                    <Select
                                        labelId="country"
                                        id="country" className='mb-3'
                                        value={formData.country}
                                        onChange={handleChange}
                                        name='country'
                                        autoWidth
                                        label="country"
                                    >
                                        {countryList.map((value) =>
                                            <MenuItem value={value} key={value}>
                                                {value}
                                            </MenuItem>)}

                                    </Select>
                                </FormControl>

                                <TextField label="Street Name" variant="outlined" className='mb-3' onChange={handleChange}
                                    id="streetName" name="streetName" value={formData.streetName} />

                                
                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                                {/* <label htmlFor='area'>Area</label> */}


                                <div className='mb-3 area-right'>
                                    
                                        <input list="area" onChange={handleChange} name="area" placeholder="Select An Area" />
                                        <datalist id="area">
                                            {area.map((value) => <option key={value} value={value} />)}
                                        </datalist>
                                    </div>

                            </FormControl>   

                                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                                <InputLabel id="emirate">Emirate</InputLabel>
                                <Select
                                    labelId="emirate"
                                    id="emirate" className='mb-3'
                                    value={formData.emirate}
                                    onChange={handleChange}
                                    name='emirate'
                                    autoWidth
                                    label="Emirate"
                                >
                                    {emirate.map((value) =>
                                        <MenuItem value={value} key={value}>
                                            {value}
                                        </MenuItem>)}

                                </Select>
                            </FormControl> 

                            <TextField label="Flat or Villa" className='mb-3' variant="outlined"
                                    id="flatOrVilla" name="flatOrVilla" value={formData.flatOrVilla} onChange={handleChange} />
                            
                            
                            </div>
                        </div>
                        <div className='col-12 col-lg-6 col-md-6'>

                        <TextField type='number' label="Number of beds" className='mb-3' variant="outlined"
                                    id="numOfBedrooms" name="numOfBedrooms" value={formData.numOfBedrooms} onChange={handleChange} />


                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                                <InputLabel id="ownedOrRented">Owned / Rented</InputLabel>
                                <Select
                                    labelId="ownedOrRented"
                                    id="ownedOrRented" className='mb-3'
                                    value={formData.owned}
                                    onChange={handleChange}
                                    name='owned'
                                    autoWidth
                                    label="Owned Or Rented"
                                ><MenuItem value="Yes" name="ownedOrRented"  >
                                        Yes
                                    </MenuItem>
                                    <MenuItem value="No" name="ownedOrRented"  >
                                        No
                                    </MenuItem>


                                </Select>
                            </FormControl>
                      
                       
                            <div className={formData.owned === "No" ? 'hidden' : undefined}>
                                    <TextField label="Rental value/*year" className='mb-3' variant="outlined"
                                        id="rent" name="rent" value={formData.rent} onChange={handleChange} />
                                    <TextField label="Monthly rent" variant="outlined"
                                        id="monthlyRent" name="monthlyRent" value={formData.monthlyRent} onChange={handleChange} /></div>

                                <div className={formData.owned === "Yes" ? 'hidden' : undefined}>
                                    <TextField label="Mortaged" variant="outlined"
                                        id="rent" name="rent" value={formData.rent} onChange={handleChange} />
                                    <TextField label="Monthly installment" className='mt-3' variant="outlined"
                                        id="monthlyRent" name="monthlyRent" value={formData.monthlyRent} onChange={handleChange} /></div>



                        
                        </div>
                        <div className="mt-4 main-btn">
                                <button type="submit" onClick={() => handleSubmit(formData)} className="btn btn-primary me-2">Save</button>
                                <a type="button" href='/social' className="btn btn-secondary">Next</a>
                            </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Residential