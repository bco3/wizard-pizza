import React, { useContext, useState } from 'react';

const DiscountsContext = React.createContext();

export function useDiscounts() {
    return useContext(DiscountsContext)
}

export function DiscountsProvider({ children }) {
    const [discounts, setDiscounts] = useState(0)

    return (
        <DiscountsContext.Provider value={[discounts, setDiscounts]}>
                { children }
                </DiscountsContext.Provider>
    )
}