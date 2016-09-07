$.getJSON("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/guady?api_key=bb84ac28-9890-40ff-9bd1-9331359bf653",function(data){
    console.log(data);
      var hname = document.getElementById("name");
    var playerName = data.guady.name;
    hname.innerHTML = (playerName);
    var icon = data.guady.profileIconId;
    console.log(icon);
    var sicon = document.getElementById("icon"); sicon.style.content="url('http://ddragon.leagueoflegends.com/cdn/6.9.1/img/profileicon/"+icon+".png' )";
});

$.getJSON("https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/21648426/recent?api_key=bb84ac28-9890-40ff-9bd1-9331359bf653", function(game){
     
    console.log(game);
    for(var i =0, x=1; i<5; i++, x++){
        console.log("Next Game");
    console.log(game.games[i]);
        var myChamp = game.games[i].championId;
        console.log(myChamp);
        getChamp(myChamp,x);
        //console.log(myChampName);
                                                            
        var gameType = game.games[i].gameMode;
        console.log(gameType);
        console.log(game.games[i].stats);
        var assists = game.games[i].stats.assists;
        if(assists==undefined){
            assists=0;
        }
        var kills = game.games[i].stats.championsKilled;
        if(kills==undefined){
            kills=0;
        }
        var deaths = game.games[i].stats.numDeaths;
        if(deaths==undefined){
            deaths=0;
        }
        var minion = game.games[i].stats.minionsKilled; 
        var jgminion = game.games[i].stats.neutralMinionsKilled;
        if (minion==undefined){
            minion = 0;
        }
        if (jgminion==undefined){
            jgminion=0;
        }
        var cs = minion+jgminion;
        console.log("K="+kills+" D="+deaths+" A="+assists+" CS="+cs);
        var kdacs = document.getElementById(x+"score");
        kdacs.innerHTML = "K="+kills+" D="+deaths+" A="+assists+" CS="+cs;  
        var time = game.games[i].stats.timePlayed;
        var mins = Math.floor(time/60);
        var seconds = time-mins * 60;
        if(seconds<10){
            seconds = "0"+seconds;
        }
        var gameTime =mins+":"+seconds;
        var htime = document.getElementById(x+"time");
        htime.innerHTML = gameTime;
        
        var gold = game.games[i].stats.goldEarned;
        var hgold = document.getElementById(x+"gold");
        hgold.innerHTML = gold;
        
        var level = game.games[i].stats.level;
        var hlevel = document.getElementById(x+"level");
        hlevel.innerHTML = level;
        
        var summSpell1 = game.games[i].spell1;
        var summSpell2 = game.games[i].spell2;
        getSpell1(summSpell1, x);
        getSpell2(summSpell2, x);
        
        var win = game.games[i].stats.win;
        if(win==true){
            win = "Victory";
            var row = document.getElementById("row"+x);
                row.style.backgroundColor="DarkCyan";
        }
        else{
            win = "Defeat";
            var row = document.getElementById("row"+x);
                row.style.backgroundColor="Crimson";
        }
        var hstatus = document.getElementById(x+"status");
        hstatus.innerHTML= win;
        
        var gameType = game.games[i].subType;
        var hgame = document.getElementById(x+"type");
        hgame.innerHTML = gameType;
        
        var multiKill = game.games[i].stats.largestMultiKill;
        if (multiKill==1||multiKill==undefined){
            multiKill=" ";
        }
        else if (multiKill==2){
            multiKill = "Double Kill!";
        }
        else if (multiKill==3){
            multiKill = "Triple Kill!";
        }
        else if (multiKill==4){
            multiKill = "Quadra Kill!";
        }
        else if (multiKill==5){
            multiKill = "PENTA KILL!";
        }
        var hMKill = document.getElementById(x+"mKill");
        hMKill.innerHTML = multiKill;
         var itemID = game.games[i].stats.item0;
            if (itemID!=undefined){
            getItem1(itemID, x);
            }
         var itemID = game.games[i].stats.item1;
            if (itemID!=undefined){
            getItem2(itemID, x);
            }
         var itemID = game.games[i].stats.item2;
            if (itemID!=undefined){
            getItem3(itemID, x);
            }
         var itemID = game.games[i].stats.item3;
            if (itemID!=undefined){
            getItem4(itemID, x);
            }
         var itemID = game.games[i].stats.item4;
            if (itemID!=undefined){
            getItem5(itemID, x);
            }
         var itemID = game.games[i].stats.item5;
            if (itemID!=undefined){
            getItem6(itemID, x);
            }
        var itemID = game.games[i].stats.item6;
        if(itemID!=undefined){
            getTrinket(itemID, x);
        }
    }

    getRank();
});

function getChamp(id, x){
    var champNAME="";
    var p1 = Promise.resolve(
    $.ajax({
        url:"https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/"+id+"?api_key=bb84ac28-9890-40ff-9bd1-9331359bf653",
        crossDomain: true,
        type: 'GET',
        dataType: 'json',
        data:{},
        success: function(champ){
            
        }
    }).then(function(set){
        //console.log(set);
        var hchamp = document.getElementById(x+"champ");
        var championName = set.name;
        
        hchamp.innerHTML = championName;
        if(championName=="Dr.Mundo"){
            championName="DrMundo";
        }
        if(championName=="LeBlanc"){
            championName="Leblanc";
        }
        if(championName=="Kha'Zix"){
            championName="Khazix";
        }
        if(championName=="Lee Sin"){
            championName="LeeSin";
        }
        if(championName=="Master Yi"){
            championName="MasterYi";
        }
         if(championName=="Cho'Gath"){
            championName="Chogath";
        }
        if(championName=="Rek'Sai"){
            championName="RekSai";
        }
         if(championName=="Wukong"){
            championName="MonkeyKing";
        }
        var champPic = document.getElementById(x+"champPic");
        var link = "http://ddragon.leagueoflegends.com/cdn/6.9.1/img/champion/"+championName+".png";
        $(champPic).html("<img src="+link+">");
    }));

}

