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

    //シナリオデータ取得：初期設定
    //シナリオ名、日付、PG、PL、メモ（各X, Y）
    //[シナリオ名_X, シナリオ名_Y, 日付_X, 日付_Y, PG_X, PG_Y, PL_X, PL_Y, Memo_X, Memo_Y]
    let positions = [
      [200, 350, 140, 383, 120, 405, 120, 427, 90, 520],
      [410, 350, 455, 383, 440, 405, 440, 427, 400, 520],
      [723, 350, 770, 383, 755, 405, 755, 427, 710, 520],
      [95, 637, 140, 668, 120, 690, 120, 712, 80, 805],
      [410, 635, 455, 668, 440, 690, 440, 712, 400, 805],
      [72, 635, 770, 668, 755, 690, 755, 712, 710, 805]
    ]

    /*シナリオ*/
    $.each(positions, function(index, val){
      scenario_name = document.getElementById("scenario_name" + (index + 1));
      scenario_date = document.getElementById("scenario_date" + (index + 1));
      scenario_pg = document.getElementById("scenario_pg" + (index + 1));
      scenario_pl = document.getElementById("scenario_pl" + (index + 1));
      scenario_memo = document.getElementById("scenario_memo" + (index + 1));
      datas.fillText(scenario_name.value, val[0], val[1]);
      datas.fillText(scenario_date.value, val[2], val[3]);
      datas.fillText(scenario_pg.value, val[4], val[5]);
      line_change(datas, scenario_pl.value, val[6], val[7], 17, 2);
      line_change(datas, scenario_memo.value, val[8], val[9], 17, 4);
    })

    //フレンズリスト
    friend1 = document.getElementById("friend1");
    friend2 = document.getElementById("friend2");
    friend3 = document.getElementById("friend3");
    friend4 = document.getElementById("friend4");
    friend5 = document.getElementById("friend5");
    friend6 = document.getElementById("friend6");
    friend7 = document.getElementById("friend7");
    friend8 = document.getElementById("friend8");
    friend9 = document.getElementById("friend9");

    datas.fillText(friend1.value, 210, 1010);
    datas.fillText(friend2.value, 210, 1060);
    datas.fillText(friend3.value, 210, 1115);
    datas.fillText(friend4.value, 210, 1170);
    datas.fillText(friend5.value, 210, 1220);
    datas.fillText(friend6.value, 210, 1275);
    datas.fillText(friend7.value, 210, 1330);
    datas.fillText(friend8.value, 210, 1385);
    datas.fillText(friend9.value, 210, 1440);

    //バスアイテム・メモ
    buss = document.getElementById("buss");
    memo = document.getElementById("memo");
    line_change(datas, buss.value, 560, 1010, 28, 10);
    line_change(datas, memo.value, 554, 1247, 31, 15);

    var links = document.getElementById("canvased").toDataURL("image/png");
    var img = document.getElementById("diary");
    img.src = links;
    img.hidden = false;
    var dl = document.getElementById("download");
    if(dl.checked == true){
      var a = document.createElement('a');
      a.href = links;
      a.download = "download.png";
      a.click();
    }
  })

  function line_change(canvas, text, x, y, maxwidth, maxheight){
    var texts = text.split("");
    var lines, line = "";
    var counter = 0;
    lines = [];
    texts.forEach(function(val){
      if(counter == maxwidth || val == "\n" || val == "\r"){
        if((val != "\n" && val != "\r") || val != "\n\r"){
          line = line + val;
        }
        lines.push(line);
        line = "";
        counter = 0;
      }else{
        line = line + val;
        counter += 1;
      }
    });

    if(line != ""){
      lines.push(line);
      line = "";
    }

    $.each(lines, function(index, val){
      if(index < maxheight){
        canvas.fillText(val, x, y + (14 * index));
      }else{
        return false;
      }
    });
  };
});