export function ResultsFilter(props) {

    const engToPl = {
        "id": "Id",
        "name": "Imię",
        "surname": "Nazwisko",
        "topic": "Temat"
    };

    function renderInputField(name){

        return (
            <span>
                <label>{engToPl[name]}</label>
                <input type="text" name={name} defaultValue=""/>
            </span>
        );

    }

    function handleSubmitTestForm(event){
        event.preventDefault();

        const form = document.getElementsByClassName("results_filter-form")[0];
        const [id, name, surname, topic] = [form["id"].value, form["name"].value, form["surname"].value, form["topic"].value];
        console.log([id,name,surname,topic]);
        props.handleFilterResults(id, name, surname, topic);

    }

    return (
        <form className="results_filter-form">
            {renderInputField("id")}
            {renderInputField("name")}
            {renderInputField("surname")}
            {renderInputField("topic")}
            <input type="reset"/>
            <input type="submit" name="submit" onClick={(event) => handleSubmitTestForm(event)}/>
        </form>
    );

}