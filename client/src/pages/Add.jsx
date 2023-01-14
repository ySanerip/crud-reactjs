import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const url = "http://localhost:8800"

const Add = () => {
  const [photo, setPhoto] = useState({
    title:"",
    desc:"",
    year: null,
    cover:""
  });

const navigate = useNavigate()

const handleClick = async e => {
  e.preventDefault()
  try{
    await axios.post(url + "/photos", photo)
    navigate("/");
  }catch(err){
    console.log(err);
  }
};

const handleChange =(e)=>{
  setPhoto((prev) => ({...prev, [e.target.name]: e.target.value}))
};

  return (
    <div className='form'>
      <h1>ADD<br></br> NEW PHOTO</h1>
          <input type="text" placeholder='Title' onChange={handleChange} name="title" />
          <input type="text" placeholder='Desc' onChange={handleChange} name="desc"/>
          <input type="text" placeholder='Year' onChange={handleChange} name="year"/>
          <input type="text" placeholder='Cover' onChange={handleChange} name="cover"/>
          <button className="addbutton"onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add