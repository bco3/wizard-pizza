import React, { useContext, useState } from 'react';

const InventoryContext = React.createContext();

export function useInventory() {
    return useContext(InventoryContext)
}

export function InventoryProvider({ children }) {
    const [inventory, setInventory] = useState({'drinks':{}, 'desserts':{}})

    return (
        <InventoryContext.Provider value={[inventory, setInventory]}>
                { children }
                </InventoryContext.Provider>
    )
}