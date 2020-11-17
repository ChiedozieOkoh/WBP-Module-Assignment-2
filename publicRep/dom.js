function  theDOMElementWalker(node){

if (node.nodeType == 1 ){
	console.log(node);
	node = node.firstChild;
	while(node){
		console.log(node.nodeType);
		theDOMElementWalker(node);
		console.log("Value: " + node.textContent);
		node = node.nextSibling;
	}
 }
}
let list = document.querySelector('main');
theDOMElementWalker(list);
var paragraph = document.createElement("p");
paragraph.style.color = "red";
var text = document.createTextNode("this is a  new paragraph");
paragraph.appendChild(text);



let uls = document.getElementsByTagName("ul");
var ul = uls[0];

let mains = document.getElementsByTagName("main");
var main = mains[0];

let divs = document.getElementsByTagName("div");
var div = divs[0];

/*
var elements = document.getElementsByTagName("UL");
var list = elements[1];
list.appendChild(paragraph);
*/
main.insertBefore(paragraph,div);
