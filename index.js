document.addEventListener('DOMContentLoaded',function(){
  $("#make").on('click', function(){
    var datas = document.getElementById("canvased").getContext('2d');
    var images = new Image();
    var img_width, img_height
    images.src = "./diary-sheet.jpg"
    img_width = images.naturalWidth;
    img_height = images.naturalHeight;
    var canvas = document.getElementById("canvased");
    canvas.width = img_width;
    canvas.height = img_height;
    datas.drawImage(images, 0, 0, img_width, img_height);
    var links = document.getElementById("canvased").toDataURL("image/png");
    var img = document.getElementById("diary");
    img.src = links;
    img.hidden = false;
  })
});