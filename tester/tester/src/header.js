import LogoContainer from "./logo-container";

function Header(props){
    return (
            <div className="app-header">
                    <LogoContainer 
                        additionalClassName="header"
                    />
            </div>
    );
}

export default Header;