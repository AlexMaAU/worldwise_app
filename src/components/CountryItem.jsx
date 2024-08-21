import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;

