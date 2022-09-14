import ReactDOM from 'react-dom/client';

import './styles/index.css';
import './styles/results_style.css';
import './styles/generator_style.css';

import App from './app';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);

window.addEventListener("scroll", () => {
    const header = document.getElementsByClassName("app-header")[0];
    const mainContainer = document.getElementById("main-container");
    const nav = document.getElementsByClassName("app-nav")[0];
        

    const header_bottom = header.getBoundingClientRect().bottom;
    const mainContainer_top = mainContainer.getBoundingClientRect().top;
    
    nav.style.visibility = mainContainer_top < header_bottom ? "hidden" : "visible";
    
});