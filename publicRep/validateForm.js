function appendDate(){
  let paragraph = document.createTextNode(" this document was last edited on  " + document.lastModified);
  let footer = document.getElementById("footer");
  footer.appendChild(paragraph);


}
appendDate();
