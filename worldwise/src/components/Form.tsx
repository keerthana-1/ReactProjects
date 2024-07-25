// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { FormEvent, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";
import { position } from "../App";

export interface newcity{

  "cityName": string;
  "country": string;
  "emoji": string;
  "date": string;
  "notes": string;
  "position": position;
}

export function convertToEmoji(countryCode:string) : string{
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char:string) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

interface GeoCodingError {
  message: string;
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(String(new Date()));
  const [notes, setNotes] = useState("");
  const navigate=useNavigate();
  const [lat,lng] = useUrlPosition();
  const [isLoadingGeodata,setIsLoadingGeodata]=useState(false);
  const [emoji,setEmoji]=useState<string>('');
  const [geoCodingError,setGeoCodingError]=useState<string|null>("");
  const {createCity} =useCities();

  const BASE_URL="https://api.bigdatacloud.net/data/reverse-geocode";

  

  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    if(!cityName || !date) return
    const newCity={
      cityName,
      country,
      emoji,
      date,
      notes,
      position:{lat,lng}
    };
    await createCity(newCity)
    navigate("/app/cities")
  }
  
  useEffect(function(){

    async function getPositionData(){
      try{
      setIsLoadingGeodata(true)
      setGeoCodingError("")
      
      const res=await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
      const data=await res.json()

      if(!data.countryCode) throw new Error("choose a city");

      setCityName(data.city || data.locality || "");
      setCountry(data.countryName);
      console.log(country,isLoadingGeodata);
      setEmoji(convertToEmoji(data.countryCode))
      }
      catch(err){
        const error = err as GeoCodingError;
        setGeoCodingError(error.message)
      }
      finally{
        setIsLoadingGeodata(false)
      }
    }
    getPositionData()
  },[lat,lng])

  if(isLoadingGeodata) return <Spinner/>

  if(!lat && !lng) return <Message message={"start by clicking somewhere on map"}></Message>

  if(geoCodingError) return <Message message={geoCodingError}>
      
    </Message>

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setDate(new Date(e.target.value))}
          value={String(date)}
        /> */}

        <DatePicker id="date" selected={new Date(date)} onChange={(date) => setDate(String(date))} dateFormat="dd/MM/yyyy"/>

      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button  onClick={()=>navigate("form")} type="primary">Add</Button>
       <BackButton></BackButton>
      </div>
    </form>
  );
}

export default Form;
