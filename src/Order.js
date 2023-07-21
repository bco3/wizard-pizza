import { useState, useCallback, useEffect } from "react";
import "./order.css";
import { useOrder } from "./Contexts/OrderContext";
import { useCustomer } from "./Contexts/CustomerContext";
import { useInventory } from "./Contexts/InventoryContext";
import special from "./deals.json";

export const Order = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useOrder();
  const [inventory, setInventory] = useInventory();
  const [dealOrder, setDealOrder] = useState({});
  const [orderId, setOrderId] = useState(0);
  const [customer, setCustomer] = useCustomer();
  const [showWizardProgress, setShowWizardProgress] = useState(0);
  const [showWizardNoPizza, setShowWizardNoPizza] = useState(0);
  // const [deals, setDeals] = useState(special);
  const [totals, setTotals] = useState({
    "sub-total": 0,
    discount: 0,
    tax: 0,
    total: 0,
  });
  const [waitTime, setWaitTime] = useState(0);
  const [timeTillReady, setTimeTillReady] = useState(0);
  const [defaultTime, setDefaultTime] = useState();
  const [inputTimeValue, setInputTimeValue] = useState();
  const [openHours, setOpenHours] = useState();
  const [desserts, setDesserts] = useState();
  const [drinks, setDrinks] = useState();

  // console.log(orderDeal());
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

  const orderPriceCalc = useCallback(
    (name) => {
      let price = order[name].price;
      price = price.toString();
      return price.length < 3 ? (
        <div
          className="orderItemPrice"
          id={name + "price"}
          style={{ transform: "translate(-0.25rem, 0rem)" }}
          key={name}
        >
          <span
            style={{
              fontSize: "1.2rem",
              transform: "rotate(10deg) translate(-0.2rem, 0.25rem)",
            }}
          >
            $
          </span>
          {price}
        </div>
      ) : (
        <div className="orderItemPrice" id={name + "price"} key={name}>
          <span
            style={{
              fontSize: "1.2rem",
              transform: "rotate(13deg) translate(-0.2rem, 0.25rem)",
            }}
          >
            $
          </span>
          {price.slice(0, 2)}{" "}
          <span
            style={{
              fontSize: "1.3rem",
              transform: " translate(0rem, 0.2rem)",
            }}
          >
            {price.slice(2)}
          </span>
        </div>
      );
    },
    [order]
  );

  const selectSize = [
    { value: 1, label: "SML" },
    { value: 1.25, label: "MED" },
    { value: 1.5, label: "LRG" },
  ];

  const orderSizes = ["SML", "MED", "LRG"];

  const orderSize = (amount) => {
    let index = selectSize.findIndex((object) => {
      return object.value === amount;
    });
    return orderSizes[index];
  };

  const selectToppingAmount = [
    { value: 0, label: "NO THANKS" },
    { value: 0.7, label: "LIGHT" },
    { value: 1, label: "REGULAR" },
    { value: 2, label: "DOUBLE" },
    { value: 0.75, label: "LEFT HALF" },
    { value: 0.751, label: "RIGHT HALF" },
  ];
  const selectToppingAmountAbbrev = [
    "NON",
    "LGHT",
    "REG",
    "DBL",
    "L HALF",
    "R HALF",
  ];

  const abbreviateAmount = (amount) => {
    let index = selectToppingAmount.findIndex((object) => {
      return object.value === amount;
    });
    return selectToppingAmountAbbrev[index];
  };

  const handleRemoveClick = (e, orderItems) => {
    const newOrder = { ...order };
    const newDealOrder = { ...dealOrder };
    console.log(orderItems);
    console.log(inventory);
    // console.log(dealOrder);
    // console.log(order);
    delete newOrder[orderItems] &&
      setOrder(newOrder) &&
      delete newDealOrder[orderItems] &&
      setDealOrder(newOrder);
    if (order[orderItems]["drink_id"]) {
      setInventory({
        ...inventory,
        drinks: {
          ...inventory["drinks"],
          [order[orderItems]["drink_id"]]:
            inventory["drinks"][order[orderItems]["drink_id"]] - 1,
        },
      });
      // const updateDrinks = {
      //   'status' : drinksUpdateStatus(e, orderItems)
      //  }
      //  Axios.post('${process.env.REACT_APP_BACKEND_URL}/updateDrinks', updateDrinks);
    } else if (order[orderItems]["dessert_id"]) {
      setInventory({
        ...inventory,
        desserts: {
          ...inventory["desserts"],
          [order[orderItems]["dessert_id"]]:
            inventory["desserts"][order[orderItems]["dessert_id"]] - 1,
        },
      });
      // const updateDesserts = {
      //   'status' : dessertsUpdateStatus(e, orderItems)
      //  }
      //  Axios.post('${process.env.REACT_APP_BACKEND_URL}/updateDesserts', updateDesserts);
    }
  };

  const priceTotal = useCallback(
    (name, discount) => {
      let subTotal = 0;
      let discountTotal = 0;
      let orderSorted = Object.keys(order).sort(
        (a, b) => order[b].price - order[a].price
      );
      if (name === "BOGO") {
        orderSorted.map((pizza, index) => {
          return (
            index % 2 !== 0 &&
            (discountTotal += (order[pizza].price * discount) / 100)
          );
        });
      } else if (name === "SAVE") {
        Object.keys(order).map((pizza, index) => {
          return (discountTotal += (order[pizza].price * discount) / 100);
        });
      } else if (name) {
        Object.keys(order).map((pizza, index) => {
          let regex = new RegExp(name);
          return (
            regex.test(pizza) &&
            (discountTotal += (order[pizza].price * discount) / 100)
          );
        });
      }
      Object.keys(order).map((orderItems, index) => {
        return (subTotal += order[orderItems].price);
      });
      subTotal = Math.round(subTotal * 100) / 100;
      discountTotal += 0;
      let tax = Math.round(subTotal * 0.05 * 100) / 100;
      let total = Math.round((subTotal - discountTotal + tax) * 100) / 100;
      return total;
    },
    [order]
  );

  const priceTotals = useCallback(
    (name, discount) => {
      let subTotal = 0;
      let discountTotal = 0;
      let orderSorted = Object.keys(order).sort(
        (a, b) => order[b].price - order[a].price
      );
      if (name === "BOGO") {
        orderSorted.map((pizza, index) => {
          return order[pizza].toppings && index % 2 !== 0
            ? ((discountTotal += (order[pizza].price * discount) / 100),
              setDealOrder((prevOrder) => ({
                ...prevOrder,
                [pizza]: {
                  ...prevOrder[pizza],
                  discounts: `${order[pizza].price} - ${
                    Math.round(order[pizza].price * discount) / 100
                  }`,
                },
              })))
            : setDealOrder((prevOrder) => ({
                ...prevOrder,
                [pizza]: {
                  ...prevOrder[pizza],
                  discounts: `${order[pizza].price}`,
                },
              }));
        });
      } else if (name === "SAVE") {
        Object.keys(order).map((pizza, index) => {
          return order[pizza].toppings
            ? ((discountTotal += (order[pizza].price * discount) / 100),
              setDealOrder((prevOrder) => ({
                ...prevOrder,
                [pizza]: {
                  ...prevOrder[pizza],
                  discounts: `${order[pizza].price} - ${
                    Math.round(order[pizza].price * discount) / 100
                  }`,
                },
              })))
            : setDealOrder((prevOrder) => ({
                ...prevOrder,
                [pizza]: {
                  ...prevOrder[pizza],
                  discounts: `${order[pizza].price}`,
                },
              }));
        });
      } else if (name) {
        Object.keys(order).map((pizza, index) => {
          let regex = new RegExp(name);
          return regex.test(pizza)
            ? ((discountTotal += (order[pizza].price * discount) / 100),
              setDealOrder((prevOrder) => ({
                ...prevOrder,
                [pizza]: {
                  ...prevOrder[pizza],
                  discounts: `${order[pizza].price} - ${
                    Math.round(order[pizza].price * discount) / 100
                  }`,
                },
              })))
            : setDealOrder((prevOrder) => ({
                ...prevOrder,
                [pizza]: {
                  ...prevOrder[pizza],
                  discounts: `${order[pizza].price}`,
                },
              }));
        });
      }
      Object.keys(order).map((orderItems, index) => {
        return (subTotal += order[orderItems].price);
      });
      subTotal = Math.round(subTotal * 100) / 100;
      discountTotal += 0;
      let tax = Math.round(subTotal * 0.05 * 100) / 100;
      let total = Math.round((subTotal - discountTotal + tax) * 100) / 100;

      setTotals({
        "sub-total": subTotal,
        discount: discountTotal,
        tax: tax,
        total: total,
      });
    },
    [order]
  );

  useEffect(() => {
    let bestDeal = 0;
    let bestIndex = 0;
    if (deals[0]) {
      deals.forEach((deal, index) => {
        let currentDeal = priceTotal(
          deals[index]["deal_name"],
          deals[index].discount
        );
        return bestDeal === 0
          ? ((bestDeal = currentDeal), (bestIndex = index))
          : bestDeal > currentDeal
          ? ((bestDeal = currentDeal), (bestIndex = index))
          : bestDeal;
        // priceTotal(deals[index].name, deals[index].discount)
      });
      priceTotals(deals[bestIndex]["deal_name"], deals[bestIndex].discount);
      console.log(deals[bestIndex]["deal_name"]);
    } else {
      priceTotals(null, null);
      console.log("not loaded");
    }
  }, [order, deals, priceTotal, priceTotals, loading]);

  const checkoutOrder = () => {
    let checkout = {};
    Object.keys(order).map((orderItems, index) => {
      let toppingsAndAmount = {};
      let sauceAndAmount = {};
      let cheeseAndAmount = {};
      if (order[orderItems].toppings) {
        Object.entries(order[orderItems].toppings).map(
          ([topping, amount], index) => {
            topping === "cheddar" || topping === "mozarella"
              ? (cheeseAndAmount[topping] = abbreviateAmount(amount))
              : topping === "alfredo sauce" ||
                topping === "bbq sauce" ||
                topping === "ranch sauce" ||
                topping === "tomato sauce"
              ? (sauceAndAmount[topping] = abbreviateAmount(amount))
              : (toppingsAndAmount[topping] = abbreviateAmount(amount));
          }
        );
        Object.assign(checkout, {
          [orderItems]: {
            size: orderSize(order[orderItems].size),
            sauce: sauceAndAmount,
            cheese: cheeseAndAmount,
            toppings: toppingsAndAmount,
          },
        });
      }
    });
    return JSON.stringify(checkout);
  };

  const otherOrders = () => {
    let checkout = {};
    Object.keys(order).map((orderItems, index) => {
      if (!order[orderItems].toppings) {
        Object.assign(checkout, {
          [orderItems]: {
            name: order[orderItems].name,
            size: order[orderItems].size,
          },
        });
      }
    });
    return JSON.stringify(checkout);
  };

  const customerOrder = {
    customer: customer,
    orderCheckout: checkoutOrder(),
    totals: totals,
    scheduledTime: inputTimeValue,
    otherOrders: otherOrders(),
  };

  return (
    <>
      <h1 id="bannerOrder">THANK YOU FOR CHOOSING YOUR LOCAL WIZARD!</h1>
      <div className="orderContainer">
        <div className="order">
          {Object.keys(order).map((orderItems, index) => {
            return (
              <section
                className="orderItem"
                id={orderItems + "container"}
                key={orderItems + index}
              >
                {order[orderItems].toppings ? (
                  <>
                    <img
                      src={`./img/${order[orderItems].name}.webp`}
                      className="orderPicture"
                      alt={`${orderItems}`}
                      key={orderItems + "BGimage" + index}
                    ></img>
                    <div
                      className="imageDimmer"
                      key={"imageDimmer" + index}
                    ></div>
                    <h2 className="orderTitle" key={"orderTitle" + index}>
                      {orderItems}
                      <span className="orderSize" key={"orderSize" + index}>
                        {" "}
                        {orderSize(order[orderItems].size)}
                      </span>
                    </h2>
                  </>
                ) : (
                  <>
                    <img
                      src={`./img/${order[orderItems].image}.webp`}
                      className="orderPictureDrink"
                      alt={`${orderItems}`}
                      key={orderItems + "BGimage" + index}
                    ></img>
                    <div
                      className="imageDimmer"
                      key={"imageDimmer" + index}
                    ></div>
                    <h2 className="orderTitle" key={"orderTitle" + index}>
                      {order[orderItems].name}
                    </h2>
                  </>
                )}

                <div
                  className="editOrder"
                  key={index + orderItems + "toppings"}
                >
                  {order[orderItems].toppings ? (
                    Object.entries(order[orderItems].toppings).map(
                      ([topping, amount], index) => {
                        return (
                          <div
                            className="orderTopping"
                            key={topping + orderItems + index}
                          >
                            {topping}
                            <div
                              className="orderToppingAmount"
                              key={topping + "toppingAmount" + index}
                            >
                              {" "}
                              {abbreviateAmount(amount)}
                            </div>
                          </div>
                        );
                      }
                    )
                  ) : (
                    <div className="orderTopping" key={orderItems + index}>
                      {order[orderItems].size}
                    </div>
                  )}
                </div>
                <div
                  className="editOrderContainer"
                  key={"editOrderContainer" + index}
                  onClick={(e) => handleRemoveClick(e, orderItems)}
                ></div>
                {orderPriceCalc(orderItems)}
              </section>
            );
          })}
        </div>
        <div className="yourOrder">
          <h2>YOUR WIZARD ORDER</h2>
          {Object.keys(dealOrder).map((pizza, index) => {
            return (
              <>
                <div className="tally" key={"tally" + index}>
                  {pizza}
                </div>
                <div className="tallyPrice" key={"tallyPrice" + index}>
                  ${dealOrder[pizza]["discounts"]}
                </div>
              </>
            );
          })}
          <div className="sub-total">Sub-Total</div>
          <span>${totals["sub-total"]}</span>
          <div className="discount">Discounts</div>
          <span>-${totals.discount}</span>
          <div className="tax">Tax 5% GST</div>
          <span>+${totals.tax}</span>
          <div className="total">Total</div>
          <span>${totals.total}</span>
        </div>
      </div>
    </>
  );
};
