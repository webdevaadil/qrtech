import React from "react";
import styles from "../Css/footer.module.css";

export const Footer = () => {
  return <>
   {/* <footer className={styles.blog}>
    <ul>
     
      <li> <h2>Organize</h2>Keep your Enquiries organized with dedicated filters at your finger tips.</li>
      <li> <h2>Mobile Friendly</h2>Accessible on Desktop and Mobile Devices</li>
      <li> <h2>100% Free</h2>Totally FREE to use for Individuals, No charge of any sort.</li>
      <li> <h2>Secure</h2>Filed stored hereare safe and secure</li>
    </ul>
  </footer> */}
<div class={styles.footersection}>
    <div class={styles.container}>
        <ul class={styles.listinlineul}>
            <li class={styles.listinline}><a >Contact us</a></li>
            <li class={styles.listinline}><a >|</a></li>
            <li class={styles.listinline}><a >Privacy</a></li>
            <li class={styles.listinline}><a >|</a></li>
            <li class={styles.listinline}><a >Terms &amp; Conditions</a></li>
            <li class={styles.listinline}><a >|</a></li>
            <li class={styles.listinline}><a >Support</a></li>
        </ul>
    </div>
</div>
  </>;
};
