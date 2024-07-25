import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import useGeolocation from "../hooks/useGeolocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";

type MapPosition = [number, number];

function Map(){

    const [maplat,maplng]=useUrlPosition();
    const [mapPosition,setMapPosition]=useState<MapPosition>([maplat,maplng])
    const {cities} =useCities();

    const {isLoading:isLoadingPosition, position:geolocationPosition,getPosition}=useGeolocation();


    useEffect(function(){
        if(maplat && maplng) setMapPosition([maplat,maplng]);
    },[maplat,maplng])

    useEffect(function(){
        if(geolocationPosition){
            setMapPosition([geolocationPosition.lat,geolocationPosition.lng])
        }
    },[geolocationPosition])

    return (
        <div className={styles.mapContainer} >

           {!geolocationPosition && <Button type="position" onClick={getPosition}>
                {isLoadingPosition?"Loading":"Use your location"  
                }
            </Button>} 

           {cities.map((city)=>(

                <MapContainer key={city.id} center={[city.position.lat,city.position.lng]} zoom={13} scrollWheelZoom={false} className={styles.map}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mapPosition}>
                <Popup>
                {city.cityName}
                </Popup>
                </Marker>
                <ChangeCenter position={[maplat,maplng]}></ChangeCenter>
                <DetectClick/>
                </MapContainer>
                
           ))} 
        </div>
    )
}

function ChangeCenter({position}:{position:MapPosition}){
    const map=useMap();
    map.setView(position);
    return null;
}

function DetectClick(){
    const navigate=useNavigate();

    useMapEvents({
        click:(e)=> navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    });
    return null;
}

export default Map;