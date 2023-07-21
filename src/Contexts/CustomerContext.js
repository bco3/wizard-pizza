import React, { useContext, useState } from 'react';

const CustomerContext = React.createContext();

export function useCustomer() {
    return useContext(CustomerContext)
}

export function CustomerProvider({ children }) {
    const [customer, setCustomer] = useState({'name': null, 'phone number': null, 'email': null})

    return (
        <CustomerContext.Provider value={[customer, setCustomer]}>
                { children }
                </CustomerContext.Provider>
    )
}