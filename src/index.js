import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './Grid';

import * as serviceWorker from './serviceWorker';
const messages = []//["React", "Re:React", "Re:Re:React"];

const numbers = [1,2,3,4,5];
const doubleNumbers = numbers.map((x)=><li>{x}</li>);
let output = "[" + doubleNumbers.join(",") + "]";
const columns = (function(){
    let cols = [];
    for (let i = 0; i < 25; i++) {
        cols.push("Column : " + (i + 1));
    }
    return cols;
})();
const frozenColumns = ["Column : 1", "Column : 2", "Column : 4"];
const emptyData = [];
const data = (function(){
    let data = [];
    for (let i = 0; i < 100; i++) {
        let d = [];
        for (let j = 0; j < 25; j++) {
            d.push("Row : " + (i + 1) + "; Column : " + (j + 1));            
        }
        data.push(d);
    }
    return data;
})();
const posts = [
    {id:1, title:"Hello World!", content:"Welcome to React Learning!"},
    {id:2, title:"Installation", content:"You can install React from NPM."}
];
ReactDOM.render(<Grid columns={columns} data={data} scrollable={true} frozenColumns={frozenColumns} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
