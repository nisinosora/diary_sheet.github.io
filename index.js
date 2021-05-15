document.addEventListener('DOMContentLoaded',function(){
  $("#make").on('click', function(){
    var datas = document.getElementById("canvased").getContext('2d');
    var images = new Image();
    var width, height
    images.src = "./diary-sheet.jpg"
    width = images.naturalWidth;
    height = images.naturalHeight;
    datas.drawImage(images, 0, 0, width, height);
    datas.width = width;
    datas.height = height;
    var links = document.getElementById("canvased").toDataURL("image/png");
    var img = document.getElementById("diary");
    img.src = links;
  })
});