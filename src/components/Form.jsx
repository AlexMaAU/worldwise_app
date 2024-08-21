import { useEffect, useState } from "react";
import BASE_URL from "../utils/baseURL";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../utils/useUrlPosition";
import Message from "./Message";
import useCities from "../utils/useCities";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import useCity from "../utils/useCity";

function Form() {
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date().toISOString());
  const [notes, setNotes] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const { cities, setCities } = useCities();
  const { setCurrentCity } = useCity();

  const navigate = useNavigate();

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        setGeocodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else."
          );
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
      } catch (error) {
        setGeocodingError(error.message);
        console.log(error);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  function handleButtonClick(e) {
    e.preventDefault();
    // 使浏览器回到历史记录中的前一个页面，相当于用户点击了浏览器的“后退”按钮一次
    // 如果navigate()里传入的是数字，可以是正数(后X个页面)或者负数(前X个页面)
    navigate(-1);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const newCityId = Math.floor(Date.now() / 1000);
    const newCity = {
      cityName: cityName,
      country: country,
      emoji: "",
      date: date,
      notes: notes,
      position: {
        lat: lat,
        lng: lng,
      },
      id: newCityId,
    };
    const updatedCities = [...cities, newCity];
    setCities(updatedCities);
    setCurrentCity(newCity);
    navigate("/app/cities");
  }

  if (!lat && !lng) {
    return <Message message="Start by clicking somewhere on the map" />;
  }

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date.toISOString())}
        />
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
        <Button type="primary">Add</Button>
        <Button type="back" onClick={(e) => handleButtonClick(e)}>
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;

