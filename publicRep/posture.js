const photoSrcList = ["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg","images/5.jpg"];

const albumView = document.getElementById("albumView");
const modalView = document.getElementById("modalView");

function createImage(source){
  var img = document.createElement("IMG");
  img.src = source ;

  return img;
};

function onThumbnailClick(event){
      let newImg = createImage(event.target.src);

      document.body.classList.add("no-scroll");
      modalView.style.top = window.pageYOffset + 'px';
      modalView.appendChild(newImg);
      modalView.classList.remove("hidden");
};

function onModalClick(event){
      document.body.classList.remove("no-scroll");
      modalView.classList.add("hidden");
      modalView.innerHTML = '';
};

for (var i = 0 ; i < photoSrcList.length ; i ++){
    let newImg = createImage(photoSrcList[i]);

    albumView.appendChild(newImg);
};

albumView.addEventListener("click",onThumbnailClick);
modalView.addEventListener("click",onModalClick);
