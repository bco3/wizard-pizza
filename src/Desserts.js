import { useState, useEffect } from "react";
import { useOrder } from "./Contexts/OrderContext";
import { useInventory } from "./Contexts/InventoryContext";
import "./desserts.css";
import treat from "./desserts.json";

export const Desserts = () => {
  const [order, setOrder] = useOrder();
  const [inventory, setInventory] = useInventory();
  const [desserts, setDesserts] = useState(treat);
  const [rollCart, setRollCart] = useState("none");
  const [cartCheck, setCartCheck] = useState("none");

  useEffect(() => {
    const timer = setTimeout(() => {
      setRollCart("null");
    }, 700);
    return () => clearTimeout(timer);
  }, [rollCart]);

  // const dessertsUpdateStatus = (e, dessert) => {
  //   let id = desserts[dessert]['dessert_id'];
  //   // let active = status;
  //   console.log(id);
  // return `UPDATE desserts set inventory = inventory - 1 where dessert_id = ${id};`
  // }

  const handleAddToOrder = (e, dessert) => {
    console.log(inventory["desserts"][dessert]);
    let count = 1;
    let serverName = desserts[dessert].name;
    let dessertName = desserts[dessert].name;
    let newdessertName = () => {
      while (order.hasOwnProperty(dessertName)) {
        count++;
        dessertName = serverName + " " + count;
      }
      return dessertName;
    };
    let size = desserts[dessert].size;
    let price = desserts[dessert].price;
    let image = desserts[dessert].image;
    let id = desserts[dessert]["dessert_id"] - 1;
    // setDesserts({...desserts, [dessert]:{...desserts[dessert], 'price': price}});
    let addItem = {
      name: image,
      size: size,
      price: price,
      image: image,
      dessert_id: id,
    };
    //  addItem = {...addItem, 'price': price}
    //  setDesserts({...desserts, [dessert]:{...desserts[dessert], inventory: desserts[dessert].inventory - 1}})
    setInventory({
      ...inventory,
      desserts: {
        ...inventory["desserts"],
        [id]: !inventory["desserts"][id] ? 1 : inventory["desserts"][id] + 1,
      },
    });
    setOrder({ ...order, [newdessertName()]: addItem });
    setRollCart("cartRollClick");
    setCartCheck(desserts[dessert]["dessert_id"]);
    //  const updateDesserts = {
    //   'status' : dessertsUpdateStatus(e, dessert)
    //  }
    //  Axios.post('${process.env.REACT_APP_BACKEND_URL}/updateDesserts', updateDesserts).then(async() => {
    //    await delay(500);
    //    getDesserts();
    // })
  };

  return (
    <>
      <h1 id="bannerDesserts">NO MSG's OR BLACK MAGIC USED</h1>
      <div className="desserts">
        {Object.keys(desserts).map((index, dessert) => {
          if (
            (!inventory["desserts"][desserts[dessert]["dessert_id"] - 1] &&
              desserts[dessert].inventory > 0) |
            (desserts[dessert].inventory >
              inventory["desserts"][desserts[dessert]["dessert_id"] - 1])
          )
            return (
              <section
                className="dessert"
                key={dessert + index}
                onClick={(e) => handleAddToOrder(e, dessert)}
              >
                <div className="dessertTitle">{desserts[dessert]["name"]}</div>
                <img
                  src={`./img/${desserts[dessert]["image"]}.webp`}
                  className="dessertPicture"
                  alt={`${dessert} dessert`}
                ></img>
                <div className="dessertSize">{desserts[dessert]["size"]}</div>
                <div className="dessertDescription">
                  <div
                    style={{
                      fontSize: "1.3rem",
                      transform: "rotate(11deg) translate(-0.25rem, 0.2rem)",
                    }}
                  >
                    $
                  </div>
                  {desserts[dessert]["price"]}
                </div>
                <div
                  className="cartOrderClickDessert"
                  style={{
                    animation: `${
                      cartCheck === desserts[dessert]["dessert_id"]
                        ? rollCart + "dessert 0.7s forwards"
                        : "0"
                    }`,
                  }}
                ></div>
              </section>
            );
        })}
      </div>
    </>
  );
};
