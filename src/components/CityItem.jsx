import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import useCity from "../utils/useCity";
import useCities from "../utils/useCities";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity } = useCity();
  const { cities, setCities } = useCities();

  // destructure city prop, easier to write code
  const { cityName, date, id, position } = city;

  function handleDeleteCity(e) {
    // 点击X号不跳转
    e.preventDefault();
    const updatedCities = cities.filter((city) => city.id !== id);
    setCities(updatedCities);
  }

  return (
    <li>
      {/* 对应：<Route path="cities/:id" element={<City />} /> */}
      {/* / 表示根目录，如果加上/，那么/id就是对应的根目录下的 /id，所以这里不加 */}
      {/* ${id} 是params，lat=${position.lat}&lng=${position.lng} 是query string */}
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;

