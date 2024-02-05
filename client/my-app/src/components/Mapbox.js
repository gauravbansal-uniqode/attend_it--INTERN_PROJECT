
import Map, { Marker, Room} from 'react-map-gl'
import React from 'react'
import {useState} from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Spin} from 'antd'


const TOKEN= "pk.eyJ1IjoiZ2F1cmF2MjliYW5zYWwiLCJhIjoiY2xyenZndW41MXdjcTJrbG14bm1sdDZ1MyJ9.BZeuIQl3QuQWFbw3tQJkUA"
const Mapbox = ({getLocation}) => {

    const [location, setLocation] = useState('');
    const [viewState, setViewState]= useState(
        null
      );
    
    const [newPlace, setNewPlace] = useState(null);
    const [loading, setLoading]= useState(false);



    const getCurrentLocation = ({getLocation}) => {
      setLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          showPosition,
          showError
        );
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    };
  
    const showPosition = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      // You can use these coordinates or call a reverse geocoding API to get a location name.
  
      setViewState({latitude, longitude, zoom:17});
      setNewPlace({latitude, longitude});
      getLocation({latitude, longitude});
      setLoading(false);
    };
  
    const showError = (error) => {
      alert(`Error getting location: ${error.message}`);
    };

    const handleClick=(e)=>{
        console.log(e.lngLat);
        const {lng, lat}= e.lngLat;
        setNewPlace({
            latitude: lat,
            longitude: lng
        });
        getLocation({longitude: lng, latitude: lat})

    }


 


  return (
    <div>
    <button onClick={getCurrentLocation}  className='btn btn-primary mx-4 mb-3' style={{width:"80%", backgroundColor:"orange"}}>SET CLASS LOCATION</button>
    {
      loading && <div className="pt-3" style={{textAlign:"center"}}><Spin size="large"></Spin></div>
    }
    {viewState &&
    <div style={{paddingTop:"5%"}}>
    <Map
   {...viewState}

    onMove={event => {setViewState(event.viewState);  console.log(event.viewState);}}
    style={{width: 450, height: 450, zindex:999}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken= {TOKEN}
    onClick={handleClick}
  >
    {
        newPlace &&
        (
            <>
                <Marker
                latitude={newPlace?.latitude}
                longitude={newPlace?.longitude}
                offsetLeft={-3.5 * viewState.zoom}
                offsetRight={-7 * viewState.zoom}
                >
                <LocationOnIcon 
                    style={{fontSize: 4 * viewState.zoom, color: "tomato", cursor:"pointer"}}
                />
               
                </Marker>
            </>
        )
    }
    

  </Map>
  </div>
    }
    </div>
  )
}

export default Mapbox