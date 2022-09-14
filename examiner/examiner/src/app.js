import React from 'react';
import Header from './header';
import Footer from './footer';
import MainContainer from './main-container';

class App extends React.Component {

    constructor(props){

        super(props); 
        const sessionPage = sessionStorage.getItem("CurrentPage");

        this.state = sessionPage === null ? {
                                                page: 'results',

                                            } : {
                                                page: sessionPage,
                                            };
    }

    handleGeneratorPageLoadClick(){

        this.setState({
                page: "generator",
            }, 
            () => sessionStorage.setItem("CurrentPage", "generator")
        );
        
    }

    handleResultsPageLoadClick(){

        this.setState({
                page: "results",
            }, 
            () => sessionStorage.setItem("CurrentPage", "results")
        );

    }

    render () {
        return (
            <div className="app">
                <Header
                        generatorOnClick = {() => this.handleGeneratorPageLoadClick()}
                        resultsOnClick = {() => this.handleResultsPageLoadClick()}
                />
                <MainContainer currentPage={this.state.page}/>
                <Footer/>
            </div>
        );
    }
}

export default App;