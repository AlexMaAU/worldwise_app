import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <div className={styles.nav}>
      <ul>
        <li>
          {/* / 表示根目录，如果加上/，那么/cities就是对应的根目录下的 /cities，所以这里不加 */}
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
        <li>
          <NavLink to="form">Form</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AppNav;

