document.addEventListener('DOMContentLoaded',function(){
  $("#make").on('click', function(){
    var datas = document.getElementById("canvased").getContext('2d');
    var images = new Image();
    var width, height
    images.src = "./diary-sheet.jpg"
    width = images.naturalWidth;
    height = images.naturalHeight;
    datas.setAttribute("widht", width);
    datas.setAttribute("height", height);
    datas.drawImage(images, 0, 0, width, height);
    var links = document.getElementById("canvased").toDataURL("image/png");
    var img = document.getElementById("diary");
    img.src = links;
  })
});