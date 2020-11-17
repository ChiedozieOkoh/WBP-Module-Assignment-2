function onClick(event){
   if (event.currentTarget == event.target){
      let image = document.getElementById("mainImage");
      let title = document.getElementById("indexTitle");

      image.src = "images/yoga5.jpg";
      
      title.textContent = "Find Your Inner Light...relax";

      event.stopPropagation();
   }

}

var image = document.getElementById("mainImage");
image.addEventListener("click",onClick,false);
