import React from 'react';
import GeneratorForm from './generator-form';
import ResultsView from './results-view';

class MainContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            currentPage: props.currentPage,

        }
       
    }

    render(){
        if (this.props.currentPage === "results"){

             return (
                <div  id="main-container" className="app-results_container">
                    <p>WYNIKI TESTÓW</p> 
                    <ResultsView />
                </div>
            );

        }else if (this.props.currentPage === "generator"){
            return (
                <div  id="main-container" className="app-generator_container">
                    <GeneratorForm/>
                </div>
            );
        }
    }

}

export default MainContainer;