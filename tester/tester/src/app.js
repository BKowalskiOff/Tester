import React from 'react';

import Header from './header';
import Footer from './footer';
import { MainContainer } from './main-container';

export function App(props){


    return (
        <div className="app">
            <Header />
            <MainContainer />
            <Footer />
        </div>
    );

}
