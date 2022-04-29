document.addEventListener('DOMContentLoaded',function(){
  $("#download").on('click', function(){
    create();
    //ダウンロード処理
    var links = document.getElementById("canvased").toDataURL("image/png");
    var a = document.createElement('a');
    var file_name = document.getElementById("diary-sheet-name").value;
    if(file_name == ""){
      file_name = "diary_sheet"
    }
    a.href = links;
    a.download = file_name + ".png";
    a.click();
  })

  $("#share").on('click', function(){
    create();
    var infos
    var images = []
    document.getElementById("canvas_img").src = document.getElementById("canvased").src;
    infos = {
      "text":"けものフレンズTRPG～てーぶるちほーの大冒険～：冒険の日記",
      "url": "https://nisinosora.github.io/diary_sheet.github.io/",
      "hashtags": "てーぶるちほー",
      "image": [document.getElementById("canvas_img").src]
    }

    try{
      infos["image"].forEach(function(value){
        const blob = toBlob(value);
        const imageFile = new File([blob], "image.png", {type: "image/png"});
        images.push(imageFile)
      });
      navigator.share({
        text: infos["text"],
        url: infos["url"],
        files: images,
      })
    }catch(e){
      alert("エラーが発生しました。\n画像が存在しないか、ブラウザが非対応の可能性があります。");
      console.log(e);
    }
  })

  $("#create").on('click', function(){
    create();
    var links = document.getElementById("canvased").toDataURL("image/png");
    var img = document.getElementById("canvas_img")
    img.href = links.src;
    window.open(img.src, "imgwindow", "width=866,height=580");
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

  function create(){
    //loading
    var datas = document.getElementById("canvased").getContext('2d');
    var canvased = document.getElementById("canvased");
    var images = new Image();
    images.src = "./diary-sheet.jpg";

    //画像サイズ設定
    var img_width, img_height;
    img_width = images.naturalWidth;
    img_height = images.naturalHeight;
    canvased.width = img_width;
    canvased.height = img_height;
    datas.clearRect(0, 0, img_width, img_height);
    datas.drawImage(images, 0, 0, img_width, img_height);

    //文字取得
    var player, friend;
    player = document.getElementById("pl");
    friend = document.getElementById("friend_name");
    medal = document.getElementById("medal");
    datas.font = "14px 'ＭＳ ゴシック'";
    datas.fillText(player.value, 865, 125);//プレイヤー名
    datas.fillText(friend.value, 700, 178);//フレンズ名
    datas.fillText(medal.value, 760, 235);//シナリオメダル

    //シナリオデータ取得：初期設定
    var scenario_name, scenario_date, scenario_pg, scenario_pl, scenario_memo;
    //シナリオ名、日付、PG、PL、メモ（各X, Y）
    //[シナリオ名_X, シナリオ名_Y, 日付_X, 日付_Y, PG_X, PG_Y, PL_X, PL_Y, Memo_X, Memo_Y]
    let positions_scenario = [
      [200, 350, 140, 383, 120, 405, 120, 427, 90, 520],
      [410, 350, 455, 383, 440, 405, 440, 427, 400, 520],
      [723, 350, 770, 383, 755, 405, 755, 427, 710, 520],
      [95, 637, 140, 668, 120, 690, 120, 712, 80, 805],
      [410, 635, 455, 668, 440, 690, 440, 712, 400, 805],
      [723, 635, 770, 668, 755, 690, 755, 712, 710, 805]
    ]

    //シナリオ
    $.each(positions_scenario, function(index, val){
      if(index == 0){
        datas.font = "10px 'ＭＳ ゴシック'";
      }else{
        datas.font = "14px 'ＭＳ ゴシック'";
      }
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
    //フレンズ名_Y
    var friend;
    let positions_friends = [1010, 1060, 1115, 1170, 1220, 1275, 1330, 1385, 1440]
    $.each(positions_friends, function(index, val){
      friend = document.getElementById("friend" + (index + 1));
      datas.fillText(friend.value, 210, val);
    })

    //バスアイテム・メモ
    buss = document.getElementById("buss");
    memo = document.getElementById("memo");
    line_change(datas, buss.value, 560, 1010, 28, 10);
    line_change(datas, memo.value, 554, 1247, 31, 15);

    var links = document.getElementById("canvased").toDataURL("image/png");
    document.getElementById("canvased").src = links;
    document.getElementById("canvas_img").src = document.getElementById("canvased");
  };

  const toBlob = (base64) => {
    const decodedData = atob(base64.replace(/^.*,/, ""));
    const buffers = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
      buffers[i] = decodedData.charCodeAt(i);
    }
    try {
      const blob = new Blob([buffers.buffer], {
        type: "image/png",
      });
      return blob;
    } catch (e) {
      return null;
    }
  };
});