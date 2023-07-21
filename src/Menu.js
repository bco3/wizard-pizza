import {useState, useEffect, useCallback, useRef, useContext} from 'react';
import './menu.css'
import Select from 'react-select'
import { useMenu } from './Contexts/MenuContext';
import { useOrder } from './Contexts/OrderContext';


export const Menu = () => {

  const  [order, setOrder]  = useOrder();

    const  [pizzas, setPizzas]  = useMenu();
    
    const [showToppings, setShowToppings] = useState('none');

    const [rollCart, setRollCart] = useState('none');
    
    const [blurBackground, setBlurBackground] = useState(0);

    const handleSelectSize = useCallback((e, name) => { 
        setPizzas({...pizzas,[name]:{...pizzas[name],size:e.value}});
        setShowToppings(name);
    },[pizzas, setPizzas])

    const handleShowToppingClick=(pizza) => {
        showToppings === pizza ?
        setShowToppings('none') :
        setShowToppings(pizza);
        console.log(showToppings)
    }
    
    const narrowScreen = () =>  window.matchMedia('(min-width: 420px)').matches ? true : false;

    const moveTitle = (pizza) => {
      return showToppings === pizza ? '100%': '0';
   }
    
    const opacity = (pizza) => {
      return showToppings === pizza ? '100%':
      '0%';
    }

    const zIndex = (pizza) => {
      return showToppings === pizza ? 50:
       -1;
    }
    const menuZone = (pizza) => {
      return document.getElementById(pizza + 'container');
    }

    const handleSelectToppingAmount=(e, pizza, topping) => {
        console.log(e.value, pizza, topping)
        const newPizzas = {...pizzas};
        e.value === 0 ?  delete newPizzas[pizza].toppings[topping] && setPizzas(newPizzas) :
        setPizzas({...pizzas, [pizza]:{...pizzas[pizza], toppings: {
            ...pizzas[pizza].toppings,[topping]:e.value}}});
    }

    const handleSelectToppings=(e, pizza) => {
      setPizzas({...pizzas, [pizza]:{...pizzas[pizza], toppings: {
          ...pizzas[pizza].toppings,[e.value]:1}}}) 
    }

    const handleAddToOrder = (e, pizza) => {
         let count = 1;
         let pizzaName = pizza;
         let newPizzaName = () => { while (order.hasOwnProperty(pizzaName)){
          count++; 
          pizzaName = pizza+' '+count}
          return pizzaName}
            let size =  pizzas[pizza].size;
            let toppingCount = Object.values(pizzas[pizza].toppings).reduce((a,b)=>a+b,0);
            let price = Math.round(((9 + toppingCount) * size)*10)/10;
            // setPizzas({...pizzas, [pizza]:{...pizzas[pizza], 'price': price}});
        let addItem = pizzas[pizza];
        addItem = {...addItem, 'price': price}
        setOrder({...order, [newPizzaName()]:addItem});
        setRollCart('cartRollClick')
    }

    useEffect(() =>{
      const timer = setTimeout(() => {
        setRollCart('null');
      }, 1100);
      return () => clearTimeout(timer);
  },[rollCart])
  
    const pizzaPriceCalc = useCallback((pizza) => {
       let size =  pizzas[pizza].size;
       let toppingCount = Object.values(pizzas[pizza].toppings).reduce((a,b)=>a+b,0);
       let price = Math.round(((9 + toppingCount) * size)*10)/10;
       price = price.toString();
       return price.length < 3 ? <div className='price' id={pizza+'price'} style={{transform:'translate(-0.25rem, 0rem)'}}key={pizza}>
         <span style={{fontSize:"1.5rem" ,transform:'rotate(10deg) translate(-0.2rem, 0.3rem)'}}>$</span>
       {price}</div> :
       <div className='price' id={pizza+'price'} key={pizza}><span style={{fontSize:"1.3rem" ,transform:'rotate(13deg) translate(-0.2rem, 0.3rem)'}}>$</span>
        {price.slice(0, 2)} <span style={{fontSize:"1.5rem" ,transform: 'rotate(-20deg) translate(0.05rem, 0.2rem)'}}>{price.slice(2)}</span></div>
        
    },[pizzas])

    const selectSize = [
        { value: 1, label: 'SML'},
        { value: 1.25, label: 'MED' },
        { value: 1.5, label: 'LRG' }
    ]
    const selectDefaultSize = (size) => {
       let indexOfSize = 0;
       indexOfSize = size === 1 ? 0 : size === 1.25 ? 1 : 2;
       return selectSize[indexOfSize];
    }


    const selectToppings = [{
      label: 'cheese',
      options: [
      { value: 'mozarella', label: 'mozarella' },
      { value: 'cheddar', label: 'cheddar' },
      { value: 'feta', label: 'feta' },
      { value: 'parmesan', label: 'parmesan' },
        ]
      },
      {
        label: 'meat',
        options: [
        { value: 'anchovies', label: 'anchovies' },
        { value: 'bacon', label: 'bacon' },
        { value: 'beef', label: 'beef' },
        { value: 'chicken', label: 'chicken' },
        { value: 'ham', label: 'ham' },
        { value: 'italian sausage', label: 'italian sausage' },
        { value: 'meatballs', label: 'meatballs' },
        { value: 'pepperoni', label: 'pepperoni' },
        { value: 'philly steak', label: 'philly steak' },
        { value: 'salami', label: 'salami' },
        { value: 'smoked salmon', label: 'smoked salmon' },
          ]
        },
      {
      label: 'veggies',
      options: [
      { value: 'banana peppers', label: 'banana peppers' },
      { value: 'green peppers', label: 'green peppers' },
      { value: 'jalapenos', label: 'jalapenos' },
      { value: 'mushrooms', label: 'mushrooms' },
      { value: 'olives', label: 'olives' },
      { value: 'onions', label: 'onions' },
      { value: 'pineapple', label: 'pineapple' },
      { value: 'red peppers', label: 'red peppers' },
      { value: 'spinach', label: 'spinach' },
      { value: 'tomatoes', label: 'tomatoes' },
        ]
      },
      {
      label: 'sauce',
      options: [  
      { value: 'alfredo sauce', label: 'alfredo sauce' },
      { value: 'bbq sauce', label: 'bbq sauce' },
      { value: 'hot sauce', label: 'hot sauce' },
      { value: 'ranch sauce', label: 'ranch sauce' },
      { value: 'tomato sauce', label: 'tomato sauce' },
        ]
      },
  ]

    const customSizeStyles = {
        // lightSelected #eacbff   hover #ef94ff   solid #a200ff   highlight #d900ff
        option: (provided, state) => ({
          ...provided,
          display: state.isSelected && 'none',
          fontSize: '32px',
          fontWeight: '900',
          border: 'none',
          borderRadius: '8px',
          textShadow: '3px 4px 3px rgba(0, 0, 0, 0.3)',
          color: state.isSelected ? '#eacbff' :'white',
          background: 'none',
          bottom: '0',
          margin: '0',
          boxShadow: state.isFocused ? null : null,
        //   color: state.isSelected ? '#d900ff' :'#a200ff',
        //   background: state.isSelected ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.315)',
          padding: '2px 0.1rem 2px 4px',
          "&:hover": {
            color: '#d900ff',
            textShadow: '3px 4px 3px rgba(0, 0, 0, 0.7)',
          },
        }),
        control: (base, state) => ({
            ...base,
            // color:'#d900ff',
            background: "none",
            border: 'none',
            borderRadius: '7px',
            // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            // borderColor: state.isFocused ? '#d900ff' : "white",
            boxShadow: state.isFocused ? null : null,
          }),
          menu: (base, state) => ({
            ...base,
            border: 'none',
            // position: 'absolute',
            // borderRadius: '0.5rem',
            background: 'none',
            margin: '0',
            padding: '0',
            // bottom: '0',
            boxShadow: state.isFocused ? null : null,
            // display: 'flex',
            // flexDirection: 'row',
            // width: '17rem',
            // background: "rgba(0, 0, 0, 0.2)",
            // borderRadius: '4px',
            // marginTop: 0,
            // color:'#d900ff'
          }),
          menuList: (base) => ({
            ...base,
            display: 'flex',
            margin: '0',
            width: '115px',
            left: '82px',
            bottom: '-40px',
            padding: '0',
            border: 'none',
            color:'#d900ff',
          }),
          dropdownIndicator: (base, state) => ({
            ...base,
            padding: '2px',
            borderRadius: '50%',
            color: state.isFocused ? 'white': '#d900ff',
            // backgroundImage: 'url(./img/starPink.png)',
            // backgroundSize: '1.8rem',
            // backgroundPosition: 'center',
            background: state.isFocused ? '#a200ff ' : 'white',
            "&:hover": {
                background: '#d900ff',
                color:'white', 
              },
          }),
          singleValue: (base) => ({
            ...base,
            border: 'none',
            textShadow: '3px 4px 3px rgba(0, 0, 0, 0.315)',
            fontSize: '32px',
            padding: 0,
            margin: 0,
            // display: 'flex',
            // flexDirection: 'row',
            // width: '17rem',
            // borderRadius: '4px',
            color:'white',
            // background: "white",
          }),
          valueContainer: (base) => ({
            ...base,
            border: 'none',
            padding: '0 7px 0 0',
            margin: 0,
            // display: 'flex',
            // flexDirection: 'row',
            // width: '17rem',
            // borderRadius: '4px',
            // background: "white",
          }),
          indicatorSeparator: (base) =>({
            ...base,
            display: 'none',
          }),
          input: (base) =>({
            ...base,
            color: 'white',
            "&:hover": {
                color: '#d900ff',
              },
            }),
          menuPortal: (base) =>({
            ...base,
            // left: '15rem',
            bottom: '0',
            padding: '0',
            margin: '0',
            // display: 'inline-block',
            zIndex: 1000,
            // display: 'flex',
            // flexDirection: 'row',
            // width: '17rem',
          }),
          container: (base) =>({
            ...base,
            // bottom: '0',
            padding: '0',
            margin: '0',
          //   display: 'flex',
          //   flexDirection: 'row',
          //   width: '17rem',
            }),
    }

    const selectToppingAmount = [
        { value: 0, label: 'NO THANKS' },
        { value: 0.70, label: 'LIGHT' },
        { value: 1, label: 'REGULAR' },
        { value: 2, label: 'DOUBLE' },
        { value: 0.75, label: 'LEFT HALF' },
        { value: 0.751, label: 'RIGHT HALF' }
    ]

    const toppingAmount = (amount) => selectToppingAmount.findIndex(object => {return object.value === amount;});

    const shortScreen = () =>  window.matchMedia('(max-height: 420px)').matches ? true : false; 

    const customToppingStyles = {
        // lightSelected #eacbff   hover #ef94ff   solid #a200ff   highlight #d900ff
        option: (provided, state) => ({
          ...provided,
          fontSize: '26px',
          zIndex: '100',
          border: 'none',
          // borderRadius: '0.7rem',
          textShadow: '2px 0px 2px rgba(0, 0, 0, 0.3)',
          color: state.isSelected ? '#ef94ff' :'white',
          // background: 'white',
          // color: state.isSelected ? '#d900ff' :'#a200ff',
          // background: state.isSelected ? '#a200ff ' : '#d900ff',
          background: state.isSelected ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.3)',
          padding: '0px 13px',
          "&:hover": {
            color: '#d900ff',
            background: 'white',
            // textShadow: '3px 4px 3px rgba(0, 0, 0, 0.7)',
          },
        }),
        control: (base, state) => ({
            ...base,
            // color:'#d900ff',
            background: "none",
            height: '26px',
            border: 'none',
            bottom: '0px',
            // borderRadius: '0.5rem',
            flexDirection: 'row-reverse',
            // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            // borderColor: state.isFocused ? '#d900ff' : "white",
            boxShadow: state.isFocused ? null : null,
          }),
          menu: (base) => ({
            ...base,
            zIndex: 1000,
            border: 'none',
            // borderRadius: '0.5rem',
            // background: '#d900ff',
            background: 'none',
            overflow: 'hidden',
            width: '120px',
            // background: "rgba(0, 0, 0, 0)",
            // borderRadius: '4px',
            // marginTop: 0,
            // color:'#d900ff'
          }),
          menuList: (base) => ({
            ...base,
            padding: ' 0',
            // border: 'solid 33px rgba(255, 255, 255, 0.466)',
            borderRadius: '8px',
            overflow: 'hidden',
            color:'#d900ff',
            width: '120px',
          }),
          dropdownIndicator: (base, state) => ({
            ...base,
            padding: '1.5px',
            size: '26px',
            borderRadius: '50%',
            margin: '0 0 4px 0',
            color: state.isFocused ? 'white': '#d900ff',
            // backgroundImage: 'url(./img/starPink.png)',
            // backgroundSize: '1.8rem',
            backgroundPosition: 'center',
            background: state.isFocused ? '#a200ff ' : 'white',
            // background: "white",
            "&:hover": {
                background: '#d900ff',
                color:'white', 
              },
          }),
          singleValue: (base) => ({
            ...base,
            border: 'none',
            textShadow: '3px 4px 3px rgba(0, 0, 0, 0.315)',
            fontSize: '23px',
            padding: '0 7px 0 0',
            margin: 0,
            // borderRadius: '4px',
            color:'white',
            // background: "white",
          }),
          valueContainer: (base) => ({
            ...base,
            border: 'none',
            padding: '0 4px 5px',
            margin: 0,
            // borderRadius: '4px',
            // background: "white",
          }),
          indicatorSeparator: (base) =>({
            ...base,
            display: 'none',
          }),
          input: (base) =>({
            ...base,
            color: 'white',
            "&:hover": {
                color: '#d900ff',
              },
          }),
          menuPortal: (base) =>({
            ...base,
            display: 'inline-block',
            zIndex: 1000,
            left: '50%',
            top: shortScreen()? '15px' : '65px',
            transform: 'translateX(-50%) ',
          }),
        
    }

    // const customToppingAddStyles = {
    //   // lightSelected #eacbff   hover #ef94ff   solid #a200ff   highlight #d900ff
    //   option: (provided, state) => ({
    //     ...provided,
    //     fontSize: '1.7rem',
    //     zIndex: '100',
    //     border: 'none',
    //     // borderRadius: '0.7rem',
    //     textShadow: '2px 3px 2px rgba(0, 0, 0, 0.3)',
    //     color: state.isSelected ? '#ef94ff' :'white',
    //     // background: 'white',
    //     // color: state.isSelected ? '#d900ff' :'#a200ff',
    //     background: state.isSelected ? '#a200ff' : '#d900ff',
    //     padding: '2px 4px 2px 4px',
    //     "&:hover": {
    //       color: '#d900ff',
    //       background: 'white',
    //       // textShadow: '3px 4px 3px rgba(0, 0, 0, 0.7)',
    //     },
    //   }),
    //   control: (base, state) => ({
    //       ...base,
    //       // color:'#d900ff',
    //       background: "none",
    //       border: 'none',
    //       bottom: '-0.1rem',
    //       borderRadius: '0.5rem',
    //       flexDirection: 'row-reverse',
    //       // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
    //       // borderColor: state.isFocused ? '#d900ff' : "white",
    //       boxShadow: state.isFocused ? null : null,
    //     }),
    //     menu: (base) => ({
    //       ...base,
    //       zIndex: 1000,
    //       border: 'none',
    //       // borderRadius: '0.5rem',
    //       // background: 'white',
    //       background: "rgba(0, 0, 0, 0)",
    //       // borderRadius: '4px',
    //       // marginTop: 0,
    //       // color:'#d900ff'
    //     }),
    //     menuList: (base) => ({
    //       ...base,
    //       padding: '0rem',
    //       border: 'solid 4px #a200ff',
    //       borderRadius: '0.5rem',
    //       color:'#d900ff',
    //       width: '11rem',
    //       height: '15rem',
    //       scrollbarColor: '#a200ff #ffffff',
    //       scrollbarWidth: 'thin',
    //     }),
    //     groupHeading: (base) => ({
    //       ...base,
    //       padding: '0rem 4px',
    //       fontWeight: '700',
    //       color:'white',
    //       background: '#a200ff',
    //     }),
    //     group: (base) => ({
    //       ...base,
    //       padding: '0.5rem 0 0rem',
    //       color:'white',
    //       background: '#a200ff',
    //     }),
    //     dropdownIndicator: (base, state) => ({
    //       ...base,
    //       padding: '0.1rem',
    //       size: '2rem',
    //       // height:'1.5rem',
    //       // width: '1.5rem',
    //       borderRadius: '50%',
    //       color: "rgba(0, 0, 0, 0)",
    //       // color: state.isFocused ? 'white': '#d900ff',
    //       backgroundImage: state.isFocused ? 'url(./img/addToppingFocused.png)' :'url(./img/addToppings.png)',
    //       // backgroundSize: '1.5rem',
    //       backgroundSize: '1.8rem',
    //       backgroundPosition: 'center',
    //       // background: state.isFocused ? '#a200ff ' : 'white',
    //       // background: "white",
    //       "&:hover": {
    //         backgroundImage:'url(./img/addToppingHover.png)',
    //           // background: '#d900ff',
    //           color:"rgba(0, 0, 0, 0)", 
    //         },
    //     }),
    //     singleValue: (base) => ({
    //       ...base,
    //       border: 'none',
    //       textShadow: '3px 4px 3px rgba(0, 0, 0, 0.315)',
    //       fontSize: '1.75rem',
    //       padding: '0 0.5rem 0 0',
    //       margin: 0,
    //       // borderRadius: '4px',
    //       color:'white',
    //       // background: "white",
    //     }),
    //     valueContainer: (base) => ({
    //       ...base,
    //       border: 'none',
    //       padding: '0 4px',
    //       margin: 0,
    //       // borderRadius: '4px',
    //       // background: "white",
    //     }),
    //     indicatorSeparator: (base) =>({
    //       ...base,
    //       display: 'none',
    //     }),
    //     input: (base) =>({
    //       ...base,
    //       color: 'white',
    //       fontSize: '1.7rem',
    //       textShadow: '3px 4px 3px rgba(0, 0, 0, 0.315)',
    //     }),
    //     placeholder: (base) =>({
    //       ...base,
    //       color: 'white',
    //       fontSize: '1.7rem',
    //       textShadow: '3px 4px 3px rgba(0, 0, 0, 0.315)',
    //     }),
    //     menuPortal: (base) =>({
    //       ...base,
    //       zIndex: 1000,
    //       left: '13rem',
    //       top: '4.6rem',
    //     }),
      
    // }
    const customToppingAddStyles = {
      // lightSelected #eacbff   hover #ef94ff   solid #a200ff   highlight #d900ff
      option: (provided, state) => ({
        ...provided,
        fontSize: '26px',
        zIndex: '100',
        border: 'none',
        // borderRadius: '0.7rem',
        textShadow: '2px 0px 2px rgba(0, 0, 0, 0.3)',
        color: state.isSelected ? '#ef94ff' :'white',
        // background: 'white',
        // color: state.isSelected ? '#d900ff' :'#a200ff',
        // background: state.isSelected ? '#a200ff ' : '#d900ff',
        background: state.isSelected ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)',
        padding: '0px 13px',
        "&:hover": {
          color: '#d900ff',
          background: 'white',
          // textShadow: '3px 4px 3px rgba(0, 0, 0, 0.7)',
        },
      }),
      control: (base, state) => ({
          ...base,
          // color:'#d900ff',
          background: "none",
          height: '26px',
          border: 'none',
          bottom: '0px',
          // borderRadius: '0.5rem',
          flexDirection: 'row-reverse',
          // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
          // borderColor: state.isFocused ? '#d900ff' : "white",
          boxShadow: state.isFocused ? null : null,
        }),
        menu: (base) => ({
          ...base,
          zIndex: 1000,
          border: 'none',
          // borderRadius: '0.5rem',
          // background: '#d900ff',
          // background: 'none',
          overflow: 'hidden',
          width: '165px',
          background: 'rgba(0, 0, 0, 0.3)',
          // borderRadius: '4px',
          // marginTop: 0,
          // color:'#d900ff'
        }),
        menuList: (base) => ({
          ...base,
          padding: ' 0',
          // border: 'solid 33px rgba(255, 255, 255, 0.466)',
          borderRadius: '8px',
          // overflow: 'hidden',
          color:'#d900ff',
          width: '165px',
          height: '210px',
          scrollbarColor: '#00eeff #ffffff',
          scrollbarWidth: 'thin',
        }),
        singleValue: (base) => ({
          ...base,
          border: 'none',
          textShadow: '3px 4px 3px rgba(0, 0, 0, 0.315)',
          fontSize: '23px',
          padding: '0 7px 0 0',
          margin: 0,
          // borderRadius: '4px',
          color:'white',
          // background: "white",
        }),
        valueContainer: (base) => ({
          ...base,
          border: 'none',
          padding: '0 4px 5px',
          margin: 0,
          // borderRadius: '4px',
          // background: "white",
        }),
        indicatorSeparator: (base) =>({
          ...base,
          display: 'none',
        }),
        input: (base) =>({
          ...base,
          color: 'white',
          "&:hover": {
              color: '#d900ff',
            },
        }),
        menuPortal: (base) =>({
          ...base,
          display: 'inline-block',
          zIndex: 1000,
          left: '50%',
          top: shortScreen()? '5px' : '65px',
          transform: 'translateX(-50%) ',
        }),
      
        groupHeading: (base) => ({
          ...base,
          padding: '3px 5px',
          fontWeight: '700',
          color:'white',
          background: '#a200ff70',
        }),
        group: (base) => ({
          ...base,
          padding: '0.5rem 0 0rem',
          color:'white',
          // background: '#a200ff',
        }),
        dropdownIndicator: (base, state) => ({
          ...base,
          padding: '1.5px',
          size: '26px',
          // height:'1.5rem',
          // width: '1.5rem',
          borderRadius: '50%',
          margin: '0 0 4px 0',
          color: "rgba(0, 0, 0, 0)",
          // color: state.isFocused ? 'white': '#d900ff',
          backgroundImage: state.isFocused ? 'url(./img/addToppingFocused.png)' :'url(./img/addToppings.png)',
          // backgroundSize: '1.5rem',
          backgroundSize: '1.8rem',
          backgroundPosition: 'center',
          // background: state.isFocused ? '#a200ff ' : 'white',
          // background: "white",
          "&:hover": {
            backgroundImage:'url(./img/addToppingHover.png)',
              // background: '#d900ff',
              color:"rgba(0, 0, 0, 0)", 
            },
        }),
        placeholder: (base) =>({
          ...base,
          color: 'white',
          fontSize: '23px',
          textShadow: '3px 4px 3px rgba(0, 0, 0, 0.315)',
        }),
      
    }

    const rotateStar = (pizza, index) => {
    if (showToppings !== pizza){
   return index === 0 ? '-25' : index === 1 ? '15' : index === 2 ? '-18' : index === 3 ? '10' : 
   index === 4 ? '-30' : index === 5 ? '22' : index === 6 ? '-35' : index === 7 ? '-20' :
   index === 8 ? '-25' : index === 9 ? '15' : index === 10 ? '-18' : index === 11 ? '10' : '0';}
   return '0'
    }

    const pizzaBuilder = () => {
    return Object.keys(pizzas).map((pizza, index) => {      
        return(
        <section className='prebuiltPizza' id={pizza + 'container'} key={pizza + index}>
            <div className='bgBlur' id={pizza + 'bgBlur'} style={{filter: `blur(${blurBackground}px)`}} key={pizza + 'bgBlur'}>
            <img src={`./img/${pizza}.webp`} className='pizzaPicture' onClick={(e) => handleShowToppingClick(pizza)} alt={`${pizza} Pizza`} ></img>
            <h2 className='prebuiltPizzaTitle3' style={{left: moveTitle(pizza), transform: `translateX(-${moveTitle(pizza)})`}}>{pizza}</h2>
            <h2 className='prebuiltPizzaTitle2' style={{left: moveTitle(pizza), transform: `translateX(-${moveTitle(pizza)})`}}>{pizza}</h2>
            <h2 className='prebuiltPizzaTitle' onClick={(e) => handleShowToppingClick(pizza)} 
                  style={{left: moveTitle(pizza), transform: `translateX(-${moveTitle(pizza)})`}}>{pizza}</h2>
                <div className='editPizza' style={{zIndex: zIndex(pizza), opacity: opacity(pizza)}} key={index+pizza}>
                {Object.entries(pizzas[pizza].toppings).map(([topping,amount],index) => {
                  return(<div className='toppingName' key={topping+pizza+index}>{topping}
                        <Select className='topping' 
                            options={selectToppingAmount}
                            isSearchable={false}
                            menuPortalTarget={menuZone(pizza)}
                            closeMenuOnSelect={true}
                            blurInputOnSelect={true}
                            defaultValue={selectToppingAmount[toppingAmount(amount)]} 
                            styles={customToppingStyles} 
                            onFocus={() => setBlurBackground(1.5)}
                            onBlur={() => setBlurBackground(0)}
                            onChange={(e)=> handleSelectToppingAmount(e, pizza, topping)} />
                        </div>)})}
                        <div className='addTopping' >topping <Select className='topping' options={selectToppings}
                            isSearchable={!shortScreen()}
                            menuPortalTarget={menuZone(pizza)}
                            onChange={(e)=> handleSelectToppings(e, pizza)}
                            closeMenuOnSelect={true}
                            blurInputOnSelect={true}
                            onFocus={() => setBlurBackground(1.5)}
                            onBlur={() => setBlurBackground(0)}
                            styles={customToppingAddStyles} /></div>
                        </div>
                <Select 
                      options={selectSize}
                      isSearchable={false}
                      menuPortalTarget={menuZone(pizza)}
                      defaultValue={selectDefaultSize(pizzas[pizza].size)}
                      closeMenuOnScroll={() => true
                      }
                      menuPosition="fixed" 
                      // menuPosition="absolute" 
                      closeMenuOnSelect={true}
                      menuPlacement='top'
                      styles={customSizeStyles} 
                      onChange={(e)=> handleSelectSize(e, pizza)} className='pizzaSize' 
                />

                      {/* <div className='starFraming' style={{transform:`rotate(${rotateStar(index+1)}deg)`}} ></div> */}
                      {/* <div className='starFraming2' style={{transform:`rotate(${rotateStar(index+3)}deg)`}} ></div> */}
                      <div className='starPrice' onClick={(e) => handleShowToppingClick(pizza)} style={{transform:`rotate(${rotateStar(pizza, index)}deg)`, bottom:`${showToppings === pizza? '2rem' : '-1.3rem'}`}} >
                      {pizzaPriceCalc(pizza)}</div>
                      
                      <div className='addToOrderContainer' onClick={(e)=>handleAddToOrder(e, pizza)} style={{bottom:`${showToppings === pizza? '0rem' : '-3rem'}`}} >
                          <div className='addToOrder' ><sect className='orderPlus'>+</sect>ORDER</div>
                          <div className='cartOrderClick' style={{animation:`${rollCart} 1.1s forwards`}}></div>
                      </div>
                      {/* <div className='addToOrderBackground' ></div> */}
                      </div>
        </section>
    
        )}
        )
    }
    return ( <div className='menuWrapper'>
        <h1 id = 'bannerMenu'>PIZZA MADE BY WIZARDS, FOR WIZARDS</h1>
        <div className="menu">
            {pizzaBuilder()}
        </div>
      </div>
)
}