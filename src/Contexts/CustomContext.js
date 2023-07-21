import React, { useContext, useState } from 'react';


const CustomContext = React.createContext();

export function useCustom() {
    return useContext(CustomContext)
}

export function CustomProvider({ children }) {
    const [pizzasCustom, setPizzasCustom] = useState({
        CUSTOM:{
            name: 'CUSTOM',
            size: 1,
            toppings: {mozarella: 1,'tomato sauce': 1,}
        },
        RANDOM:{
            name: 'RANDOM',
            size: 1,
            toppingCount: 0.51,
            vegetarian: 'NO MEAT',
            toppings: {mozarella: 1,}
        },
       
    })

    return (
        <CustomContext.Provider value={[pizzasCustom, setPizzasCustom]}>
                { children }
                </CustomContext.Provider>
    )
}