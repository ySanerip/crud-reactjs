import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const url = "http://localhost:8800"

const Update = () => {
  const [photo, setPhoto] = useState({
    title:"",
    desc:"",
    year: null,
    cover:""
  });

const navigate = useNavigate();
const location = useLocation();

const photoId = location.pathname.split("/")[2]

const handleClick = async e => {
  e.preventDefault()
  try{
    await axios.put(url + "/photos/" + photoId, photo)
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
      <h1>UPDATE<br></br> PHOTO</h1>
        <input type="text" placeholder='Title' onChange={handleChange} name="title" />
        <input type="text" placeholder='Desc' onChange={handleChange} name="desc"/>
        <input type="text" placeholder='Year' onChange={handleChange} name="year"/>
        <input type="text" placeholder='Cover' onChange={handleChange} name="cover"/>
        <button className='addbutton' onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update;