document.addEventListener('DOMContentLoaded',function(){
  $("#make").on('click', function(){
    /*loading*/
    var datas = document.getElementById("canvased").getContext('2d');
    var canvased = document.getElementById("canvased");
    var images = new Image();
    images.src = "./diary-sheet.jpg";

    /*画像サイズ設定*/
    var img_width, img_height;
    img_width = images.naturalWidth;
    img_height = images.naturalHeight;
    canvased.width = img_width;
    canvased.height = img_height;
    datas.clearRect(0, 0, img_width, img_height);
    datas.drawImage(images, 0, 0, img_width, img_height);

    /*文字取得*/
    var player, friend;
    player = document.getElementById("pl");
    friend = document.getElementById("friend_name");
    medal = document.getElementById("medal");
    datas.font = "14px 'ＭＳ ゴシック'";
    datas.fillText(player.value, 865, 125);//プレイヤー名
    datas.fillText(friend.value, 700, 178);//フレンズ名
    datas.fillText(medal.value, 760, 235);//シナリオメダル
    /*シナリオ1*/
    scenario_name1 = document.getElementById("scenario_name1");
    scenario_date1 = document.getElementById("scenario_date1");
    scenario_pg1 = document.getElementById("scenario_pg1");
    scenario_pl1 = document.getElementById("scenario_pl1");
    scenario_memo1 = document.getElementById("scenario_memo1");
    datas.fillText(scenario_name1.value, 200, 350);
    datas.fillText(scenario_date1.value, 140, 383);
    datas.fillText(scenario_pg1.value, 120, 405);
    line_change(datas, scenario_pl1.value, 120, 427, 17, 2);
    line_change(datas, scenario_memo1.value, 90, 520, 17, 4);

    var links = document.getElementById("canvased").toDataURL("image/png");
    var img = document.getElementById("diary");
    img.src = links;
    img.hidden = false;
  })

  function line_change(canvas, text, x, y, maxwidth, maxheight){
    var texts = text.split("");
    var line = "";
    var lines = [];
    $.each(texts, function(index, val){
      line = line + val;
      if(index % maxwidth == 0 && index != 0){
        line += "\n"
        lines.push(line);
        line = "";
      }
    })

    $.each(lines, function(index, val){
      if(index < maxheight){
        canvas.fillText(val, x, y + (14 * index));
      }else{
        return false;
      }
    });
  }
});