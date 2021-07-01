import "../scss/index.scss";
import "../index.html";

console.log("hello world!");

let arr = [1, 2, 3];

arr.map((value) => console.log(value));

if (module.hot) {
    module.hot.accept();
}