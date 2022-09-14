import axios from 'axios';

export class ResultsService {

    constructor(isTesting){
        this.isTesting = isTesting;
    }

    getResults(pageNumber){
        if (this.isTesting){
            const results = {
                "tests": [
                    
                    {"id": 1,
                    "name": "Łukasz",
                    "surname": "Byńkowski",
                    "topic": "JavaScript",
                    "time": 40,
                    "result": 66},
            
                    {"id": 2,
                    "name": "Jakub",
                    "surname": "Nowak",
                    "topic": "NodeJS",
                    "time": 30,
                    "result": 100},
            
                    {"id": 3,
                    "name": "Zuzanna",
                    "surname": "Piekarz",
                    "topic": "Workflow",
                    "time": 10,
                    "result": 25},
            
                    {"id": 4,
                    "name": "Łukasz",
                    "surname": "Byńkowski",
                    "topic": "JavaScript",
                    "time": 40,
                    "result": 66},
                    
                    {"id": 5,
                    "name": "Łukasz",
                    "surname": "Byńkowski",
                    "topic": "JavaScript",
                    "time": 40,
                    "result": 66},
                    
                    {"id": 6,
                    "name": "Łukasz",
                    "surname": "Byńkowski",
                    "topic": "JavaScript",
                    "time": 30,
                    "result": 61},
                    
                    {"id": 7,
                    "name": "Łukasz",
                    "surname": "Byńkowski",
                    "topic": "JavaScript",
                    "time": 20,
                    "result": 16},
                    
                    {"id": 8,
                    "name": "Łukasz",
                    "surname": "Byńkowski",
                    "topic": "JavaScript",
                    "time": 20,
                    "result": 26},
                    
                    {"id": 9,
                    "name": "Łukasz",
                    "surname": "Byńkowski",
                    "topic": "JavaScript",
                    "time": 120,
                    "result": 66},
                    
                    {"id": 10,
                    "name": "Łukasz",
                    "surname": "Byńkowski",
                    "topic": "JavaScript",
                    "time": 410,
                    "result": 6},
                    
                    {"id": 11,
                    "name": "Łukasz",
                    "surname": "Byńkowski",
                    "topic": "JavaScript",
                    "time": 120,
                    "result": 63},
            
                    {"id": 12,
                    "name": "Łukasz",
                    "surname": "Byńkowski",
                    "topic": "JavaScript",
                    "time": 400,
                    "result": 22},
            
                    {"id": 13,
                    "name": "Łukasz",
                    "surname": "Byńkowski",
                    "topic": "JavaScript",
                    "time": 400,
                    "result": 22}
                    
            
                ]
            };

            return results.tests;

        }
        else{

            const endpoint = 'http://localhost:3100/results';

            const response = axios.get(endpoint)
                    .then((resp) => {
                        return resp.data.tests;
                    });

            return response;

        }
    }

}