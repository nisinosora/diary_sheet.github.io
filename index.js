document.addEventListener('DOMContentLoaded',function(){
  $("#make").on('click', function(){
    var datas = document.getElementById("canvased").getContext('2d');
    var images = new Image();
    images.src = "./diary-sheet.jpg"
    datas.drawImage(images, 0, 0, 400, 500);
    var links = document.getElementById("canvased").toDataURL("image/png");
    alert(links);
  })
});