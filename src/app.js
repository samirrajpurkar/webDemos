import $ from 'jquery';
import Rx from 'rxjs/Rx';

/*
When dealing with a nested data structure,
recursive functions are often useful.
The following 
Recursive function which scans a document for text nodes containing a given string 
and returns true when it has found one:
*/
function talksAbout(node, string) {
 if (node.nodeType == document.ELEMENT_NODE) {
     for (var i = 0; i < node.childNodes.length; i++) {
         if (talksAbout(node.childNodes[i], string)) return true;
     }
     return false;
 } else if (node.nodeType == document.TEXT_NODE) {
     return node.nodeValue.indexOf(string) > -1;
 }  
}

console.log(talksAbout(document.body, 'really!'));

