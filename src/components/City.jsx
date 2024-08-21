import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import Button from "./Button";
import Spinner from "./Spinner";
import useCity from "../utils/useCity";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const {
    currentCity,
    getCity,
    currentCityIsLoading,
    setCurrentCityIsLoading,
  } = useCity();

  // useParams 返回当前动态路由参数(params)的键值对。例如，{id: '73930385'}
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // useEffect里回调函数，特别是和API交互，记得加上try catch来增加代码强健性
    try {
      setTimeout(() => {
        getCity(Number(params.id));
      }, 500);
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  function handleButtonClick(e) {
    e.preventDefault();
    setCurrentCityIsLoading(true);
    // 使浏览器回到历史记录中的前一个页面，相当于用户点击了浏览器的“后退”按钮一次
    // 如果navigate()里传入的是数字，可以是正数(后X个页面)或者负数(前X个页面)
    navigate(-1);
  }

  // prevent undefined
  if (currentCityIsLoading) {
    return <Spinner />;
  }

  const { cityName, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>{cityName}</h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button type="back" onClick={(e) => handleButtonClick(e)}>
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default City;

