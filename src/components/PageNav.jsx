import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import useAuth from "../utils/useAuth";
import Button from "./Button";

function PageNav() {
  const { isLogin, setIslogin } = useAuth();

  function handleLogout() {
    setIslogin(false);
  }

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          {/* / 表示根目录，/product是说 product 路由是在根目录下的  */}
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          {!isLogin ? (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          ) : (
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;

