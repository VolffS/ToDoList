import './client/pages/index.html';
import './client/pages/error.html';
import './client/styles/style.scss';
import './client/scripts/script';
import  imgSrc from "./client/resources/img/pepo-g-peepo.gif";
import ReactDOM from "react-dom";
import React from "react";
import {Main} from "./client/scripts/script";

const imgPepega = document.querySelector("img.img-note");
imgPepega.src = imgSrc;

const listToDo = document.querySelector("main.container");
ReactDOM.render(<React.StrictMode>
    <Main />
</React.StrictMode>
 , listToDo)