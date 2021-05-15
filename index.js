document.addEventListener('DOMContentLoaded',function(){
  $("#make").on('click', function(){
    var datas = document.getElementById("canvas").getContext("2d");
    var images;
    images = new Image();
    images.src = "./diary-sheet.jpg"
    datas.drawImage(images, 0, 0);
  })
});