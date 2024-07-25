import styles from "./CityItem.module.css";
import { city } from "../App";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

function CityItem({city}:{city:city}){

    const formatDate = (date:string) =>
        new Intl.DateTimeFormat("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(date))
    
    const {currentCity,deleteCity}=useCities();

    function handleDelete(event: React.MouseEvent<HTMLButtonElement>,id:number){
        event.preventDefault();
        deleteCity(id)
    }

    return (
        <li >
            <Link className={`${styles.cityItem} ${city.id===currentCity?.id ? styles["cityItem--active"]:""}`}
             to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}>
            <span className={styles.emoji}>{city.emoji}</span>
            <h3 className={styles.name}>{city.cityName}</h3>
            <time className={styles.date}>({formatDate(city.date)})</time>
            <button className={styles.deleteBtn} onClick={(event)=>handleDelete(event,city.id)}>
            &times;
            </button>
            </Link>
        </li>
    )
}

export default CityItem;