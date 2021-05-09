//console.log('javascript file loaded !!!');

var musiclink = ''; // global metavliti. Gemizei me to music link meta tin oloklirwsi (response) tis get klisis

var jquerywaitcounter = 0;
function wait_until_jquery(){
    try{
        jquerywaitcounter = jquerywaitcounter + 1;
        //console.log(jquerywaitcounter);
        if (window.jQuery) {  
            // jQuery is loaded
            jQuery(document).ready(function() { 
                doc_ready();
            });
        } else {
            // jQuery is not loaded
            if (jquerywaitcounter<=100) {
                setTimeout(function(){
                    wait_until_jquery();
                },100);
            }
        }
    }catch(e){}
}

wait_until_jquery();

function doc_ready() { // document ready
    jQuery(document).on('click','input#video_file', function(){ // upload video
      try{
            jQuery(document).find("#loader").removeAttr('hidden'); // emfanisi loadder
            setTimeout(function(){
                jQuery(document).find("#loader")[0].hidden = "true"; // apokripsi loader
                getMusicInfo(); // erxetai i pliroforia tou ixou
                playVideo(); // eisagwi video
                playMusicsound(); // anaparagwgi tou ixou
            },12000);
      }catch(e){}
    });
}

function getMusicInfo(){
  try{
        var xhrObj = httpGet("https://freesound.org/apiv2/sounds/213524/?descriptors=lowlevel.mfcc,rhythm.bpm&token=C7Q51gzK43MgO1In5yd6CzR7pikEbJUSMy8t2909"); // ginetai i klisi kai epistrefei tin pliroforia tou ixou
        xhrObj = JSON.parse(xhrObj);
        //console.log(xhrObj);
        for(i in xhrObj){
            if(i == "previews"){
                if (typeof xhrObj[i]['preview-hq-mp3'] != 'undefined') {
                    musiclink = xhrObj[i]['preview-hq-mp3']; // gemizei i global metavliti
                    //console.log(musiclink);
                    break;                
                }
            }
        }
      //window.location.href = music;// Test : redirect to music link 
  }catch(e){}
}

function httpGet(theUrl){ // dimiourgei klisi get kai epistrefei link ixou
    try{
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false gia synchronous request
        xmlHttp.send( null );
        //console.log(xmlHttp.responseText);
        return xmlHttp.responseText;
    }catch(e){}
}

function playMusicsound(){ // prosthetei to music link sto element
    try{
        //console.log(musiclink);
        jQuery(document).find('#audiomusic').attr("src",musiclink); // eisagwgi tragoudiou . Works !!!
    }catch(e){}
}

function playVideo(){ // prosthetei to video kai kanei autoplay
   try{ 
        jQuery(document).find('#videoid')[0].controls = true;        
        var videofile = 'mixkit-group-of-friends-partying-happily-4640.mp4'; // to arxeio video sto idio repo
        jQuery(document).find('#videoid').attr("src",videofile); // eisagwgi video
        jQuery(document).find('#videoid')[0].autoplay = true; // proairetiko 
    }catch(e){}
}



















