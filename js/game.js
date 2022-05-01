////////////////////////////////////////////////////////////
// GAME v1.0
////////////////////////////////////////////////////////////

$.editor = {enable:false};
var playerData = {score:0, cleared:0};
var gameData = {paused:true, mode:0, theme:0, level:0, type:'classic', custom:{row:0, column:0}, buttons:[], over:false};
var boardData = {
					bgBorder:0,
					bgBorderInner:0,
					tileBorder:0,
					tileBorderRadius:0,
					column:0,
					row:0,
					tileSize:0,
					speed:0,
					board:[],
					topY:[],
					topPosY:[],
					curX:0,
					curY:0,
					blocks:[],
					holdBlock:[],
					hold:true,
					direction:0,
					autoMode:false,
					shadow:true,
					score:0,
					speedScore:0,
					totalPreview:boardSettings.previewTotal+2,
					completeAnimation:'',
					slideAnimation:false
				};
var designData = {popR:13, popC:17, holdR:5, holdC:5, previewR:16, previewC:5, previewPortraitR:10, stateR:3, stateC:5, timerR:1, timerC:6, scoreR:1, scoreC:6, buttonC:7, buttonR:2, buttonMiniC:1, buttonMiniR:1};
var timeData = {enable:false, startDate:null, nowDate:null, timer:0, oldTimer:0};
var tweenData = {score:0, tweenScore:0};

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	if($.browser.mobile || isTablet){
		touchUp.addEventListener("mousedown", function(evt) {
			toggleTouchAlpha(evt.target, true);
			gameControl('rotate');
		});
		
		touchUp.addEventListener("pressup", function(evt) {
			toggleTouchAlpha(evt.target, false);
		});
		
		touchDown.addEventListener("mousedown", function(evt) {
			toggleTouchAlpha(evt.target, true);
			gameData.touchControl = 'down';
			loopTouchControl(true);
		});
		
		touchDown.addEventListener("pressup", function(evt) {
			toggleTouchAlpha(evt.target, false);
			loopTouchControl(false);
		});
		
		touchLeft.addEventListener("mousedown", function(evt) {
			toggleTouchAlpha(evt.target, true);
			gameData.touchControl = 'left';
			loopTouchControl(true);
		});
		
		touchLeft.addEventListener("pressup", function(evt) {
			toggleTouchAlpha(evt.target, false);
			loopTouchControl(false);
		});
		
		touchRight.addEventListener("mousedown", function(evt) {
			toggleTouchAlpha(evt.target, true);
			gameData.touchControl = 'right';
			loopTouchControl(true);
		});
		
		touchRight.addEventListener("pressup", function(evt) {
			toggleTouchAlpha(evt.target, false);
			loopTouchControl(false);
		});

		touchHold.addEventListener("mousedown", function(evt) {
			toggleTouchAlpha(evt.target, true);
			gameControl('hold');
		});
		
		touchHold.addEventListener("pressup", function(evt) {
			toggleTouchAlpha(evt.target, false);
		});

		touchDrop.addEventListener("mousedown", function(evt) {
			toggleTouchAlpha(evt.target, true);
			gameControl('drop');
		});
		
		touchDrop.addEventListener("pressup", function(evt) {
			toggleTouchAlpha(evt.target, false);
		});
	}else{
		var isInIframe = (window.location != window.parent.location) ? true : false;
		if(isInIframe){
			this.document.onkeydown = keydown;
			this.document.onkeyup = keyup;
		
			$(window).blur(function() {
				appendFocusFrame();
			});
			appendFocusFrame();
        }else{
            this.document.onkeydown = keydown;
			this.document.onkeyup = keyup;
        }
	}

	buttonClassic.cursor = "pointer";
	buttonClassic.addEventListener("click", function(evt) {
		playSound('soundButton');
		gameData.type = 'classic';
		toggleMainButton(true);
	});

	buttonCustom.cursor = "pointer";
	buttonCustom.addEventListener("click", function(evt) {
		playSound('soundButton');
		gameData.type = 'custom';
		toggleMainButton(true);
		//checkGameType();
	});

	buttonMode.cursor = "pointer";
	buttonMode.addEventListener("click", function(evt) {
		playSound('soundButton');
		checkGameType();
	});

	buttonModeL.cursor = "pointer";
	buttonModeL.addEventListener("click", function(evt) {
		playSound('soundButton');
		toggleModes(false);
	});

	buttonModeR.cursor = "pointer";
	buttonModeR.addEventListener("click", function(evt) {
		playSound('soundButton');
		toggleModes(true);
	});

	buttonRowL.cursor = "pointer";
	buttonRowL.addEventListener("click", function(evt) {
		playSound('soundCount');
		toggleCustomRow(false);
	});

	buttonRowR.cursor = "pointer";
	buttonRowR.addEventListener("click", function(evt) {
		playSound('soundCount');
		toggleCustomRow(true);
	});

	buttonColumnL.cursor = "pointer";
	buttonColumnL.addEventListener("click", function(evt) {
		playSound('soundCount');
		toggleCustomColumn(false);
	});

	buttonColumnR.cursor = "pointer";
	buttonColumnR.addEventListener("click", function(evt) {
		playSound('soundCount');
		toggleCustomColumn(true);
	});

	buttonThemeL.cursor = "pointer";
	buttonThemeL.addEventListener("click", function(evt) {
		playSound('soundCount');
		toggleThemes(false);
	});

	buttonThemeR.cursor = "pointer";
	buttonThemeR.addEventListener("click", function(evt) {
		playSound('soundCount');
		toggleThemes(true);
	});

	buttonCustomStart.cursor = "pointer";
	buttonCustomStart.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('game');
	});
	
	popContainer.addEventListener("click", function(evt) {
	});
	
	buttonContinue.cursor = "pointer";
	buttonContinue.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('main');
	});
	
	buttonFacebook.cursor = "pointer";
	buttonFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	
	buttonTwitter.cursor = "pointer";
	buttonTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	buttonWhatsapp.cursor = "pointer";
	buttonWhatsapp.addEventListener("click", function(evt) {
		share('whatsapp');
	});
	
	buttonSoundOff.cursor = "pointer";
	buttonSoundOff.addEventListener("click", function(evt) {
		toggleGameMute(true);
	});
	
	buttonSoundOn.cursor = "pointer";
	buttonSoundOn.addEventListener("click", function(evt) {
		toggleGameMute(false);
	});
	
	buttonFullscreen.cursor = "pointer";
	buttonFullscreen.addEventListener("click", function(evt) {
		toggleFullScreen();
	});
	
	buttonExit.cursor = "pointer";
	buttonExit.addEventListener("click", function(evt) {
		toggleOption();
		togglePop(true);
	});
	
	buttonSettings.cursor = "pointer";
	buttonSettings.addEventListener("click", function(evt) {
		toggleOption();
	});
	
	buttonConfirm.cursor = "pointer";
	buttonConfirm.addEventListener("click", function(evt) {
		playSound('soundButton');
		togglePop(false);
		
		stopGame();
		goPage('main');
	});
	
	buttonCancel.cursor = "pointer";
	buttonCancel.addEventListener("click", function(evt) {
		playSound('soundButton');
		togglePop(false);
	});

	if(!boardSettings.preview){
		previewContainer.visible = false;
	}
	
	if(!boardSettings.hold){
		holdContainer.visible = false;
	}

	toggleModes(true);
	toggleModes(false);
	gameData.custom.column = customSettings.columnMin;
	gameData.custom.row = customSettings.rowMin;

	gameData.theme = Math.floor(Math.random()*themes_arr.length);
	checkCustomSettings();
	prepareBlocks();
	setThemes();
}

