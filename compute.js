class MyMath{
  constructor(name){
    this.name = name;
  }

  getProduct(a,b){
    return (a*b);
  }
}

class Compute extends MyMath{

  constructor(name){
    super(name);
  }

  getSum(a,b){
    return (a+b);
  }

  welcomeMessage(){
    return 'Hello '+this.name;
  }

  static getName(){
    return "Mike";
  }
}

module.exports = {
  Compute,
};
