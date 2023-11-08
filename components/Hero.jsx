import Image from "next/image";
import css from "../styles/Hero.module.css";
import cherry from "../assets/Cherry.png";
import heroImage from "../assets/HeroImage.png";
import Pizza1 from "../assets/p1.jpg";
import { UilPhone } from "@iconscout/react-unicons";
export default function Hero() {
  return (
    <div className={css.container}>
      {/* Left Side */}
      <div className={css.left}>
        <div className={css.cherryDiv}>
          <span>More than Faster</span>
          <Image src={cherry} alt="" width={40} height={25} />
        </div>

        {/* HeroText Side */}
        <div className={css.heroText}>
          <span>Be The Fastest</span>
          <span>In Delivering</span>
          <span>
            Your <span style={{ color: "var(--themeRed)" }}>Pizza</span>
          </span>
        </div>
        <span className={css.miniText}>
          Our Mission is to filling your tummy with delicius food and with fast
          and free delivery
        </span>
        <button className={`btn ${css.btn}`}>Get Started</button>
      </div>

      {/* Right Side */}
      <div className={css.right}>
        <div className={css.imageSide}>
          <Image src={heroImage} alt="" layout="intrinsic" />
        </div>
        <div className={css.contactUs}>
          <span>Contact Us</span>
          <div>
            <UilPhone color="#fff" />
          </div>
        </div>
        <div className={css.pizza}>
          <div>
            <Image src={Pizza1} alt="" objectFit="cover" layout="intrinsic" />
          </div>
          <div className={css.details}>
            <span>Italian Pizza</span>
            <span>
              <span style={{ color: "var(--themeRed)" }}>$</span> 7.49
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
