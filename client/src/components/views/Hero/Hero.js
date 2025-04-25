import clsx from 'clsx';
import styles from './Hero.module.scss';

const Hero = () => {
    return(
        <div className={styles.hero}>
            <div className={styles.layer}>
                <h1 className={clsx(styles.title, 'pt-5 text-warning')}>Bulletin board</h1>
                <h4 className={clsx(styles.subtitle, 'text-white')}>all ads in one place</h4>
            </div>
        </div>
    );
}

export default Hero;