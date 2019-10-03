import React from 'react';
import { Link } from '..';
import styles from './index.module.css';

const timHref = "https://timhaley.me";
const chattHref = "https://www.google.com/maps/place/Chattanooga,+TN/@35.0979732,-85.5188784,10z/data=!3m1!4b1!4m5!3m4!1s0x886060408a83e785:0x2471261f898728aa!8m2!3d35.0456297!4d-85.3096801";

const Footer = () => (
  <footer className={ styles.container }>
    <p>
      Made by <Link href={ timHref }>Tim Haley</Link> with { ' ' }
      <i className={ styles.heart + ' icon ion-heart' }></i>{ ' ' }
      in <Link href={ chattHref }>Chattanooga, TN</Link>
    </p>
  </footer>
);

export default Footer;
