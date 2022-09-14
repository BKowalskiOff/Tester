import axios from 'axios';

export class AvaiableTopicsService {

    constructor(isTesting){
        this.isTesting = isTesting;
    }

    getTopics(){
        if (this.isTesting){
            
           const topics = {
                            "topics": ["JavaScript", "NodeJS", "Workflow", "Math?"]
                        };

            return topics.topics;

        }
        else{
            const endpoint = 'http://localhost:3100/available_topics';

            const response = axios(endpoint)
                    .then((resp) => {
                        return resp.data.topics
                    });

            return response;

        }
    }

}