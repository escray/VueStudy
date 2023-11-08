class Student {
  fullName: string;
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" }

let student = new Student("Jane", "M.", "User")

document.body.textContent = greeter(user);
document.body.textContent = greeter(student);
