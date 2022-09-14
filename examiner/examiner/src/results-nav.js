function ResultsNav(props){
    return (
        <div className="results-nav-wrapper">
            {props.previousPageButton ? (
                                            <button onClick={props.previousPageOnClick}>
                                                &#8617;
                                            </button> 
                                        ) : ( 
                                            <button style={{visibility: "hidden"}}>
                                                &#8617;
                                            </button>
                                        )}
            {props.testsPageNumber}
            {props.nextPageButton ? (
                                        <button onClick={props.nextPageOnClick}>
                                            &#8618;
                                        </button>
                                    ) : (
                                        <button style={{visibility: "hidden"}}>
                                            &#8618;
                                        </button>
                                    )}
        </div>
    );
}

export default ResultsNav;