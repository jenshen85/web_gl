'use strict'

$(".title").on('click', (e)=> {
  if(e.target.style.color !== "red") {
    e.target.style.color = "red";
  } else {
    e.target.style.color = "black";
  }
});