function loopTouchControl(con){
	if(con){
		gameControl(gameData.touchControl);
		TweenMax.to(touchDown, .1, {overwrite:true, onComplete:function(){
			loopTouchControl(true);
		}});
	}else{
		TweenMax.killTweensOf(touchDown);
	}
}

function appendFocusFrame(){
	$('#mainHolder').prepend('<div id="focus" style="position:absolute; width:100%; height:100%; z-index:1000;"></div');
	$('#focus').click(function(){
		$('#focus').remove();
	});	
}


/*!
 * 
 * KEYBOARD EVENTS - This is the function that runs for keyboard events
 * 
 */
function keydown(event) {
	switch (event.keyCode) {
		case boardSettings.keyboard.left:
			gameControl('left');
			break;
		case boardSettings.keyboard.right:
			gameControl('right');
			break;
		case boardSettings.keyboard.rotate:
			gameControl('rotate');
			break;
		case boardSettings.keyboard.down:
			gameControl('down');
			break;
		case boardSettings.keyboard.space:
			gameControl('drop');
			break;
		case boardSettings.keyboard.hold:
			gameControl('hold');
			break;
		default:
			return;
	}
}

function keyup(event) {

}

/*!
 * 
 * TOGGLE GAME TYPE - This is the function that runs to toggle game type
 * 
 */
function toggleMainButton(con){
	if(con){
		buttonTypeContainer.visible = false;
		buttonModeContainer.visible = true;
	}else{
		buttonTypeContainer.visible = true;
		buttonModeContainer.visible = false;
	}
}

function checkGameType(){
	if(gameData.type == 'classic'){
		goPage('themes');
	}else{
		goPage('custom');
	}
}

/*!
 * 
 * TOGGLE GAME MODE - This is the function that runs to toggle game mode
 * 
 */
function toggleModes(con){
	if(con){
		gameData.mode++;
		gameData.mode = gameData.mode > modes_arr.length-1 ? 0 : gameData.mode;
	}else{
		gameData.mode--;
		gameData.mode = gameData.mode < 0 ? modes_arr.length-1 : gameData.mode;
	}

	$.button['buttonMode'].textObj.text = modes_arr[gameData.mode].name;
	modeDescTxt.text = modes_arr[gameData.mode].description;
}

/*!
 * 
 * TOGGLE GAME BOARD - This is the function that runs to toggle game board
 * 
 */
function toggleCustomRow(con){
	if(con){
		gameData.custom.row++;
		gameData.custom.row = gameData.custom.row > customSettings.rowMax ? customSettings.rowMax : gameData.custom.row;
	}else{
		gameData.custom.row--;
		gameData.custom.row = gameData.custom.row < customSettings.rowMin ? customSettings.rowMin : gameData.custom.row;
	}

	checkCustomSettings();
}

function toggleCustomColumn(con){
	if(con){
		gameData.custom.column++;
		gameData.custom.column = gameData.custom.column > customSettings.columnMax ? customSettings.columnMax : gameData.custom.column;
	}else{
		gameData.custom.column--;
		gameData.custom.column = gameData.custom.column < customSettings.columnMin ? customSettings.columnMin : gameData.custom.column;
	}

	checkCustomSettings();
}

function checkCustomSettings(){
	var sizeText = textDisplay.customSize.replace('[COLUMN]', gameData.custom.column);
	sizeText = sizeText.replace('[ROW]', gameData.custom.row);
	sizeTxt.text = sizeText;
}

/*!
 * 
 * TOGGLE GAME THEMES - This is the function that runs to toggle game themes
 * 
 */
function toggleThemes(con){
	if(con){
		gameData.theme++;
		gameData.theme = gameData.theme > themes_arr.length-1 ? 0 : gameData.theme;
	}else{
		gameData.theme--;
		gameData.theme = gameData.theme < 0 ? themes_arr.length-1 : gameData.theme;
	}
	
	setThemes();
	toggleThemeBlocks(true);
	playThemeMusic(true);
}

function playThemeMusic(con){
	for(var n=0; n<themes_arr.length; n++){
		if(themes_arr[n].music != undefined && themes_arr[n].music != ''){
			stopSoundLoop('musicGame'+n);
		}
	}

	if(con)
		playSoundLoop('musicGame'+gameData.theme);
}

function toggleThemeBlocks(con){
	if(con){
		loopThemeBlocks();
	}else{
		TweenMax.killTweensOf(customBlockContainer);
	}
}

function loopThemeBlocks(){
	boardData.blocks = [];
	prepareNextBlocks();
	buildThemeBlock();
	
	TweenMax.to(customBlockContainer, .8, {overwrite:true, onComplete:loopThemeBlocks});
}

/*!
 * 
 * TOGGLE POP - This is the function that runs to toggle popup overlay
 * 
 */
function togglePop(con){
	confirmContainer.visible = con;
	togglePopBackground(con);
	toggleGamePause(con);
}

function togglePopBackground(con){
	popContainer.visible = con;
}


/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible = false;
	customContainer.visible = false;
	gameContainer.visible = false;
	resultContainer.visible = false;
	togglePopBackground(false);
	toggleThemeBlocks(false);
	
	var targetContainer = null;
	switch(page){
		case 'main':
			targetContainer = mainContainer;

			toggleMainButton(false);
			for(var n=0; n<themes_arr.length; n++){
				if(themes_arr[n].music != undefined && themes_arr[n].music != ''){
					stopSoundLoop('musicGame'+n);
				}
			}
			playSoundLoop('musicMain');
		break;

		case 'custom':
			targetContainer = customContainer;

			customSizeContainer.visible = true;
			customTitleTxt.text = textDisplay.customTitle;
			togglePopBackground(true);
			toggleThemeBlocks(true);
			setThemes();

			stopSoundLoop('musicMain');
			playThemeMusic(true);
		break;

		case 'themes':
			targetContainer = customContainer;

			customSizeContainer.visible = false;
			customTitleTxt.text = textDisplay.themeTitle;
			togglePopBackground(true);
			toggleThemeBlocks(true);
			setThemes();

			stopSoundLoop('musicMain');
			playThemeMusic(true);
		break;
		
		case 'game':
			targetContainer = gameContainer;

			playThemeMusic(false);
			startGame();
		break;
		
		case 'result':
			targetContainer = resultContainer;
			stopGame();
			togglePop(false);
			togglePopBackground(true);

			playSound('soundResult');
			tweenData.tweenScore = 0;
			TweenMax.to(tweenData, .5, {tweenScore:playerData.score, overwrite:true, onUpdate:function(){
				resultDescTxt.text = textDisplay.resultDesc.replace('[NUMBER]', addCommas(Math.floor(tweenData.tweenScore)));
			}});
			resultTimerTxt.text = textDisplay.resultTime.replace('[NUMBER]', millisecondsToTimeGame(timeData.timer));
			
			saveGame(playerData.score, modes_arr[gameData.mode].name);
		break;
	}
	
	if(targetContainer != null){
		targetContainer.visible = true;
		targetContainer.alpha = 0;
		TweenMax.to(targetContainer, .5, {alpha:1, overwrite:true});
	}
	
	resizeCanvas();
}

/*!
 * 
 * START GAME - This is the function that runs to start game
 * 
 */
