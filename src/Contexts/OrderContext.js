import React, { useContext, useState } from 'react';

const OrderContext = React.createContext();

export function useOrder() {
    return useContext(OrderContext)
}

export function OrderProvider({ children }) {
    const [order, setOrder] = useState({})

    return (
        <OrderContext.Provider value={[order, setOrder]}>
                { children }
                </OrderContext.Provider>
    )
}