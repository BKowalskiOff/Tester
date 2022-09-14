import React from "react";

import { Question } from "./question";
import { TestStartPage } from "./test-start-page";
import { TestCountdown } from "./test-countdown";

import TestData from './test-data.json';

class Test extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            started: false,
            currentQuestion: 1,
            results: [],

        }

    }

    getTestData(){return TestData};

    sendTestResult(){
        const testData = this.getTestData();
        const maxPoints = testData.questions.map((q) => q.points).reduce((a, b) => a + b, 0);
        const gainedPoints = this.state.results.reduce((a, b) => a + b, 0);
        console.log(gainedPoints/maxPoints);
        
    }

    handleQuestionSubmit(result){
        if( result === null ){
            alert("Nie wybrano odpowiedzi!");
            return;
        }

        this.setState({
            currentQuestion: this.state.currentQuestion + 1, 
            results: this.state.results.concat(result),
            }, 
            () => {
                if(this.state.currentQuestion === this.getTestData().questions.length + 1){
                    this.sendTestResult();
                }
            }
            );
    }

    handleStartTest(){
        this.setState({started: true});
    }

    handleTimeElapsed(){
        const noTestQuestions = this.getTestData().questions.length;
        const noRemainingResults = noTestQuestions - this.state.currentQuestion;
        const remainingResults = Array(noRemainingResults).fill(0);

        this.setState({
            currentQuestion: noTestQuestions + 1, 
            results: this.state.results.concat(remainingResults),
        },
        () => this.sendTestResult());
    }

    render(){

        const testData = this.getTestData();

        if( !this.state.started ){

                return(
                    <>
                        <div className="test-wrapper">
                            <TestStartPage 
                                        topic={testData.topic}
                                        time={testData.time}
                                        startTestOnClick={() => this.handleStartTest()}
                            />
                        </div>
                    </>
                );

        }
        else if( this.state.currentQuestion === testData.questions.length + 1 ){

            return( <p>KONIEC TESTU</p> );

        }
        else{

            return(
                <>
                    <p>TEST: {testData.topic}</p>
                    <TestCountdown 
                                time={testData.time}
                                timeElapsedHandler={() => this.handleTimeElapsed()}
                    />
                    <div className="test-wrapper">
                        <Question 
                                questionData={testData.questions[this.state.currentQuestion - 1]}
                                submitHandler={(res) => this.handleQuestionSubmit(res)}
                        />
                        <p className="question-number-p">{this.state.currentQuestion} / {testData.questions.length}</p>
                    </div>
                </>
            );

        }
    }
}

export default Test;