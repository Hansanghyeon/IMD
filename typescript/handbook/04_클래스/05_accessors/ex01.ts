let passcode = "secret passcode";

class Employee2 {
  private _fullName!: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if(passcode && passcode == 'secret passcode') {
      this._fullName = newName;
    }
    else {
      console.log("❗️: employee의 무단 업데이트!");
    }
  }
}

let employee = new Employee2();
employee.fullName = "Bob Smith";
if(employee.fullName) {
  console.log(employee.fullName);
}