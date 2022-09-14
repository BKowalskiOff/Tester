import React from 'react';

import ResultsNav from './results-nav';
import { ResultsFilter } from './results-filter';

import { ResultsService } from './results-service';

const noTestResultsPerPage = 4;

const isTestingResultsService = false;

class ResultsView extends React.Component {

    constructor(props) {
        
        super(props);

        const testsPage = sessionStorage.getItem("TestsPageNumber");
        this.state = testsPage === null ? {
                                            pageNumber: 1,
                                            results: undefined,
                                            
                                        } : {
                                            pageNumber: Number(testsPage),
                                            results: undefined,
                                            
                                        };
                                        
        this.resultsService = new ResultsService(isTestingResultsService);

    }

    componentDidMount(){

        const setState = this.setState.bind(this);
        this.resultsService.getResults(this.state.pageNumber).then((results) => setState({results: results}));

    }

    handleUseFilters(id, name, surname, topic){
        this.setState({
            pageNumber: 1,
            filter: {
                "id": id,
                "name": name,
                "surname": surname,
                "topic": topic
                },
            }, 
            () => sessionStorage.setItem("TestsPageNumber", this.state.pageNumber)
        );
    }

    renderResultsList(tests, pageNumber, filter){

        var resultsToShow;

        if (filter !== undefined){

            console.log(filter);
            if (filter["id"] !== ""){
                tests = tests.filter((test) => (test.id === Number(filter["id"])));
            }
            tests = tests.filter((test) => (test.name.includes(this.state.filter["name"]) && 
                                            test.surname.includes(this.state.filter["surname"]) && 
                                            test.topic.includes(this.state.filter["topic"]))
                                );
        }

        var startIndex = noTestResultsPerPage * (pageNumber - 1);
        var endIndex = startIndex + noTestResultsPerPage;

        resultsToShow = tests.slice(startIndex, endIndex);
        resultsToShow = resultsToShow.concat(Array(noTestResultsPerPage - resultsToShow.length).fill(null));
       
        var resultsListContent = resultsToShow.map((test, index) => {
            if (test === null){

                return (
                    <tr key = {index}><td> </td></tr>
                )

            }

                return (
                    <tr key = {index}> 
                        <td>{test.id}</td>
                        <td>{test.name}</td>
                        <td>{test.surname}</td>
                        <td>{test.topic}</td>
                        <td>{test.time}</td>
                        <td>{test.result + ' %'}</td>
                    </tr>
                );

        });
        
        const renderPreviousPageButton = pageNumber > 1;
        const renderNextPageButton = tests.length > endIndex;

        return (
            <>
                <table className="results_table"> 
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>SURNAME</th>
                            <th>TOPIC</th>
                            <th>TIME</th>
                            <th>RESULT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultsListContent} 
                    </tbody>
                </table>
                <ResultsNav previousPageButton={renderPreviousPageButton}
                            nextPageButton={renderNextPageButton}
                            testsPageNumber={this.state.pageNumber}
                            previousPageOnClick={() => this.handlePreviousPage()}
                            nextPageOnClick={() => this.handleNextPage()} />
            </>
        );

    }

    handlePreviousPage(){
        
        this.setState({
                pageNumber: this.state.pageNumber - 1,

            }, 
            () => sessionStorage.setItem("TestsPageNumber", this.state.pageNumber)
        );
    }
    
    handleNextPage(){

        this.setState({
                pageNumber: this.state.pageNumber + 1,
                
            }, 
            () => sessionStorage.setItem("TestsPageNumber", this.state.pageNumber)
        );

    }

    render() {


        if (this.state.results === undefined){
            return(<p> Ładowanie...</p>);
        }

        return (
            <>
                <ResultsFilter handleFilterResults={(id, name, surname, topic) => this.handleUseFilters(id, name, surname, topic)}/>
                {this.renderResultsList(this.state.results, this.state.pageNumber, this.state.filter)}
            </>
        );

    }

}

export default ResultsView;