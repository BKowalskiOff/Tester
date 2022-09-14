import React, { useState, useEffect} from "react";

export function TestCountdown(props){

    const [seconds, setSeconds] = useState(props.time*60);
    const [className, setClassName] = useState("test_countdown");
    const [hasCountdownFinished, setHasCountdownFinished] = useState(false);

    useEffect(() => {

        if(!hasCountdownFinished){
            const interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
        else{
            props.timeElapsedHandler();
        }
    });

    useEffect(() => {
        if ( seconds === 16 ){
            setClassName(className => className + " time_warning");
        }
        if ( seconds === 0 ){
            setHasCountdownFinished(hasCountdownFinished => true);
        }
       
    },[seconds]);

    return(

        <div className={className} >
            <p className="test_countdown-display">{String(Math.floor(seconds/60)).padStart(2,'0')}:{String(seconds%60).padStart(2,'0')}</p>
        </div>

    );



}