function startGame(){
	if(gameData.type == 'classic'){
		boardData.column = defaultSettings.column;
		boardData.row = defaultSettings.row;
	}else{
		boardData.column = gameData.custom.column;
		boardData.row = gameData.custom.row;
	}

	pauseTxt.visible = false;

	tweenData.tweenScore = 0;
	gameData.over = false;
	gameData.level = 0;
	setGameLevel();
	
	gameStatusTxt.text = '';
	statusBg.visible = false;
	playerData.score = 0;
	playerData.cleared = 0;
	updateGameStatus();

	timeData.timer = 0;
	timeData.accumulate = 0;

	if(modes_arr[gameData.mode].mode == 'timer'){
		timeData.countdown = modes_arr[gameData.mode].timer;
		timerTxt.text = textDisplay.timer.replace('[NUMBER]', millisecondsToTimeGame(timeData.countdown));
	}else{
		timerTxt.text = textDisplay.timer.replace('[NUMBER]', millisecondsToTimeGame(timeData.timer));
	}

	buildTetrisBoard();

	touchContainer.visible = false;
	if($.browser.mobile || isTablet){
		instructionContainer.visible = false;
		touchContainer.visible = true;
		touchContainer.alpha = .2;
	}else{
		instructionContainer.alpha = 0;
		gameData.instruction = true;
		toggleGameInstruction(true);
	}
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
 function stopGame(){
	holdBlocksContainer.removeAllChildren();
	previewBlocksContainer.removeAllChildren();
	blocksContainer.removeAllChildren();
	blocksContainer.uncache();
	
	gameData.paused = true;
	TweenMax.killAll(false, true, false);
}

function saveGame(score, type){
	if ( typeof toggleScoreboardSave == 'function' ) { 
		$.scoreData.score = score;
		if(typeof type != 'undefined'){
			$.scoreData.type = type;	
		}
		toggleScoreboardSave(true);
	}

	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

 /*!
 * 
 * SET THEMES - This is the function that runs to set themes
 * 
 */
function setThemes(){
	boardData.bgBorder = themes_arr[gameData.theme].bgBorder;
	boardData.bgBorderInner = themes_arr[gameData.theme].bgBorderInner;
	boardData.tileBorder = themes_arr[gameData.theme].tileBorder;
	boardData.tileBorderRadius = themes_arr[gameData.theme].tileBorderRadius;
	boardData.tileSize = themes_arr[gameData.theme].tileSize;
	boardData.shadow = themes_arr[gameData.theme].showShadow;
	boardData.shadowAlpha = themes_arr[gameData.theme].shadowAlpha;
	boardData.completeAnimation = themes_arr[gameData.theme].completeAnimation;

	levelTxt.font = "30px aldo_the_apacheregular";
	linesTxt.font = "30px aldo_the_apacheregular";
	goalTxt.font = "30px aldo_the_apacheregular";
	timerTxt.font = "30px aldo_the_apacheregular";
	holdTxt.font = "30px aldo_the_apacheregular";
	nextTxt.font = "30px aldo_the_apacheregular";
	scoreTxt.font = "30px aldo_the_apacheregular";
	gameStatusTxt.font = "50px aldo_the_apacheregular";
	pauseTxt.font = "60px aldo_the_apacheregular";

	sizeTxt.color = themes_arr[gameData.theme].board.color;
	levelTxt.color = themes_arr[gameData.theme].board.color;
	linesTxt.color = themes_arr[gameData.theme].board.color;
	goalTxt.color = themes_arr[gameData.theme].board.color;
	timerTxt.color = themes_arr[gameData.theme].board.color;
	holdTxt.color = themes_arr[gameData.theme].board.color;
	nextTxt.color = themes_arr[gameData.theme].board.color;
	scoreTxt.color = themes_arr[gameData.theme].board.color;
	gameStatusTxt.color = themes_arr[gameData.theme].board.color;
	pauseTxt.color = themes_arr[gameData.theme].board.color;
	customTitleTxt.color = themes_arr[gameData.theme].board.color;
	resultShareTxt.color = themes_arr[gameData.theme].board.color;
	resultTimerTxt.color = themes_arr[gameData.theme].board.color;
	resultDescTxt.color = themes_arr[gameData.theme].board.color;
	resultTitleTxt.color = themes_arr[gameData.theme].board.color;
	popTitleTxt.color = themes_arr[gameData.theme].board.color;
	popDescTxt.color = themes_arr[gameData.theme].board.color;

	buildBackground(designData.popC, designData.popR, popBgInnerContainer);

	popBgInnerContainer.x = -(popBgInnerContainer.boardW/2);
	popBgInnerContainer.y = -(popBgInnerContainer.boardH/2);

	customBlockContainer.x = (canvasW/2) + popBgInnerContainer.x;
	customBlockContainer.y = (canvasH/2) + popBgInnerContainer.y;
	console.log(canvasW)

	//buttons
	for(var n=0; n<gameData.buttons.length; n++){
		var buttonC = gameData.buttons[n].size == true ? designData.buttonC : designData.buttonMiniC;
		var buttonR = gameData.buttons[n].size == true ? designData.buttonR : designData.buttonMiniR;

		gameData.buttons[n].textObj.color = themes_arr[gameData.theme].button.color;
		buildTileButton(buttonC, buttonR, gameData.buttons[n].bgObj);

		gameData.buttons[n].bgObj.regX = gameData.buttons[n].bgObj.boardW/2;
		gameData.buttons[n].bgObj.regY = gameData.buttons[n].bgObj.boardH/2;
	}

	resizeGameLauyout();
}

function resizeGameLauyout(){
	//game
	var textOffsetY = 12 + boardData.tileBorder;
	holdTxt.x = (holdBgContainer.boardW/2);
	holdTxt.y = (boardData.tileSize/2) + textOffsetY;

	nextTxt.x = (previewBgContainer.boardW/2);
	nextTxt.y = (boardData.tileSize/2) + textOffsetY;

	scoreTxt.x = (scoreBgContainer.boardW/2);
	scoreTxt.y = (boardData.tileSize/2) + textOffsetY;

	timerTxt.x = (timerBgContainer.boardW/2);
	timerTxt.y = (boardData.tileSize/2) + textOffsetY;

	var statusCenterY = (statusBgContainer.boardH/2);
	var statusSpaceY = (boardData.tileSize);
	goalTxt.x = linesTxt.x = levelTxt.x = statusBgContainer.boardW/2;
	levelTxt.y = (statusCenterY -(statusSpaceY)) + textOffsetY;
	linesTxt.y = statusCenterY + textOffsetY;
	goalTxt.y = statusCenterY + (statusSpaceY) + textOffsetY;

	gameStatusTxt.x = boardBgContainer.boardW/2;
	gameStatusTxt.y = boardBgContainer.boardH/100 * 30;

	pauseTxt.x = boardBgContainer.boardW/2;
	pauseTxt.y = boardBgContainer.boardH/100 * 40;

	//game container
	var previewR = viewport.isLandscape == true ? designData.previewR : designData.previewPortraitR;
	buildBackground(designData.previewC, previewR, previewBgContainer, previewMask);

	var overallW = boardBgContainer.boardW + boardData.tileSize;
	var overallH = boardBgContainer.boardH;
	var sideX = boardContainer.x + boardBgContainer.boardW + boardData.tileSize;
	var sideY = boardContainer.y;
	var scalePercent = 1;

	if(boardSettings.preview){
		overallW += previewBgContainer.boardW;

		previewContainer.x = sideX;
		previewContainer.y = sideY;
		sideY += previewBgContainer.boardH + boardData.tileSize;

		holdContainer.x = boardContainer.x - (holdBgContainer.boardW + boardData.tileSize);
		holdContainer.y = boardContainer.y;
	}else{
		if(boardSettings.hold){
			overallW += holdBgContainer.boardW;

			holdContainer.x = sideX;
			holdContainer.y = sideY;
			sideY += holdBgContainer.boardH + boardData.tileSize;
		}else{
			overallW += statusBgContainer.boardW;
		}
	}

	statusContainer.x = sideX;
	statusContainer.y = sideY;

	scoreContainer.regX = scoreBgContainer.boardW;
	scoreContainer.x = canvasW/2 + 500;
	scoreContainer.y = canvasH/2;

	timerContainer.x = canvasW/2 - 500;
	timerContainer.y = canvasH/2;

	instructionLeftTxt.x = canvasW/2 - 500;
	instructionRightTxt.x = canvasW/2 + 500;
	instructionLeftTxt.y = instructionRightTxt.y = canvasH/2 + 100;

	var extraHoldRegX = 0;
	if(boardSettings.preview && boardSettings.hold){
		extraHoldRegX = (holdBgContainer.boardW + boardData.tileSize)/2;
	}

	boardScaleContainer.regX = (overallW/2) - extraHoldRegX;
	boardScaleContainer.regY = (overallH/2);

	if(viewport.isLandscape){
		scalePercent = 560/overallH;
	}else{
		//portrait
		var overallW = boardBgContainer.boardW + boardData.tileSize;
		var overallH = boardBgContainer.boardH;
		var sideX = boardContainer.x + boardBgContainer.boardW + boardData.tileSize;
		var sideY = boardContainer.y;
		var scalePercent = 1;

		if(boardSettings.preview){
			overallW += previewBgContainer.boardW;

			previewContainer.x = sideX;
			previewContainer.y = sideY;
			sideY += previewBgContainer.boardH + boardData.tileSize;
		}

		if(boardSettings.hold){
			holdContainer.x = sideX;
			holdContainer.y = sideY;
			sideY += holdBgContainer.boardH + boardData.tileSize;
		}

		if(!boardSettings.preview && !boardSettings.hold){
			overallW += statusBgContainer.boardW;
		}

		statusContainer.x = sideX;
		statusContainer.y = sideY;

		var scalePercentW = 530/overallW;
		var scalePercentH = 780/overallH;

		scalePercent = scalePercentW < scalePercentH ? scalePercentW : scalePercentH;

		scoreContainer.regX = 0;
		scoreContainer.x = boardScaleContainer.x - (overallW * scalePercent/2);
		scoreContainer.y = (boardScaleContainer.y) - (overallH * scalePercent/2);
		scoreContainer.y -= (boardData.tileSize + scoreBgContainer.boardH) * scalePercent;

		timerContainer.x = scoreContainer.x + ((scoreBgContainer.boardW + boardData.tileSize)* scalePercent);
		timerContainer.y = scoreContainer.y;

		boardScaleContainer.regX = (overallW/2);
		boardScaleContainer.regY = (overallH/2);
	}
	
	boardScaleContainer.scaleX = boardScaleContainer.scaleY = scalePercent;
	scoreContainer.scaleX = scoreContainer.scaleY = scalePercent;
	timerContainer.scaleX = timerContainer.scaleY = scalePercent;
}

 /*!
 * 
 * SET GAME LEVEL - This is the function that runs to set game level
 * 
 */
function setGameLevel(){
	boardData.speed = modes_arr[gameData.mode].levels[gameData.level].speed;
	boardData.score = modes_arr[gameData.mode].levels[gameData.level].score;
	boardData.speedScore = modes_arr[gameData.mode].levels[gameData.level].speedScore;
}


/*!
 * 
 * PREPARE BLOCKS - This is the function that runs to prepare blocks
 * 
 */
function prepareBlocks(){
	var sum = 0;
	for(var n=0; n<blocks_arr.length; n++){
		blocks_arr[n].index = n;

		for (var s = 0; s < 4; s++) {
			if (blocks_arr[n].rotate){
				blocks_arr[n].shape[s + 1] = getRotatedShape(blocks_arr[n].shape[s]);
			}else{
				blocks_arr[n].shape[s + 1] = blocks_arr[n].shape[0].slice(0);
			}
		}

		sum+= blocks_arr[n].chances;
	}

	for(var n=0; n<blocks_arr.length; n++){
		blocks_arr[n].chances/= sum;
	}
}

function getRotatedShape(form) {
	var newForm = new Array(form.length);
	for (var i = 0; i < newForm.length; i+= 2) {
		newForm[i] = -form[i + 1];
		newForm[i + 1] = form[i];
	}
	return newForm;
};

/*!
 * 
 * BUILD BOARD - This is the function that runs to build board
 * 
 */
function buildTetrisBoard(){
	boardData.board = new Array(boardData.row);
	for (var y = boardData.row; y--; ) {
		boardData.board[y] = new Array(boardData.column);
	}

	boardData.topY = new Array(boardData.column);
	boardData.topPosY = new Array(boardData.column);
	for (var i = boardData.column; i--; ) {
		boardData.topY[i] = boardData.row;
		boardData.topPosY[i] = boardData.row;
	}
	
	boardData.blocks = [];
	boardData.holdBlock = [];
	boardData.hold = true;
	boardData.slideAnimation = false;

	tempIndex = 0;
	prepareNextBlocks();
	getBlockPos();

	buildBackground(designData.holdC, designData.holdR, holdBgContainer, holdMask);
	buildBackground(designData.stateC, designData.stateR, statusBgContainer);
	buildBackground(designData.scoreC, designData.scoreR, scoreBgContainer);
	buildBackground(designData.timerC, designData.timerR, timerBgContainer);
	buildBackground(boardData.column, boardData.row, boardBgContainer, boardMask);

	var roundedTile = boardData.tileBorderRadius;
	statusBg.alpha = .5;
	statusBg.graphics.clear();
	statusBg.graphics.beginFill(themes_arr[gameData.theme].board.background).drawRoundRect(0, 0, boardBgContainer.boardW, boardBgContainer.boardH, roundedTile, roundedTile, roundedTile, roundedTile);

	gameData.countdown = boardSettings.countdown;
	loopGameCountdown();
}

/*!
 * 
 * LOOP COUNTDOWN - This is the function that runs to loop countdown
 * 
 */
function loopGameCountdown(){
	TweenMax.to(boardContainer, 1, {overwrite:true, onComplete:function(){
		gameStatusTxt.text = gameData.countdown;

		gameData.countdown--;
		if(gameData.countdown < 0){
			gameData.paused = false;
			gameStatusTxt.text = '';
			startNewBlock();
			buildBlocks();
			loopBlocks();
			toggleGameTimer(true);
			playSoundLoop('musicGame'+gameData.theme);
		}else{
			playSound('soundCount');
			loopGameCountdown();
		}
	}});
}

/*!
 * 
 * PREPARE NEXT BLOCKS - This is the function that runs prepare next blocks
 * 
 */
var temp_arr = [
	{index:1, dir:2},
	{index:0, dir:0},
	{index:2, dir:0},
	{index:5, dir:0},
	{index:5, dir:0},
	{index:2, dir:0},
	{index:5, dir:0},
	{index:1, dir:0},
	{index:4, dir:1},
	{index:6, dir:0},
	{index:0, dir:0},
	{index:0, dir:0},
	{index:0, dir:0},
	{index:0, dir:0},
	{index:0, dir:0},
	{index:0, dir:0},
];
var tempIndex = 0;
var tempTest = false;
function prepareNextBlocks(){
	if(tempTest){
		for(var n=0; n<boardData.totalPreview; n++){
			if(boardData.blocks.length < boardData.totalPreview){
				boardData.blocks.push(blocks_arr[temp_arr[tempIndex].index]);
				boardData.blocks[boardData.blocks.length-1].dir = temp_arr[tempIndex].dir;
				tempIndex++;
			}
		}
	}else{
		for(var n=0; n<boardData.totalPreview; n++){
			if(boardData.blocks.length < boardData.totalPreview){
				boardData.blocks.push(getNextBlocks());
				boardData.blocks[boardData.blocks.length-1].dir = Math.random() * 4 | 0;
			}
		}
	}

	buildPreviewBlock();
}

function getNextBlocks() {
	var randomBlock = Math.random();
	/*for (var n = blocks_arr.length; n--; ) {
		if (randomBlock < blocks_arr[n].chances)
			return blocks_arr[n];
			randomBlock-= blocks_arr[n].chances;
	}*/
	for (var n = modes_arr[gameData.mode].blocks.length; n--; ) {
		var thisIndex = modes_arr[gameData.mode].blocks[n];
		if (randomBlock < blocks_arr[thisIndex].chances)
			return blocks_arr[thisIndex];
			randomBlock-= blocks_arr[thisIndex].chances;
	}
	return blocks_arr[modes_arr[gameData.mode].blocks[0]];
};

function getBlockPos() {
	var minY = 0;
	var maxY = 0;
	boardData.direction = boardData.blocks[0].dir;
	var cur = boardData.blocks[0].shape[boardData.direction];

	for (var i = 0; i < cur.length; i+= 2) {
		minY = Math.min(minY, cur[i + 1]);
		maxY = Math.max(maxY, cur[i + 1]);
	}
	boardData.curX = boardData.column >> 1;
	boardData.curY = Math.abs(minY);

	var inBoard = true;
	for(var n=0; n<cur.length; n++){
		var loopCon = false;
		for (var i = 0; i < cur.length; i+= 2) {
			var curX = cur[i] + boardData.curX;
			var curY = cur[i + 1] + boardData.curY;
			if(curX >= 0 && curY >=0){
				if(boardData.board[curY][curX] != undefined){
					loopCon = true;
				}
			}else{
				inBoard = false;
			}
		}
		if(loopCon){
			boardData.curY--;
		}else{
			n = cur.length;
		}
	}

	if(!inBoard){
		integrateBlocks();
	}
};

/*!
 * 
 * GAME TIMER - This is the function that runs for game timer
 * 
 */
function toggleGameTimer(con){	
	if(con){
		timeData.startDate = new Date();
	}else{
		
	}
	timeData.enable = con;
}

/*!
 * 
 * UPDATE GAME - This is the function that runs to loop game update
 * 
 */
function updateGame(){
	if(!gameData.paused){
		if(timeData.enable){
			timeData.nowDate = new Date();
			timeData.elapsedTime = Math.floor((timeData.nowDate.getTime() - timeData.startDate.getTime()));

			if(modes_arr[gameData.mode].mode == 'timer'){
				timeData.timer = Math.floor(((timeData.countdown)) - (timeData.elapsedTime))
			}else{
				timeData.timer = (timeData.elapsedTime + timeData.oldTimer);
			}

			if(timeData.timer <= 0){
				if(!gameData.over){
					timeData.timer = 0;
					toggleEndStatus('timer');
					endGame();
				}
			}

			timerTxt.text = textDisplay.timer.replace('[NUMBER]', millisecondsToTimeGame(timeData.timer));
		}
	}
}

function loopBlocks(){
	TweenMax.to(boardContainer, boardData.speed, {overwrite:true, onComplete:function(){
		if(!gameData.paused){
			if (boardData.autoMode) {
				if (findBlockSpot()) {
					integrateBlocks();
				}
	
			} else if (!tryDown(boardData.curY + 1)) {
				integrateBlocks();
			}
			
			buildBlocks();
		}

		loopBlocks();
	}});
}

/*!
 * 
 * FIND SPOT - This is the function that runs to find blocks spot
 * 
 */
function findBlockSpot() {
	var minCost = 100;
	var minDir;
	var minX;

	for (var s = 0; s < 4; s++) {
		for (var x = boardData.column; x--; ) {
			if (tryMove(x, s)) {
				var cost = calcCost(x, s);
				if (cost < minCost) {
					minCost = cost;
					minDir = s;
					minX = x;
				}
			}
		}

	}

	boardData.curX = minX;
	boardData.direction = minDir;
	
	while (tryDown(boardData.curY + 1)) {}
	return true;
};

function calcCost(curX, rotation) {
	var cur = boardData.blocks[0].shape[rotation];
	var dist = boardData.row;
	for (var i = 0; i < cur.length; i+= 2) {
		dist = Math.min(dist, boardData.topY[curX + cur[i]] - boardData.curY - cur[i + 1]);
	}

	var minY = boardData.row;
	for (var i = 0; i < cur.length; i+= 2) {
		minY = Math.min(minY, cur[i + 1] + boardData.curY + dist - 1);
	}

	if (minY < 0)
		return boardData.row;

	var holes = 0;
	for (var i = boardData.topY[curX + cur[i]]; i < boardData.row; i++) {
		holes+= boardData.board[curX + cur[i]][i] === undefined;
	}

	var newHoles = 0;
	for (var i = 0; i < cur.length; i+= 2) {
		var x = cur[i] + curX;
		var y = cur[i + 1] + boardData.curY + dist - 1;
		var take = true;
		for (var j = 0; j < cur.length; j+= 2) {
			if (i !== j) {
				if (cur[i] === cur[j] && cur[i + 1] < cur[j + 1]) {
					take = false;
					break;
				}
			}
		}

		if (take) {
			for (j = y + 1; j < boardData.row && boardData.board[j][x] === undefined; j++) {
				newHoles++;
			}
		}
	}

	return (1 / minY + holes + newHoles);
};

/*!
 * 
 * INTEGRATE AND REMOVE LINES - This is the function that runs to integrate blocks and remove lines
 * 
 */
function integrateBlocks() {
	var isEndGame = false;
	var inBoard = false;
	var cur = boardData.blocks[0].shape[boardData.direction];
	for (var i = 0; i < cur.length; i+= 2) {
		var cur = boardData.blocks[0].shape[boardData.direction];
		var curX = cur[i] + boardData.curX;
		var curY = cur[i + 1] + boardData.curY;
		if(curX >= 0 && curY >=0){
			inBoard = true;
			if(boardData.board[curY][curX] != undefined){
				isEndGame = true;
				break;
			}else{
				boardData.board[curY][curX] = boardData.blocks[0].index;
				var minY = cur[i + 1] + boardData.curY;
				minY = minY < 0 ? 0 : minY;
				boardData.topY[cur[i] + boardData.curX] = Math.min(boardData.topY[cur[i] + boardData.curX], minY);
			}
		}
	}

	if(!inBoard){
		isEndGame = true;
	}

	if(isEndGame){
		if(modes_arr[gameData.mode].mode == 'goal'){
			buildTetrisBoard();
		}else{
			if(!gameData.over){
				toggleEndStatus('over');
				endGame();
			}
		}
	}else{
		playSound('soundDrop');
		checkCompleteLines();
		updateGameScore(boardData.speedScore);
	}
};

function checkCompleteLines() {
	boardData.remove = [];

	for (var x, y = 0; y < boardData.row; y++) {
		for (x = boardData.column; x--; ) {
			if (boardData.board[y][x] === undefined) {
				break;
			}
		}

		if (x < 0) {
			boardData.remove.push(y);
		}
	}

	if (boardData.remove.length > 0) {
		gameData.paused = true;
		boardData.animate = boardSettings.flashTime;
		TweenMax.killTweensOf(boardContainer);

		buildBlocks();
		TweenMax.to(blocksContainer, .2, {overwrite:true, onComplete:function(){
			if(boardData.completeAnimation == 'flash'){
				animateFlashLines();
			}else{
				animateSlideLines();
			}
		}});
	}else{
		boardData.hold = true;
		startNewBlock();
	}
};

function animateFlashLines(){
	playSound('soundRemove');
	blocksContainer.uncache();

	var completeColor = themes_arr[gameData.theme].complete;
	for (var i = 0; i < boardData.remove.length; i++) {
		for (var x = boardData.column; x--; ) {
			if (isEven(boardData.animate)) {
				var completeImage = themes_arr[gameData.theme].completeImage;
				completeImage = completeImage == undefined ? '' : 'completeImage'+gameData.theme;
				drawTile(x, boardData.remove[i], completeColor, completeImage, 1, blocksContainer);
			} else if (boardData.board[boardData.remove[i]][x] !== undefined) {
				var color = themes_arr[gameData.theme].blocks[boardData.board[boardData.remove[i]][x]];
				var tileImage = getTileImage(boardData.board[boardData.remove[i]][x]);
				drawTile(x, boardData.remove[i], color, tileImage, 1, blocksContainer);
			}
		}
	}
	
	boardData.animate--;
	boardData.animate = boardData.animate < 0 ? 0 : boardData.animate;

	TweenMax.to(blocksContainer, boardSettings.flashSpeed, {overwrite:true, onComplete:function(){
		if(boardData.animate == 0){
			boardData.slideAnimation = false;
			gameData.paused = false;
			boardData.hold = true;
			
			removeLines();
			startNewBlock();
		}else{
			animateFlashLines();
		}
	}});
}

function animateSlideLines(){
	boardData.slideAnimation = true;
	buildBlocks();
	blocksContainer.uncache();

	playSound('soundRemove2');
	var completeColor = themes_arr[gameData.theme].complete;
	for (var i = 0; i < boardData.remove.length; i++) {
		for (var x = boardData.column; x--; ) {
			var completeImage = themes_arr[gameData.theme].completeImage;
			completeImage = completeImage == undefined ? '' : 'completeImage'+gameData.theme;
			var tileContainer = drawTile(x, boardData.remove[i], completeColor, completeImage, 1, blocksContainer);
			
			TweenMax.to(tileContainer, boardSettings.slideSpeed, {x:tileContainer.x + (boardData.column * boardData.tileSize),overwrite:true});
		}
	}

	TweenMax.to(blocksContainer, boardSettings.slideSpeed, {delay:boardSettings.slideSpeed, overwrite:true, onComplete:function(){
		boardData.slideAnimation = false;
		gameData.paused = false;
		boardData.hold = true;
		removeLines();
		startNewBlock();
	}});
}

function removeLines() {
	var rp = boardData.remove.length - 1;
	var wp = boardData.remove[rp--];
	var mp = wp - 1;

	for (; mp >= 0; mp--) {
		if (rp >= 0 && boardData.remove[rp] === mp) {
			rp--;
		} else {
			boardData.board[wp--] = boardData.board[mp];
		}
	}

	while (wp >= 0) {
		boardData.board[wp--] = new Array(boardData.column);
	}

	for (mp = boardData.column; mp--; ) {
		boardData.topY[mp]+= boardData.remove.length;
		while (boardData.topY[mp] < boardData.row && boardData.board[boardData.topY[mp]][mp] === undefined) {
			boardData.topY[mp]++;
		}
	}

	playerData.cleared += boardData.remove.length;
	updateGameScore(boardData.remove.length * boardData.score);
};


function startNewBlock() {
	boardData.blocks.splice(0,1);

	prepareNextBlocks();
	getBlockPos();
	buildBlocks();
	loopBlocks();
};

/*!
 * 
 * GAME STATUS - This is the function that runs for game status
 * 
 */
function updateGameScore(score){
	playerData.score += score;

	if(playerData.cleared >= modes_arr[gameData.mode].levels[gameData.level].goal){
		gameData.level++;
		gameData.level = gameData.level > modes_arr[gameData.mode].levels.length-1 ? modes_arr[gameData.mode].levels.length-1 : gameData.level;
		setGameLevel();
	}

	updateGameStatus();
}

function updateGameStatus(){
	levelTxt.text = textDisplay.level.replace('[NUMBER]', gameData.level+1);
	linesTxt.text = textDisplay.lines.replace('[NUMBER]', playerData.cleared);
	goalTxt.text = textDisplay.goal.replace('[NUMBER]', modes_arr[gameData.mode].levels[gameData.level].goal);

	TweenMax.to(tweenData, .5, {tweenScore:playerData.score, overwrite:true, onUpdate:function(){
		scoreTxt.text = textDisplay.score.replace('[NUMBER]', addCommas(Math.floor(tweenData.tweenScore)));
	}});

	if(modes_arr[gameData.mode].mode == 'goal'){
		if(gameData.level == modes_arr[gameData.mode].levels.length-1){
			if(playerData.cleared >= modes_arr[gameData.mode].levels[gameData.level].goal){
				toggleEndStatus('complete');
				endGame();
			}
		}
	}
}

/*!
 * 
 * BUILD GAME - This is the function that runs to build game
 * 
 */

function buildThemeBlock(){
	customBlockContainer.removeAllChildren();

	var curX = Math.floor(designData.popC/2);
	var curY = curPage == 'custom' ? 3 : 5;
	for(var n=0; n<1; n++){
		var topY = 0;
		var bottomY = 0;
		var cur = boardData.blocks[n].shape[boardData.blocks[n].dir];
		for (var i = 0; i < cur.length; i+= 2) {
			if(cur[i + 1] < 0){
				topY = topY > cur[i + 1] ? cur[i + 1] : topY;
			}
			if(cur[i + 1] > 0){
				bottomY = bottomY < cur[i + 1] ? cur[i + 1] : bottomY;
			}
		}

		curY += Math.abs(topY);
		for (var i = 0; i < cur.length; i+= 2) {
			var tileImage = getTileImage(boardData.blocks[n].index);
			drawTile(cur[i] + curX, cur[i + 1] + curY, themes_arr[gameData.theme].blocks[boardData.blocks[n].index], tileImage, 1, customBlockContainer);
		}
		curY += bottomY + 3;
	}
}

function buildHoldBlock(){
	holdBlocksContainer.removeAllChildren();

	var curX = Math.floor(designData.holdC/2);
	var curY = 1;
	for(var n=0; n<1; n++){
		var topY = 0;
		var bottomY = 0;
		var cur = boardData.holdBlock[n].shape[boardData.holdBlock[n].dir];
		for (var i = 0; i < cur.length; i+= 2) {
			if(cur[i + 1] < 0){
				topY = topY > cur[i + 1] ? cur[i + 1] : topY;
			}
			if(cur[i + 1] > 0){
				bottomY = bottomY < cur[i + 1] ? cur[i + 1] : bottomY;
			}
		}

		curY += Math.abs(topY);
		for (var i = 0; i < cur.length; i+= 2) {
			var tileImage = getTileImage(boardData.holdBlock[n].index);
			drawTile(cur[i] + curX, cur[i + 1] + curY, themes_arr[gameData.theme].blocks[boardData.holdBlock[n].index], tileImage, 1, holdBlocksContainer);
		}
		curY += bottomY + 3;
	}
}

function buildPreviewBlock(){
	previewBlocksContainer.removeAllChildren();

	var totalPreview = viewport.isLandscape == true ? boardSettings.previewTotal : boardSettings.previewTotalPortrait;
	var curY = 1;
	for(var n=1; n<totalPreview+1; n++){
		var curX = 1;
		var minX = 0;
		var topY = 0;
		var bottomY = 0;
		var cur = boardData.blocks[n].shape[boardData.blocks[n].dir];
		for (var i = 0; i < cur.length; i+= 2) {
			minX = Math.min(cur[i], minX);
			if(cur[i + 1] < 0){
				topY = topY > cur[i + 1] ? cur[i + 1] : topY;
			}
			if(cur[i + 1] > 0){
				bottomY = bottomY < cur[i + 1] ? cur[i + 1] : bottomY;
			}
		}

		if(minX < 0){
			curX -= minX;
		}

		curY += Math.abs(topY);
		for (var i = 0; i < cur.length; i+= 2) {
			var tileImage = getTileImage(boardData.blocks[n].index);
			drawTile(cur[i] + curX, cur[i + 1] + curY, themes_arr[gameData.theme].blocks[boardData.blocks[n].index], tileImage, 1, previewBlocksContainer);
		}
		curY += bottomY + 2;
	}
}

function getTileImage(n){
	var tileImage = '';
	if(themes_arr[gameData.theme].blocksImages != undefined){
		tileImage = tileImage == undefined ? '' : 'tileImage'+gameData.theme+'_'+n;
	}
	return tileImage;
}

function buildTileButton(column, row, container){
	container.removeAllChildren();

	var boardW = boardData.tileBorder + column * (boardData.tileBorder + boardData.tileSize);
	var boardH = boardData.tileBorder + row * (boardData.tileBorder + boardData.tileSize);

	var roundedBorder = themes_arr[gameData.theme].bgBorderRadius;
	var boardBorder  = new createjs.Shape();
	boardBorder.graphics.clear();
	boardBorder.graphics.beginFill(themes_arr[gameData.theme].button.border).drawRoundRect(-boardData.bgBorder, -boardData.bgBorder, boardW + (boardData.bgBorder * 2), boardH+ (boardData.bgBorder * 2), roundedBorder, roundedBorder, roundedBorder, roundedBorder);

	var roundedBorderInner = themes_arr[gameData.theme].bgBorderInnerRadius;
	var boardBorderInner  = new createjs.Shape();
	boardBorderInner.graphics.clear();
	boardBorderInner.graphics.beginFill(themes_arr[gameData.theme].button.borderInner).drawRoundRect(-boardData.bgBorderInner, -boardData.bgBorderInner, boardW + (boardData.bgBorderInner * 2), boardH + (boardData.bgBorderInner * 2), roundedBorderInner, roundedBorderInner, roundedBorderInner, roundedBorderInner);

	var roundedTile = boardData.tileBorderRadius;
	var boardBackground  = new createjs.Shape();
	boardBackground.graphics.clear();
	boardBackground.graphics.beginFill(themes_arr[gameData.theme].button.background).drawRoundRect(0, 0, boardW, boardH, roundedTile, roundedTile, roundedTile, roundedTile);
	
	container.addChild(boardBorder, boardBorderInner, boardBackground);
	container.boardW = boardW;
	container.boardH = boardH;

	for (var y = row; y--; ) {
		for (var x = column; x--; ) {
			var tileImage = themes_arr[gameData.theme].button.tileImage;
			tileImage = tileImage == undefined ? '' : 'buttonTileImage'+gameData.theme;
			drawTile(x, y, themes_arr[gameData.theme].button.tile, tileImage, 1, container);
		}
	}
}

function buildBackground(column, row, container, mask){
	container.removeAllChildren();

	var boardW = boardData.tileBorder + column * (boardData.tileBorder + boardData.tileSize);
	var boardH = boardData.tileBorder + row * (boardData.tileBorder + boardData.tileSize);

	var roundedBorder = themes_arr[gameData.theme].bgBorderRadius;
	var boardBorder  = new createjs.Shape();
	boardBorder.graphics.clear();
	boardBorder.graphics.beginFill(themes_arr[gameData.theme].board.border).drawRoundRect(-boardData.bgBorder, -boardData.bgBorder, boardW + (boardData.bgBorder * 2), boardH+ (boardData.bgBorder * 2), roundedBorder, roundedBorder, roundedBorder, roundedBorder);

	var roundedBorderInner = themes_arr[gameData.theme].bgBorderInnerRadius;
	var boardBorderInner  = new createjs.Shape();
	boardBorderInner.graphics.clear();
	boardBorderInner.graphics.beginFill(themes_arr[gameData.theme].board.borderInner).drawRoundRect(-boardData.bgBorderInner, -boardData.bgBorderInner, boardW + (boardData.bgBorderInner * 2), boardH + (boardData.bgBorderInner * 2), roundedBorderInner, roundedBorderInner, roundedBorderInner, roundedBorderInner);

	var roundedTile = boardData.tileBorderRadius;
	var boardBackground  = new createjs.Shape();
	boardBackground.graphics.clear();
	boardBackground.graphics.beginFill(themes_arr[gameData.theme].board.background).drawRoundRect(0, 0, boardW, boardH, roundedTile, roundedTile, roundedTile, roundedTile);

	if(mask != undefined){
		mask.graphics.clear();
		mask.graphics.beginFill(themes_arr[gameData.theme].board.background).drawRoundRect(0, 0, boardW, boardH, roundedTile, roundedTile, roundedTile, roundedTile);
	}
	
	container.addChild(boardBorder, boardBorderInner, boardBackground);
	container.boardW = boardW;
	container.boardH = boardH;

	for (var y = row; y--; ) {
		for (var x = column; x--; ) {
			var tileImage = themes_arr[gameData.theme].board.tileImage;
			tileImage = tileImage == undefined ? '' : 'tileImage'+gameData.theme;
			drawTile(x, y, themes_arr[gameData.theme].board.tile, tileImage, 1, container);
		}
	}

	container.cache(-boardData.bgBorder,-boardData.bgBorder,boardW+(boardData.bgBorder*2),boardH+(boardData.bgBorder*2));
}

function buildBlocks(){
	blocksContainer.uncache();
	blocksContainer.removeAllChildren();
	var cur = boardData.blocks[0].shape[boardData.direction];
	var drawCurrent = true;
	for (var y = boardData.row; y--; ) {
		for (var x = boardData.column; x--; ) {
			if (boardData.board[y][x] !== undefined) {
				var canDraw = true;
				if(boardData.slideAnimation){
					for (var n = 0; n < boardData.remove.length; n++ ) {
						if(y == boardData.remove[n]){
							canDraw = false;
							drawCurrent = false;
						}
					}
				}

				if(canDraw){
					var color = themes_arr[gameData.theme].blocks[boardData.board[y][x]];
					var tileImage = getTileImage(boardData.board[y][x]);
					drawTile(x, y, color, tileImage, 1, blocksContainer);
				}
			}
		}
	}
	
	if (boardData.shadow && !boardData.autoMode && !gameData.paused) {
		getTopPosY();
		var dist = boardData.row;
		for (var i = 0; i < cur.length; i+= 2) {
			dist = Math.min(dist, boardData.topPosY[cur[i] + boardData.curX] - (boardData.curY + cur[i + 1]));
		}
		for (var i = 0; i < cur.length; i+= 2) {
			var shadowImage = themes_arr[gameData.theme].shadowImage;
			shadowImage = shadowImage == undefined ? '' : 'shadowImage'+gameData.theme;
			drawTile(cur[i] + boardData.curX, cur[i + 1] + boardData.curY + dist - 1, themes_arr[gameData.theme].shadow, shadowImage, boardData.shadowAlpha, blocksContainer);
		}
	}

	if(drawCurrent){
		for (var i = 0; i < cur.length; i+= 2) {
			var tileImage = getTileImage(boardData.blocks[0].index);
			drawTile(cur[i] + boardData.curX, cur[i + 1] + boardData.curY, themes_arr[gameData.theme].blocks[boardData.blocks[0].index], tileImage, 1, blocksContainer);
		}
	}

	blocksContainer.cache(-boardData.tileBorder,-boardData.tileBorder,boardBgContainer.boardW+(boardData.tileBorder*2),boardBgContainer.boardH+(boardData.tileBorder*2));
}

function getTopPosY(){
	for (var x = boardData.column; x--; ) {
		boardData.topPosY[x] = boardData.row;
	}

	for (var y = boardData.row; y--; ) {
		for (var x = boardData.column; x--; ) {
			if(y > boardData.curY){
				if(boardData.board[y][x] != undefined){
					boardData.topPosY[x] = y;
				}
			}
		}
	}
}

function drawTile(x, y, color, image, alpha, container) {
	var newTileContainer = new createjs.Container();
	newTileContainer.x = boardData.tileBorder + x * (boardData.tileBorder + boardData.tileSize);
	newTileContainer.y = boardData.tileBorder + y * (boardData.tileBorder + boardData.tileSize);

	var roundedTile = boardData.tileBorderRadius;
	var tileBorderShape = new createjs.Shape();
	tileBorderShape.graphics.beginFill(color[0]).drawRoundRect(-boardData.tileBorder, -boardData.tileBorder, boardData.tileSize + boardData.tileBorder + boardData.tileBorder, boardData.tileSize + boardData.tileBorder + boardData.tileBorder, roundedTile, roundedTile, roundedTile, roundedTile);

	var tileInnerLightBorderShape = new createjs.Shape();
	tileInnerLightBorderShape.graphics.beginFill(color[2]).drawRect(0, 0, boardData.tileSize, boardData.tileSize);

	var tileInnerDarkBorderShape = new createjs.Shape();
	tileInnerDarkBorderShape.graphics.beginFill(color[3]).mt(0,0).lt(0,boardData.tileSize).lt(boardData.tileSize,boardData.tileSize).ef();

	var tileShape = new createjs.Shape();
	tileShape.graphics.beginFill(color[1]).drawRect(boardData.tileBorder, boardData.tileBorder, boardData.tileSize - 2 * boardData.tileBorder, boardData.tileSize - 2 * boardData.tileBorder);

	var tileImage = new createjs.Shape();
	if(image != ''){
		tileImage = new createjs.Bitmap(loader.getResult(image));
	}

	newTileContainer.addChild(tileBorderShape, tileInnerLightBorderShape, tileInnerDarkBorderShape, tileShape, tileImage);
	newTileContainer.alpha = alpha;
	container.addChild(newTileContainer);

	//newTileContainer.cache(-boardData.tileBorder,-boardData.tileBorder,boardData.tileSize+(boardData.tileBorder*2),boardData.tileSize+(boardData.tileBorder*2));
	return newTileContainer;
};

/*!
 * 
 * GAME CONTROL - This is the function that runs for game control
 * 
 */
function gameControl(control){
	if(gameData.paused){
		return;
	}

	if(gameData.instruction){
		gameData.instruction = false;
		toggleGameInstruction(false);
	}

	switch (control) {
		case 'left':
			tryMove(boardData.curX - 1, boardData.direction);
			buildBlocks();
			break;
		case 'right':
			tryMove(boardData.curX + 1, boardData.direction);
			buildBlocks();
			break;
		case 'rotate':
			tryMove(boardData.curX, (boardData.direction + 1) % 4);
			buildBlocks();
			playSound('soundCount');
			break;
		case 'down':
			if (!tryDown(boardData.curY + 1))
				integrateBlocks();
				buildBlocks();
				playSound('soundDown');
			break;
		case 'drop':
			while (tryDown(boardData.curY + 1)) {
			}
			integrateBlocks();
			buildBlocks();
			break;
		case 'hold':
			tryHold();
			break;
		default:
			return;
	}
}

function tryDown(newY) {
	var cur = boardData.blocks[0].shape[boardData.direction];

	for (var i = 0; i < cur.length; i+= 2) {
		var x = cur[i] + boardData.curX;
		var y = cur[i + 1] + newY;

		if (y >= boardData.row || boardData.board[y] !== undefined && boardData.board[y][x] !== undefined) {
			return false;
		}
	}
	boardData.curY = newY;
	return true;
};

function tryMove(newX, dir) {
	var cur = boardData.blocks[0].shape[dir];
	for (var i = 0; i < cur.length; i+= 2) {

		var x = cur[i] + newX;
		var y = cur[i + 1] + boardData.curY;

		if (x < 0 || x >= boardData.column || y >= 0 && boardData.board[y][x] !== undefined) {
			return false;
		}
	}
	boardData.curX = newX;
	boardData.direction = dir;
	return true;
};

function tryHold(){
	if(!boardSettings.hold){
		return;
	}

	if(!boardData.hold){
		return;
	}

	playSound('soundHold');
	boardData.hold = false;

	if(boardData.holdBlock.length == 0){
		boardData.holdBlock[0] = boardData.blocks[0];
		startNewBlock();
		buildHoldBlock();
	}else{
		var holdBlock = boardData.blocks[0];
		boardData.blocks[0] = boardData.holdBlock[0];
		boardData.holdBlock[0] = holdBlock;

		buildHoldBlock();
		getBlockPos();
		buildBlocks();
	}
}

/*!
 * 
 * GAME UI - This is the function that runs for game ui
 * 
 */
function toggleGameInstruction(con){
	var alphaNum = con == true ? 1 : 0;
	TweenMax.to(instructionContainer, .5, {delay:1, alpha:alphaNum, overwrite:true});
}

function toggleTouchAlpha(obj, con){
	if(con){
		obj.alpha = .5;
	}else{
		obj.alpha = 1;
	}
}


/*!
 * 
 * END GAME - This is the function that runs for game end
 * 
 */
function endGame(){
	gameData.paused = true;
	gameData.over = true;

	playThemeMusic(false);
	playSound('soundOver');
	toggleGameTimer(false);

	TweenMax.to(gameContainer, 2, {overwrite:true, onComplete:function(){
		goPage('result')
	}});
}

function toggleEndStatus(con){
	statusBg.visible = true;

	if(con == 'over'){
		gameStatusTxt.text = textDisplay.gameover;
	}else if(con == 'complete'){
		gameStatusTxt.text = textDisplay.complete;
	}else if(con == 'timer'){
		gameStatusTxt.text = textDisplay.timesup;
	}
}

/*!
 * 
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 * 
 */
function millisecondsToTimeGame(milli) {
	var milliseconds = milli % 1000;
	var seconds = Math.floor((milli / 1000) % 60);
	var minutes = Math.floor((milli / (60 * 1000)) % 60);
	
	if(seconds<10){
		seconds = '0'+seconds;  
	}
	
	if(minutes<10){
		minutes = '0'+minutes;  
	}
	
	return minutes+':'+seconds;
}

/*!
 * 
 * OPTIONS - This is the function that runs to toggle options
 * 
 */

function toggleOption(){
	if(optionsContainer.visible){
		optionsContainer.visible = false;
		toggleGamePause(false);
	}else{
		optionsContainer.visible = true;
		toggleGamePause(true);
	}
}

function toggleGamePause(con){
	if(curPage != 'game'){
		return;
	}

	if(gameData.over){
		return;
	}

	gameData.paused = con;
	pauseTxt.visible = con;
	statusBg.visible = con;
	if(con){
		playSound('soundStart');
		toggleSoundLoop('musicGame'+gameData.theme, false)
		TweenMax.pauseAll(true, true);

		timeData.oldTimer = timeData.timer;
		timeData.countdown = timeData.timer;
		toggleGameTimer(false);
	}else{
		toggleSoundLoop('musicGame'+gameData.theme, true)
		TweenMax.resumeAll(true, true);
		toggleGameTimer(true);
	}
}


/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleGameMute(con){
	buttonSoundOff.visible = false;
	buttonSoundOn.visible = false;
	toggleMute(con);
	if(con){
		buttonSoundOn.visible = true;
	}else{
		buttonSoundOff.visible = true;	
	}
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.eritFullscreen) {
      document.eritFullscreen();
    } else if (document.msEritFullscreen) {
      document.msEritFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitEritFullscreen) {
      document.webkitEritFullscreen();
    }
  }
}

/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	gtag('event','click',{'event_category':'share','event_label':action});
	
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	
	var title = '';
	var text = '';
	
	title = shareTitle.replace("[SCORE]", addCommas(playerData.score));
	text = shareMessage.replace("[SCORE]", addCommas(playerData.score));
	
	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}else if( action == 'whatsapp' ){
		shareurl = "whatsapp://send?text=" + encodeURIComponent(text) + " - " + encodeURIComponent(loc);
	}
	
	window.open(shareurl);
}