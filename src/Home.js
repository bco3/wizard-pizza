import { useState } from "react";
import "./home.css";
import hour from "./hours.json";
// import Axios from "axios";

export const Home = () => {
  const [hours, setHours] = useState(hour);

  // useEffect(() => {
  //   Axios.get(`${process.env.REACT_APP_BACKEND_URL}/hours`)
  //     .then((response) => {
  //       let serveHours = response.data;
  //       setHours(serveHours);
  //       console.log(serveHours);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  function timeConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time.pop();
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  const bannerHome = () => {
    const currentDate = new Date();
    const openHour = hours[currentDate.getDay()].openTime;
    const closeHour = hours[currentDate.getDay()].closeTime;
    return hours[currentDate.getDay()].closed === 1
      ? "SORRY WE ARE CLOSED TODAY"
      : currentDate.toLocaleTimeString("en-US", { hour12: false }) < openHour
      ? `WE WILL BE OPEN AT ${timeConvert(openHour)} TODAY`
      : currentDate.toLocaleTimeString("en-US", { hour12: false }) > closeHour
      ? "SORRY WE ARE NOW CLOSED"
      : `WE ARE OPEN TILL ${timeConvert(closeHour)} TODAY`;
  };

  return (
    <>
      <h1 id="bannerHome">
        {hours
          ? bannerHome()
          : "OUR SERVER IS DOWN, CALL 604-626-7038 FOR ORDERS"}
      </h1>
      <div className="home">
        {/* <img id="neonPizza" src="./img/pizzaNeon.webp" alt="neon pizza sign"></img> */}
        {/* <section className="info"> */}
        <div className="homeBoxes">
          <h2 className="infoTitle">HOURS</h2>
          <div id="hoursGrid">
            {hours &&
              Object.keys(hours).map((hour, index) => {
                return (
                  <>
                    <div className="day">
                      {hours[hour].dayOfWeek} <br />{" "}
                    </div>
                    <div className="hours">
                      {hours[hour].closed === 1
                        ? "CLOSED " +
                          (hours[hour].closedNotice
                            ? hours[hour].closedNotice
                            : "")
                        : timeConvert(hours[hour].openTime) +
                          "-" +
                          timeConvert(hours[hour].closeTime)}{" "}
                      <br />
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        <div className="homeBoxes">
          <h2 className="infoTitle">INFO</h2>
          <p className="infoText">
            604-626-7038
            <br />
            byronoren@gmail.com
            <br />
            513 Pauline Lane. Abbosford, BC
          </p>
        </div>
        <div className="homeBoxes" id="mapGrid">
          {/* <h2 className="infoTitle">WIZARD MAP</h2> */}
          <iframe
            id="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951.6398880363488!2d-122.29331824296622!3d49.04827942607883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54844be021c46c47%3A0xee7b2a0cbb803495!2sJubilee%20Park%20Pickleball%20Courts!5e0!3m2!1sen!2sca!4v1662751603778!5m2!1sen!2sca"
            title="Wizard Pizza Map"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        {/* </section> */}
        {/* <section className="about"> */}
        <div id="homeImage">
          <img
            id="wizPicture"
            src="./img/Wizard_Pizza_ext.jpg"
            alt="Wizard Pizza store front"
          ></img>
        </div>
        <div className="homeBoxes" id="aboutUs">
          <h2 className="infoTitle">ABOUT US</h2>
          <p className="homeText">
            {" "}
            It all started as a child, inspired by the historical greatness of
            the likes of Michealangelo, Donetelo... their passion was
            contagious, the art, the love, the desire for Pizza. With years of
            practice and perserverance I had learned of a way to conjure pizzas
            with a 7 digit spell. Now the times have changed and most have
            learned the magical ways of online ordering. Wizard Pizza supports
            the ways of old and embraces those of the youth. We take pride in
            our very untraditional fire ball cooking method and its celebration
            of eco energy friendly 5 star rating. Our goal is to honour the
            Ninja Turtles and the tradition of wizards making pizzas, we hope
            that the world will one day accept our magical ways — though we are
            mearly an illusion, <br></br>
            Wizard Pizza
            <br></br>
            <i>this website does not represent a real restaurant.</i>
          </p>
        </div>
        {/* </section> */}
      </div>
    </>
  );
};
