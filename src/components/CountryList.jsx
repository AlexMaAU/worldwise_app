import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import useCities from "../utils/useCities";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (cities.length === 0)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = [];
  cities.map((city) => countries.push(city.country));
  // use Set to remove duplicates
  const countrySet = new Set(countries);
  // then convert set back to array for mapping
  const uniqueCountries = Array.from(countrySet);

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country) => {
        return <CountryItem key={country} country={country} />;
      })}
    </ul>
  );
}

export default CountryList;

