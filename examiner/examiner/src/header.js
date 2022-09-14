import LogoContainer from "./logo-container";

function Nav(props) {

    return (
        <div className="app-nav">
            <p onClick={props.generatorOnClick}> Generator testu </p>
            <p onClick={props.resultsOnClick}> Wyniki testów </p>
        </div>
    );

}

function Header(props){
    return (
            <div className="app-header">
                    <LogoContainer 
                        additionalClassName="header"
                    />
                    <Nav 
                        generatorOnClick={props.generatorOnClick}
                        resultsOnClick={props.resultsOnClick}
                    />
            </div>
    );
}

export default Header;