import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Social = () => {
  const [socialStatus, setSocialStatus] = useState('');
  const [numDependents, setNumDependents] = useState('');
  const [children, setChildren] = useState([
    { name: '', dob: '' },
    { name: '', dob: '' },
    { name: '', dob: '' },
    { name: '', dob: '' }
  ]);
  const [numCarsOwned, setNumCarsOwned] = useState('');
  const [mortgaged, setMortgaged] = useState(true);
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [carMarketValue, setCarMarketValue] = useState('');

  const handleChildChange = (index, field, value) => {
    const newChildren = [...children];
    newChildren[index][field] = value;
    setChildren(newChildren);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'socialStatus') {
      setSocialStatus(value);
    } else if (name === 'numDependents') {
      setNumDependents(value);
    } else if (name.startsWith('childName')) {
      const index = parseInt(name.slice(-1)) - 1;
      handleChildChange(index, 'name', value);
    } else if (name.startsWith('childDOB')) {
      const index = parseInt(name.slice(-1)) - 1;
      handleChildChange(index, 'dob', value);
    } else if (name === 'numCarsOwned') {
      setNumCarsOwned(value);
    } else if (name === 'mortgaged') {
      setMortgaged(value);
      if (value === "yes") { setMortgaged(true) }
      else setMortgaged(false)
    } else if (name === 'carModel') {
      setCarModel(value);
    } else if (name === 'carYear') {
      setCarYear(value);
    } else if (name === 'carMarketValue') {
      setCarMarketValue(value);
    }
  };
  const data = {
    numberOfDependents: numDependents,
    numberOfCarsOwned: numCarsOwned,
    mortgaged: mortgaged,
    model: carModel,
    year: carYear,
    currentMarketValue: carMarketValue,


  }

  const handleSubmit = (event) => {
    console.log(children.map(s => s.dob))

    event.preventDefault();
    axios.post("http://localhost:5000/SocialStatus", data).then((res) => { console.log(res); toast.success("data saved") }).catch((error) => { console.log(error); toast.error("Data isn't saved") });
  };

  const years = Array.from({ length: new Date().getFullYear() - 1999 }, (_, i) => 2000 + i);


  return (
    <div className='container'>
      <form className='social-media' onSubmit={handleSubmit}>
        <div><Toaster /></div>

        <div className='row'>
          <div className='col-12 col-lg-6 col-md-6'>
            <div className="ocialStatus mb-3">
              <label htmlFor="socialStatus" className="form-label pb-1">Social Status</label>
              <select id="socialStatus" name="socialStatus" value={socialStatus} onChange={handleChange} className="form-select">
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="numDependents" className="form-label pb-1">of Dependents (Including Parents)</label>
              <input type="number" id="numDependents" name="numDependents" value={numDependents} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-2">
              <label htmlFor="numCarsOwned" className="form-label pb-1">of Cars Owned</label>
              <input type="number" id="numCarsOwned" name="numCarsOwned" value={numCarsOwned} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-2">
              <label htmlFor="mortgaged" className="form-label pb-1">Mortgaged?</label>
              <select id="mortgaged" name="mortgaged" value={mortgaged} onChange={handleChange} className="form-select">
                <option value="">Select</option>
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="carModel" className="form-label pb-1">Car Model</label>
              <input type="text" id="carModel" name="carModel" value={carModel} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-2">
              <label htmlFor="carYear" className="form-label pb-1">Year</label>
              <select id="carYear" name="carYear" value={carYear} onChange={handleChange} className="form-select">
                <option value="">Select</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="">
              <label htmlFor="carMarketValue" className="form-label pb-1">Current Market Value</label>
              <input type="number" id="carMarketValue" name="carMarketValue" value={carMarketValue} onChange={handleChange} className="form-control" />
            </div>
          </div>
          <div className='col-12 col-lg-6 col-md-6 Children-Details'>
            <div className="">
              <label className="form-label pb-1">Children Details</label>
              {children.map((child, index) => (
                <div key={index} className="mb-3">
                  <input className="mb-2" type="text" name={`childName${index + 1}`} value={child.name} onChange={handleChange} placeholder={`Child ${index + 1} Name`} className="form-control mb-1" />
                  <input className="mb-2" type="date" name={`childDOB${index + 1}`} value={child.dob} onChange={handleChange} placeholder={`Child ${index + 1} DOB`} className="form-control" />
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="mt-3 main-btn">
          <button type="submit" className="btn btn-primary me-2">Save</button>
          <a type="button" href='/residential' className="btn btn-secondary">Next</a>
        </div>
      </form>
    </div>
  );
};

export default Social;
