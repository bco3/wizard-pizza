import React from 'react';
import {useState, useEffect} from 'react';
import {Home} from './Home';
import {Menu} from './Menu';
import {Custom} from './Custom';
import {Deals} from './Deals';
import {Order} from './Order';
import { WizardHeader } from './WizardHeader';
import { MenuProvider } from './Contexts/MenuContext';
import { OrderProvider } from './Contexts/OrderContext';
import { useOrder } from './Contexts/OrderContext';
// import { useMenu } from './Contexts/MenuContext';
// import { CustomProvider } from './Contexts/CustomContext';
import './header.css';
// import './menu.css';
// import Select from 'react-select'


export const App = () => {


return (
    <>
    {/* <Cursor />
     <main className="container mx-auto px-2 md:px-0"> */}
<MenuProvider>
 <WizardHeader/></MenuProvider>
 {/* </main> */}
 </>
)
};
