import "../scss/index.scss";
import "../index.html";

import obj from "./obj";
import add from "./add";

console.log("hello world!");

let arr = [1, 2, 3];

arr.map((value) => console.log(value));

console.log(obj.name);

add(3, 4);

if (module.hot) {
    module.hot.accept();
}