function getRank(){
    $.ajax({
        url:"https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/21648426/entry?api_key=bb84ac28-9890-40ff-9bd1-9331359bf653",
        crossDomain:true,
        type: 'GET',
        dataType: 'json',
        data:{},
        success: function(rank){
            var rank = (rank['21648426'][0].tier);
            var hrank = document.getElementById("rank");
            hrank.innerHTML=rank;
            if (rank=="BRONZE"){
                hrank.style.color="brown";
            }
            else if(rank=="SILVER"){
                hrank.style.color="Silver";
            }
            else if(rank=="GOLD"){
                hrank.style.color="DarkGoldenRod"
            }
            else if(rank=="PLATINUM"){
                hrank.style.color="Turquoise";
            }
            else if(rank=="DIAMOND"){
                hrank.style.color="CornflowerBlue";
            }
        }
    });
}

function getSpell1(spellId,x){
    $.ajax({
        url: "https://global.api.pvp.net/api/lol/static-data/na/v1.2/summoner-spell/"+spellId+"?api_key=bb84ac28-9890-40ff-9bd1-9331359bf653",
        crossDomain:true,
        type: 'GET',
        dataType: 'json',
        data:{},
        success: function(spell){
            var spell = spell.name;
            if (spell =="Ignite"){
                spell = "Dot";
            }
            else if (spell =="Cleanse"){
                spell = "Boost";
            }
            else if (spell=="Ghost"){
                spell = "Haste";
            }
             else if (spell=="Mark"){
                spell="Snowball";
            }
            var s1 = document.getElementById(x+"sum1");
            //s1.innerHTML=spell.name;
             var link="http://ddragon.leagueoflegends.com/cdn/6.9.1/img/spell/Summoner"+spell+".png";
            
            $(s1).html("<img src="+link+">");
        }
    });
}
function getSpell2(spellId,x){
    $.ajax({
        url: "https://global.api.pvp.net/api/lol/static-data/na/v1.2/summoner-spell/"+spellId+"?api_key=bb84ac28-9890-40ff-9bd1-9331359bf653",
        crossDomain:true,
        type: 'GET',
        dataType: 'json',
        data:{},
        success: function(spell){
            console.log(spell.name);
            var s2 = document.getElementById(x+"sum2");
            //s2.innerHTML=spell.name;
            var spell = spell.name;
            if (spell =="Ignite"){
                spell = "Dot";
            }
            else if (spell =="Cleanse"){
                spell = "Boost";
            }
            else if (spell=="Ghost"){
                spell = "Haste";
            }
             else if (spell=="Mark"){
                spell="Snowball";
            }
            //s1.innerHTML=spell.name;
             var link="http://ddragon.leagueoflegends.com/cdn/6.9.1/img/spell/Summoner"+spell+".png";
            
            $(s2).html("<img src="+link+">");
        }
    });
}
function getItem1(itemID, j){
   
        var hItem = document.getElementById(j+"item1");
            var link = "http://ddragon.leagueoflegends.com/cdn/6.9.1/img/item/"+itemID+".png";
    $(hItem).html("<img src="+link+">");
        
}
function getItem2(itemID, j){
   
        var hItem = document.getElementById(j+"item2");
            var link = "http://ddragon.leagueoflegends.com/cdn/6.9.1/img/item/"+itemID+".png";
    $(hItem).html("<img src="+link+">");
        
}
function getItem3(itemID, j){
   
        var hItem = document.getElementById(j+"item3");
             var link = "http://ddragon.leagueoflegends.com/cdn/6.9.1/img/item/"+itemID+".png";
    $(hItem).html("<img src="+link+">");
        
}
function getItem4(itemID, j){
   
        var hItem = document.getElementById(j+"item4");
             var link = "http://ddragon.leagueoflegends.com/cdn/6.9.1/img/item/"+itemID+".png";
    $(hItem).html("<img src="+link+">");
        
}
function getItem5(itemID, j){
   
        var hItem = document.getElementById(j+"item5");
            var link = "http://ddragon.leagueoflegends.com/cdn/6.9.1/img/item/"+itemID+".png";
    $(hItem).html("<img src="+link+">");
}
function getItem6(itemID, j){
   
        var hItem = document.getElementById(j+"item6");
            var link = "http://ddragon.leagueoflegends.com/cdn/6.9.1/img/item/"+itemID+".png";
    $(hItem).html("<img src="+link+">");
        
}
function getTrinket(itemID, j){
   
        var hItem = document.getElementById(j+"trinket");
             var link = "http://ddragon.leagueoflegends.com/cdn/6.9.1/img/item/"+itemID+".png";
    $(hItem).html("<img src="+link+">");
}
/*function getMastery(){
    $.ajax({
        url:"https://na.api.pvp.net/championmastery/location/NA1/player/50105143/topchampions?count=3&api_key=bb84ac28-9890-40ff-9bd1-9331359bf653",
        crossDomain:true,
        type: 'GET',
        dataType: 'json',
        data:{},
        success: function(mast){
            console.log(mast);
        }
    });
}
*/

