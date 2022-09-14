import React from 'react';

export function TestStartPage(props) {

    const testTopic = props.topic;
    const testTime = props.time;

    return (

        <div className='test_start_page-wrapper'>
            <p>Temat testu: <br/>{testTopic}</p>
            <p>Czas trwania testu: <br/>{testTime} minut(y)</p>
            <button 
                    className="test_start_page-button"
                    onClick={() => props.startTestOnClick()}>
                Rozpocznij test
            </button>
        </div>

    );

}