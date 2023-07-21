import { useState, useEffect } from "react";
import "./deals.css";
import special from "./deals.json";
export const Deals = () => {
  const deal = special
    .filter((item) => {
      return (
        item.deal_active === 1 &&
        (item.time_out > new Date() ||
          item.weekday === new Date().getDay() ||
          (item.date_in <= new Date() && item.date_out >= new Date()) ||
          (item.weekday === null &&
            item.time_in === null &&
            item.date_in === null))
      );
    })
    .map((item) => {
      return {
        deals_id: item.deals_id,
        deal_title: item.deal_title,
        deal_description: item.deal_description,
        deal_name: item.deal_name,
        img_name: item.img_name,
        discount: item.discount,
      };
    });

  const [deals, setDeals] = useState(deal);

  return (
    <>
      <h1 id="bannerDeal">
        THE DEAL THAT SAVES YOU THE MOST IS AUTOMATICALLY APPLIED
      </h1>
      <div className="deals">
        {deals !== undefined && deals[0] ? (
          Object.keys(deals).map((deal, index) => {
            return (
              <section className="deal" key={deal + index}>
                <img
                  src={`./img/${deals[deal]["img_name"]}.webp`}
                  className="dealPicture"
                  alt={`${deal} deal`}
                ></img>
                <h2 className="dealTitle3">{deals[deal]["deal_title"]}</h2>
                <h2 className="dealTitle2">{deals[deal]["deal_title"]}</h2>
                <h2 className="dealTitle">{deals[deal]["deal_title"]}</h2>
                <div className="description">
                  {deals[deal]["deal_description"]}
                </div>
              </section>
            );
          })
        ) : (
          <h2 className="noDeals">
            Sorry there are no deals at this time, however please enjoy our
            everyday low prices on premium quality pizzas!!!
          </h2>
        )}
      </div>
      <h2 id="bannerDeal">ONLY ONE PROMOTION APPLICABLE PER ORDER</h2>
    </>
  );
};
