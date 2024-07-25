 import styles from "./City.module.css";

//import { useParams, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date:string) => date !== ''?
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date)):'';

function City() {

  const {id}=useParams();
  const {currentCity,getCity,isLoading}=useCities();

  const currentCityValue = currentCity;

  useEffect(function(){
   getCity(id);
  },[id])

  if(isLoading) return <Spinner/>
  return (
   
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{currentCityValue?.emoji}</span> {currentCityValue?.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {currentCityValue?.cityName} on</h6>
        <p>{formatDate(currentCityValue?.date || '')}</p>
      </div>

      {currentCityValue?.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{currentCityValue?.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${currentCityValue?.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {currentCityValue?.cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
         <BackButton></BackButton>
      </div>
      
    </div>

  );
}

export default City;
