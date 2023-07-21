import React from "react";
import { useState, useEffect, useRef } from "react";
import { Home } from "./Home";
import { Menu } from "./Menu";
import { Drinks } from "./Drinks";
import { Desserts } from "./Desserts";
import { Custom } from "./Custom";
import { Deals } from "./Deals";
import { Order } from "./Order";
// import { MenuProvider } from './Contexts/MenuContext';
// import { OrderProvider } from './Contexts/OrderContext';
import { useOrder } from "./Contexts/OrderContext";
// import { useMenu } from './Contexts/MenuContext';
// import { CustomProvider } from './Contexts/CustomContext';
import "./header.css";
// import './menu.css';
// import Select from 'react-select'

// class ErrorBoundary extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = { hasError: false };
//     }

// static getDerivedStateFromError(error){
// return { hasError: true };  }

//   render() {
//     if (this.state.hasError) {   return <h1>Something went wrong.</h1>;    }
//     return this.props.children;
//   }
// }

//header pictures change based on time of day and weather. wizard magic themes and people enjoying pizza. Maybe implement weather into the deals page as well? sun spell deal, rain spell deal

export const WizardHeader = () => {
  const [selectedPage, setSelectedPage] = useState(<Home />);
  const [navClicked, setNavClicked] = useState("home");
  const [navClickedSubMenu, setNavClickedSubMenu] = useState("pizza");
  const [order, setOrder] = useOrder();
  const [scroll, setScroll] = useState(0);
  const [aspectRatio, setAspectRatio] = useState("average");

  // const documentHeight = () => {
  //   const doc = document.documentElement
  //   doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
  //  }

  // const mainToMenu = () => {
  //     setMenuPizzas()
  // }

  const handleHomeClick = () => {
    setSelectedPage(<Home />);
    setNavClicked("home");
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const handleMenuClick = () => {
    setSelectedPage(<Menu />);
    setNavClicked("menu");
    setNavClickedSubMenu("pizza");
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  const handlePizzaClick = () => {
    setSelectedPage(<Menu />);
    setNavClickedSubMenu("pizza");
  };
  const handleDrinksClick = () => {
    setSelectedPage(<Drinks />);
    setNavClickedSubMenu("drinks");
  };
  const handleDessertsClick = () => {
    setSelectedPage(<Desserts />);
    setNavClickedSubMenu("desserts");
  };

  const handleCustomClick = () => {
    setSelectedPage(<Custom />);
    setNavClicked("custom");
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const handleDealsClick = () => {
    setSelectedPage(<Deals />);
    setNavClicked("deals");
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const handleOrderClick = () => {
    setSelectedPage(<Order />);
    setNavClicked("order");
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const orderTotalItems = Object.keys(order).length;
  //    useEffect(() => {
  //     const isClicked = (navSelected) => {
  //         return  navSelected === navClicked ? 'navBoldClicked' : 'navBold';
  //       }
  //     }, [navClicked]);

  const scrollRef = useRef();

  const isClicked = (navSelected) => {
    return navSelected === navClicked ? "navBoldClicked" : "navBold";
  };
  const isClickedSubMenu = (navSelected) => {
    return navSelected === navClickedSubMenu ? "navBoldClicked2" : "navBold2";
  };

  useEffect(() => {
    const handleScroll = (event) => {
      console.log("innerHeight", window.innerHeight);
      setScroll(window.pageYOffset);
    };
    const mediaQuery = (event) => {
      window.matchMedia("(min-aspect-ratio: 2/1)").matches
        ? setAspectRatio("wide")
        : window.matchMedia("(max-aspect-ratio: 9/10)").matches
        ? setAspectRatio("tall")
        : setAspectRatio("average");
    };
    mediaQuery();
    window.addEventListener("resize", () => {
      mediaQuery();
    });
    window.addEventListener("scroll", () => {
      handleScroll();
    });
    return () => {
      window.removeEventListener("resize", () => {
        mediaQuery();
      });
      window.removeEventListener("scroll", () => {
        handleScroll();
      });
    };
  });

  const headerBGcssStyle = () => {
    if (aspectRatio === "average") {
      return {
        width: 100 + scroll / 7 + "%",
        height: 100 + scroll / 150 + "%",
        top: -(scroll / 20) + "%",
        // filter: "blur(" + (scroll/70) + "px)"
      };
    } else if (aspectRatio === "tall") {
      return {
        width: 150 + scroll / 7 + "%",
        height: 100 + scroll / 150 + "%",
        top: -(scroll / 20) + "%",
        // filter: "blur(" + (scroll/70) + "px)"
      };
    } else {
      return {
        width: 100 + scroll / 7 + "%",
        height: 150 + scroll / 150 + "%",
        top: -(scroll / 20) + "%",
        // filter: "blur(" + (scroll/70) + "px)"
      };
    }
  };

  const zoomBlur = () => {
    let windowHeight = window.innerHeight;
    return scroll / windowHeight > 0.5 ? (scroll * 5) / windowHeight - 1 : 0;
  };
  const isShort = () => {
    return window.innerHeight < 400 ? true : false;
  };

  const isMenuClicked = (navSelected) => {
    return navSelected !== "menu"
      ? "3rem"
      : isShort() === true
      ? "3rem"
      : "5.7rem";
  };

  const menuNav = (navSystem) => {
    return navClicked !== "menu" ? null : isShort() === true &&
      navSystem === "mobile" ? (
      <ul className="navStick2Short">
        <li className="nav" onClick={handlePizzaClick} key="nav1">
          <span className="navBold2" id={isClickedSubMenu("pizza")}>
            PIZZA
          </span>
        </li>
        <li className="nav" onClick={handleDrinksClick} key="nav2">
          <span className="navBold2" id={isClickedSubMenu("drinks")}>
            DRINKS
          </span>
        </li>
        <li className="nav" onClick={handleDessertsClick} key="nav3">
          <span className="navBold2" id={isClickedSubMenu("desserts")}>
            DESSERTS
          </span>
        </li>
      </ul>
    ) : isShort() === true && navSystem === "desktop" ? null : navSystem ===
      "mobile" ? null : (
      <ul className="navStick2">
        <li className="nav" onClick={handlePizzaClick} key="nav1">
          <span className="navBold2" id={isClickedSubMenu("pizza")}>
            PIZZA
          </span>
        </li>
        <li className="nav" onClick={handleDrinksClick} key="nav2">
          <span className="navBold2" id={isClickedSubMenu("drinks")}>
            DRINKS
          </span>
        </li>
        <li className="nav" onClick={handleDessertsClick} key="nav3">
          <span className="navBold2" id={isClickedSubMenu("desserts")}>
            DESSERTS
          </span>
        </li>
      </ul>
    );
  };

  return (
    <div className="wrapper" id="wrapper">
      <header className="pizzaZoom">
        <div
          id="pizzaZoom"
          style={{ width: scroll / 7 + "%", top: 50 - scroll / 17 + "%" }}
        >
          <img src="./img/pizzaZoom1.webp" alt="Pizza" id="headerImg"></img>
        </div>
        <img
          src="./img/wizard3.webp"
          alt="Pizza"
          id="wizard1"
          style={headerBGcssStyle()}
        ></img>
        <div
          id="wizTitle3"
          style={{
            top: (3 - scroll / 170) * 1 + "%",
            fontSize: (4.65 + scroll / 400) * 1 + "rem",
            filter: "blur(" + zoomBlur() + "px)",
          }}
        >
          Wizard Pizza
        </div>
        <div
          id="wizTitle2"
          style={{
            top: (3 - scroll / 250) * 1 + "%",
            fontSize: (4.6 + scroll / 400) * 1 + "rem",
            filter: "blur(" + zoomBlur() + "px)",
          }}
        >
          Wizard Pizza
        </div>
        <div
          id="wizTitle"
          style={{
            top: (3 - scroll / 200) * 1 + "%",
            fontSize: (4.5 + scroll / 400) * 1 + "rem",
          }}
          onClick={handleHomeClick}
        >
          Wizard Pizza
        </div>
      </header>
      <div
        className="navContainer"
        style={{ height: isMenuClicked(navClicked) }}
      >
        <ul className="navStick">
          <li
            className="nav"
            onClick={handleMenuClick}
            ref={scrollRef}
            key="nav1"
          >
            MAGES
            <span className="navBold" id={isClicked("menu")}>
              MENU
            </span>
          </li>
          <li
            className="nav"
            onClick={handleCustomClick}
            ref={scrollRef}
            key="nav2"
          >
            <span className="navBold" id={isClicked("custom")}>
              CUSTOM
            </span>
            SPELL
          </li>
          <li
            className="nav"
            onClick={handleDealsClick}
            ref={scrollRef}
            key="nav3"
          >
            MAGIC
            <span className="navBold" id={isClicked("deals")}>
              DEALS
            </span>
          </li>
          <li
            className="nav"
            id="navOrder"
            onClick={handleOrderClick}
            ref={scrollRef}
            key="nav4"
          >
            <span className="navBold" id={isClicked("order")}>
              ORDER
            </span>
            <div className="navCart">
              <span className="orderItemCountMenu">{orderTotalItems}</span>
            </div>
          </li>
        </ul>
        {menuNav("desktop")}
      </div>
      <div className="backgroundFill">
        {menuNav("mobile")}
        {selectedPage}
        <div className="footer">
          <div className="footerLeftFade"></div>
          <div className="footerRightFade"></div>
          <div className="footerText">
            SORRY WIZARD PIZZA IS NOT A REAL BUSINESS
          </div>
          <div className="footerText footerText2">
            WEBSITE CREATED BY BYRON OREN FOR WEB DEVELOPER PORTFOLIO
          </div>
          <div className="footerTextBlur">
            SORRY WIZARD PIZZA IS NOT A REAL BUSINESS
          </div>
          <div className="footerTextBlur footerText2">
            WEBSITE CREATED BY BYRON OREN FOR WEB DEVELOPER PORTFOLIO
          </div>
        </div>
      </div>
    </div>
  );
};
