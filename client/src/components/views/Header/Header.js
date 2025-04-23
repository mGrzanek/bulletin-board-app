import styles from './Header.module.scss';
import Hero from "../Hero/Hero";
import NavBar from "../NavBar/NavBar";

const Header = () => {
    return(
       <div className={styles.header}>
            <Hero />
            <NavBar />
       </div>
    );
}

export default Header;