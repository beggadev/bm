////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
 function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkMobileOrientation, 1000);
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[
			{src:'assets/background.png', id:'background'},
			{src:'assets/background_p.png', id:'backgroundP'},
			{src:'assets/logo.png', id:'logo'},
			{src:'assets/logo_p.png', id:'logoP'},

			{src:'assets/button_plus.png', id:'itemPlus'},
			{src:'assets/button_minus.png', id:'itemMinus'},
			{src:'assets/button_arrow_left.png', id:'itemArrowL'},
			{src:'assets/button_arrow_right.png', id:'itemArrowR'},
			{src:'assets/button_rotate.png', id:'itemUp'},
			{src:'assets/button_down.png', id:'itemDown'},
			{src:'assets/button_hold.png', id:'itemHold'},
			{src:'assets/button_drop.png', id:'itemDrop'},

			{src:'assets/pop.png', id:'backgroundPop'},
			{src:'assets/pop_p.png', id:'backgroundPopP'},
		
			{src:'assets/button_facebook.png', id:'buttonFacebook'},
			{src:'assets/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/button_whatsapp.png', id:'buttonWhatsapp'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_settings.png', id:'buttonSettings'}
	];

	for(var n=0; n<themes_arr.length; n++){
		if(themes_arr[n].board.tileImage != undefined && themes_arr[n].board.tileImage != ''){
			manifest.push({src:themes_arr[n].board.tileImage, id:'tileImage'+n});
		}

		if(themes_arr[n].shadowImage != undefined && themes_arr[n].shadowImage != ''){
			manifest.push({src:themes_arr[n].shadowImage, id:'shadowImage'+n});
		}

		if(themes_arr[n].completeImage != undefined && themes_arr[n].completeImage != ''){
			manifest.push({src:themes_arr[n].completeImage, id:'completeImage'+n});
		}

		if(themes_arr[n].button.tileImage != undefined && themes_arr[n].button.tileImage != ''){
			manifest.push({src:themes_arr[n].button.tileImage, id:'buttonTileImage'+n});
		}

		if(themes_arr[n].blocksImages != undefined){
			for(var p=0; p<themes_arr[n].blocksImages.length; p++){
				manifest.push({src:themes_arr[n].blocksImages[p], id:'tileImage'+n+'_'+p});
			}
		}
	}
	
	if ( typeof addScoreboardAssets == 'function' ) { 
		addScoreboardAssets();
	}
	
	soundOn = true;
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/sound_click.ogg', id:'soundButton'});
		manifest.push({src:'assets/sounds/sound_start.ogg', id:'soundStart'});
		manifest.push({src:'assets/sounds/sound_drop.ogg', id:'soundDrop'});
		manifest.push({src:'assets/sounds/sound_down.ogg', id:'soundDown'});
		manifest.push({src:'assets/sounds/sound_over.ogg', id:'soundOver'});
		manifest.push({src:'assets/sounds/sound_result.ogg', id:'soundResult'});
		manifest.push({src:'assets/sounds/sound_count.ogg', id:'soundCount'});
		manifest.push({src:'assets/sounds/sound_remove.ogg', id:'soundRemove'});
		manifest.push({src:'assets/sounds/sound_remove2.ogg', id:'soundRemove2'});
		manifest.push({src:'assets/sounds/sound_hold.ogg', id:'soundHold'});
		manifest.push({src:'assets/sounds/music_main.ogg', id:'musicMain'});

		for(var n=0; n<themes_arr.length; n++){
			if(themes_arr[n].music != undefined && themes_arr[n].music != ''){
				manifest.push({src:themes_arr[n].music, id:'musicGame'+n});
			}
		}
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader span').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}