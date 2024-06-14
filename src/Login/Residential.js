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
        console.log(formData)
    };

    const handleSubmit = (formData) => {
        console.log(formData)
        axios.post("http://localhost:5000/persons", formData).then((res) => {
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
            <div className='user-info'>
                <div className='container'>
                    <div className='heading'>
                        <h1>UserInfo</h1>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-lg-6'>
                            <div className='name-input'>
                                <TextField label="Street Name" variant="outlined" className='mb-3' onChange={handleChange}
                                    id="streetName" name="streetName" value={formData.streetName} />


                                <TextField label="Area Name" variant="outlined"
                                    id="area" name="area" value={formData.area} onChange={handleChange} />


                                <TextField label="Flat or Villa" variant="outlined"
                                    id="flatOrVilla" name="flatOrVilla" value={formData.flatOrVilla} onChange={handleChange} />


                                <TextField type='number' label="Number of beds" variant="outlined"
                                    id="numOfBedrooms" name="numOfBedrooms" value={formData.numOfBedrooms} onChange={handleChange} />






                                <TextField disabled={formData.owned === "No"} label="Rental value/*year" variant="outlined"
                                    id="rent" name="rent" value={formData.rent} onChange={handleChange} />
                                <TextField disabled={formData.owned === "No"} label="Monthly rent" variant="outlined"
                                    id="monthlyRent" name="monthlyRent" value={formData.monthlyRent} onChange={handleChange} />


                                <TextField disabled={formData.owned === "Yes"} label="Mortaged" variant="outlined"
                                    id="rent" name="rent" value={formData.rent} onChange={handleChange} />
                                <TextField disabled={formData.owned === "Yes"} label="Monthly installment" variant="outlined"
                                    id="monthlyRent" name="monthlyRent" value={formData.monthlyRent} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='col-12 col-lg-6'>
                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                                <InputLabel id="demo-simple-select-autowidth-label">Area</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth-label" className='mb-3'
                                    value={formData.area}
                                    onChange={handleChange}
                                    name='area'
                                    autoWidth
                                    label="area"
                                ><MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {area.map((value) =>
                                        <MenuItem value={value} key={value}>
                                            {value}
                                        </MenuItem>)}

                                </Select>
                            </FormControl>
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
                                ><MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {countryList.map((value) =>
                                        <MenuItem value={value} key={value}>
                                            {value}
                                        </MenuItem>)}

                                </Select>
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
                                ><MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {emirate.map((value) =>
                                        <MenuItem value={value} key={value}>
                                            {value}
                                        </MenuItem>)}

                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                                <InputLabel id="ownedOrRented">Owned / Rented</InputLabel>
                                <Select
                                    labelId="ownedOrRented"
                                    id="ownedOrRented" className='mb-3'
                                    value={formData.ownedOrRented}
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



                            <div className="mt-2 main-btn">
                                <button type="submit" onClick={() => handleSubmit(formData)} className="btn btn-primary me-2">Save</button>
                                <a type="button" href='/social' className="btn btn-secondary">Next</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Residential