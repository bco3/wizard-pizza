import React, { useContext, useState } from 'react';
import { CustomProvider } from './CustomContext';
import { OrderProvider } from './OrderContext';
import { DiscountsProvider } from './DiscountsContext';
import { CustomerProvider } from './CustomerContext';
import { InventoryProvider } from './InventoryContext';

const MenuContext = React.createContext();

export function useMenu() {
    return useContext(MenuContext)
}

export function MenuProvider({ children }) {
    const [pizzas, setPizzas] = useState({
        CHEESE:{
            name: 'CHEESE',
            size: 1,
            toppings: {mozarella: 1, 'tomato sauce': 1, cheddar: 1, parmesan: 1}
        },
        PEPPERONI:{
            name: 'PEPPERONI',
            size: 1,
            toppings: {mozarella: 1, 'tomato sauce': 1, pepperoni: 2}
        },
        VEGGIE:{
            name: 'VEGGIE',
            size: 1,
            toppings: {mozarella: 1, 'tomato sauce': 1, tomatos: 1, mushrooms: 1, 'green peppers': 1, onions: 1, olives: 1}
        },
        CLASSIC:{
            name: 'CLASSIC',
            size: 1,
            toppings: {mozarella: 1, 'tomato sauce': 1, pepperoni: 1, 'italian sausage': 1, 'green peppers': 1, 'onions': 1, 'mushrooms': 1}
        },
        HAWAIIAN:{
            name: 'HAWAIIAN',
            size: 1,
            toppings: {mozarella: 1, 'tomato sauce': 1, 'bacon': 1, 'pineapple': 1}
        },
        CARNIVORE:{
            name: 'CARNIVORE',
            size: 1,
            toppings: {mozarella: 1, 'tomato sauce': 1, pepperoni: 1, 'bacon': 1, 'beef': 1, 'italian sausage': 1}
        },
        'BBQ-CHIC':{
            name: 'BBQ-CHIC',
            size: 1,
            toppings: {mozarella: 1, 'bbq sauce': 1, 'cheddar': 1, 'chicken': 1, 'red peppers': 1, 'onions': 1}
        },
        RANCHER:{
            name: 'RANCHER',
            size: 1,
            toppings: {mozarella: 1, 'ranch sauce': 1, 'chicken': 1, 'bacon': 1, 'onions': 1, 'tomatos': 1}
        }
    })

    return (
        <MenuContext.Provider value={[pizzas, setPizzas]}>
            <CustomProvider>
            <OrderProvider>
            <DiscountsProvider>
            <CustomerProvider>
            <InventoryProvider>
                { children }
                </InventoryProvider>
                </CustomerProvider>
                </DiscountsProvider>
                </OrderProvider>
                </CustomProvider>
                </MenuContext.Provider>
    )
}