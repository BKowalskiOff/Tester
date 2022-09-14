import React from 'react';
import { AvaiableTopicsService } from './available-topics-service';

const axios = require('axios');
const isTesting = false;

class GeneratorForm extends React.Component {

    constructor(props){
        super(props);
        const sessionState = sessionStorage.getItem("GeneratorFormState");

        this.state = sessionState === null ? {
                                                testURL: "",
                                                availableTopics: undefined,

                                            } : {
                                                testURL: JSON.parse(sessionState).testURL,
                                                availableTopics: undefined,
                                            };

        this.availableTopicsService = new AvaiableTopicsService(isTesting);
    }

    componentDidMount(){

        const setState = this.setState.bind(this);
        this.availableTopicsService.getTopics().then((result) => setState({availableTopics: result}));

    }

    renderTestUrl(){

        if(this.state.testURL === ""){
            return "";
        }
        else{
            return (
                    <div className="generator-url" >
                        <p>Link do testu:</p>
                        <p onClick={() => {navigator.clipboard.writeText(this.state.testURL)}}>
                            Kliknij aby skopiować
                            <br/>
                            {this.state.testURL}
                        </p>
                    </div>);
        }
    }

    handleSubmitTestForm(e){
        e.preventDefault();
        const form = e.target;
        const formData = Object.fromEntries(new FormData(form).entries());
        
        if (formData.name === '' || formData.surname === '' || formData.topic === '' || formData.time === ''){
            alert("uzupełnij brakujące pola!");
            return;
        }

        fetch('http://localhost:3100/test', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json'
            }
        }).then((res) => res.json())
            .then((res) => {
                this.setState({
                    testURL: 'http://localhost:3100/test/' + res.key
                }, () =>  sessionStorage.setItem("GeneratorFormState", JSON.stringify(this.state)));
            });

        
    }

    handleResetButton(){

        this.setState({
            testURL: "",
        }, 
        () =>  sessionStorage.removeItem("GeneratorFormState"));


    }

    render(){

        if(this.state.availableTopics === undefined){
            return(
                <p>Ładowanie...</p>
            );
        }

        const available_tests = this.state.availableTopics.map((test, index) => {
            const description = test;
            return (
                <option key={index} 
                        value={description}>
                    {description}
                </option>
            );
        });

        return(
            <div className="generator_wrapper">
                <p>GENERATOR TESTU</p>
                <form className="generator_form"
                        onSubmit={(e) => this.handleSubmitTestForm(e)}>
                    <span>
                        <label>Imię</label>
                        <input type="text" name="name"/>
                    </span>
                    <span>
                        <label>Nazwisko</label>
                        <input type="text" name="surname"/>
                    </span>
                    <span>
                        <label>Temat testu</label>
                        <select id="available tests" name="topic">
                            {available_tests}
                        </select>
                    </span>
                    <span>
                        <label>Czas trwania testu</label>
                        <input type="number" name="time" min="1" max="999"/>
                    </span>
                    <span className="reset-submit">
                    <input type="reset" onClick={() => this.handleResetButton()}/>
                    <input type="submit" name="submit"/>
                    </span>
                </form>
                {this.renderTestUrl()}
            </div>
        );
    }

}

export default GeneratorForm;