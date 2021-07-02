import "index.scss";
import "index.html";

import "core-js";

import obj from "obj";
import add from "add";

console.log("hello world!");

let arr = [1, 2, 3];

arr.map((value) => console.log(value));

console.log(obj.name);

add(3, 4);

class Main{

    state = {
        name: "Yu",
    };

    constructor(){
        document.querySelector("a").addEventListener("click", this.logState);
    }

    logState = () => {
        console.log(this.state.name);
    }
}

new Main();

async function getData(){
    const url = "https://hexschool.github.io/ajaxHomework/data.json";
    let res = await axios.get(url);
    console.log(res.data[0]);
}
getData();

console.log($("h1"));

if (module.hot) {
    module.hot.accept();
}