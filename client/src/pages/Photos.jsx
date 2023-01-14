import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Photos = () => {
    const url = "http://localhost:8800"
    const [Photos, setPhotos] = useState([]);

    const handleDelete = async (id) =>{
        try {
            await axios.delete(url + "/Photos/" + id);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

    const handleMouseEnter = (e) => {
        console.log(e.target);
    }

    useEffect(()=>{
        const fecthAllPhotos = async ()=>{
            try{
                const res = await axios.get(url + "/Photos")
                setPhotos(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fecthAllPhotos();
    }, []);

  return (
    <div>
        <nav>
            <h1>Photo Album</h1>
            <button className='add'>
                <Link to="/add" style={{textDecoration:'none'}}>Add Photo</Link>
            </button> 
        </nav> 
        <div className='photos'>
            {Photos.map(photo=>(
                <div className='photo' key={photo.id}>
                    {photo.cover && <img onMouseEnter ={handleMouseEnter}src={photo.cover} alt="" />}
                    <div className='details'>
                        <h2>{photo.title}</h2>
                        <h4>{photo.desc}</h4>
                        <span>{photo.year}</span>
                        <button className='update'><Link to={`/update/${photo.id}`} style={{textDecoration:'none'}}>Update</Link></button>
                        <button className='delete' onClick={() => handleDelete(photo.id)} style={{textDecoration:'none'}}>Delete</button>    
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Photos