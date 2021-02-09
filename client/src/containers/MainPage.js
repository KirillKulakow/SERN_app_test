import React from "react";
import { Link } from "react-router-dom";
import style from "./MainPage.module.scss";

const MainPage = () => {
  return (
    <>
      <nav className={style.nav}>
        <div className={style["background-top"]} />
        <div className={style.container}>
          <h2>AppCo</h2>
        </div>
      </nav>
      <main className={style["main-container"]}>
        <section className={style["section-brainstorming"]}>
          <h1>
            <strong>Brainstorming</strong> for
            <br /> desired perfect Usability
          </h1>
          <p>
            Our design projects are fresh and simple and will benefit your
            business greatly. Learn more about our work!
          </p>
          <Link className={style.link_router} to='/users_stat'>
            Views Stats
          </Link>
          <img
            className={style["img-phone"]}
            src='./Mobile.svg'
            alt='Smartphone with this app'
          />
        </section>
        <section className={style["section-info-projects"]}>
          <h3>
            Why{" "}
            <strong>
              small business owners
              <br />
              love
            </strong>{" "}
            AppCo?
          </h3>
          <p>
            Our design projects are fresh and simple and will benefit your
            business greatly. Learn more about our work!
          </p>
          <ul>
            <li>
              <div className={style["background_icon"]}>
                <div className={`${style.icon_list} ${style.art}`} />
              </div>
              <h4>Clean Design</h4>
              <p>Increase sales by showing true dynamics of your website.</p>
            </li>
            <li>
              <div className={style["background_icon"]}>
                <div className={`${style.icon_list} ${style.secure}`} />
              </div>
              <h4>Secure Data</h4>
              <p>
                Build your online store’s trust using Social Proof & Urgency.
              </p>
            </li>
            <li>
              <div className={style["background_icon"]}>
                <div className={`${style.icon_list} ${style.device}`} />
              </div>
              <h4>Retina Ready</h4>
              <p>
                Realize importance of social proof in customer’s purchase
                decision.
              </p>
            </li>
          </ul>
        </section>
      </main>
      <footer className={style.footer}>
        <div className={style["background-bottom"]} />
        <div className={style.footer_form}>
          <input
            className={style.form_input}
            type='email'
            placeholder='Enter your email'
          />
          <button className={style.form_button} type='submit'>
            Subscribe
          </button>
        </div>
        <div className={style.bottom_info}>
          <h2 className={style.bottom_info_logo}>AppCo</h2>
          <p className={style.bottom_info_rights}>
            All rights reserved by ThemeTags
          </p>
          <p className={style.bottom_info_rights}>Copyrights © 2019</p>
        </div>
      </footer>
    </>
  );
};

export default MainPage;
