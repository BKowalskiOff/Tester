function LogoContainer(props){
    return (
        <div className={"app-logo_container " + props.additionalClassName}>
            <img src="Logo-Altera.png" alt="Logo Altera"/>
        </div>
    );
}

export default LogoContainer;