import React from 'react';

export function Question(props){
    
    const questionData = props.questionData;

    const question = questionData.question;
    const options = questionData.options;
    const correctAnswer = questionData.correctAnswer;
    const points = questionData.points;

    var chosenOption = null;

    function markAnswer(event, option){

        if( chosenOption !== null ){
            document.getElementsByClassName("marked")[0].classList.remove("marked");
        }
        
        event.target.classList.add("marked");
        chosenOption = option;

    }

    function getOptionsButtonsList(){
        
        const buttonsList = options.map((option, index) => {
            return (
                    <>
                        <button 
                                key={index} 
                                onClick={e => markAnswer(e, option)}>
                            {option}
                        </button>

                        {index%2 === 1 ? (<br/>) : ("")}
                    </>
            );

        });

        return buttonsList;
    }

    function submitAnswer(){

        if( chosenOption === null ){
            props.submitHandler(null);
        } 
        else{

            const isAnswerCorrect = (chosenOption === correctAnswer);

            chosenOption = null;
            document.getElementsByClassName("marked")[0].classList.remove("marked")

            isAnswerCorrect ? props.submitHandler(points) : props.submitHandler(0);

        }

    }

    return (

            <div className='question-wrapper'>
                <p>{question}</p>
                <div className='question-options-wrapper'>
                    {getOptionsButtonsList()}
                </div>
                <br/>
                <button className="question-submit"
                        onClick={() => submitAnswer()}>DALEJ</button>
            </div>

    );

}