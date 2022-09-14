const fs = require('fs');

class TestService {

    constructor(key){

        this.testData = this.loadTestData(key);
        
        [this.questions, this.answers, this.correctAnswers] = loadQuestionsAndAnswers();

    }

    loadTestData(key){
        
        const fileData = fs.readFileSync('./data/active_tests.json', 'utf8');
        
        var testIndex = fileData.tests.findIndex((test) => test.key === key);

        if(testIndex === -1){
            return undefined;
        }

        return structuredClone(tests[testIndex]);

    }

    loadQuestionsAndAnswers(){

        const fileData = fs.readFileSync('./data/tests.json', 'utf8');
        const tests = fileData.tests;

    }

}