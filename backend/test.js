class Test{
    constructor(a,b){
        [this.a,this.b]=[a,b];
    }
    print(){
        console.log(this.a);
        console.log(this.b);
    }
}

const test = new Test(2,4);
test.print();