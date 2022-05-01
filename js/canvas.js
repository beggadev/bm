////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	var gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.width = w;
	gameCanvas.height = h;
	
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener("tick", tick);
}

var guide = false;
var canvasContainer, mainContainer, gameContainer, instructionContainer, resultContainer, moveContainer, confirmContainer;
var guideline, bg, logo, buttonOk, result, shadowResult, buttonReplay, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonSoundOn, buttonSoundOff;

$.button = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	buttonTypeContainer = new createjs.Container();
	buttonModeContainer = new createjs.Container();
	customContainer = new createjs.Container();
	customBlockContainer = new createjs.Container();
	customSizeContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	boardContainer = new createjs.Container();
	boardScaleContainer = new createjs.Container();
	boardBgContainer = new createjs.Container();
	blocksContainer = new createjs.Container();
	holdContainer = new createjs.Container();
	holdBgContainer = new createjs.Container();
	holdBlocksContainer = new createjs.Container();
	previewContainer = new createjs.Container();
	previewBgContainer = new createjs.Container();
	previewBlocksContainer = new createjs.Container();
	statusContainer = new createjs.Container();
	statusBgContainer = new createjs.Container();
	statusTextContainer = new createjs.Container();
	scoreContainer = new createjs.Container();
	scoreBgContainer = new createjs.Container();
	timerContainer = new createjs.Container();
	timerBgContainer = new createjs.Container();
	touchContainer = new createjs.Container();
	popContainer = new createjs.Container();
	popBgContainer = new createjs.Container();
	popBgInnerContainer = new createjs.Container();
	instructionContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	confirmContainer = new createjs.Container();
	
	bg = new createjs.Bitmap(loader.getResult('background'));
	bgP = new createjs.Bitmap(loader.getResult('backgroundP'));
	
	logo = new createjs.Bitmap(loader.getResult('logo'));
	logoP = new createjs.Bitmap(loader.getResult('logoP'));

	buttonClassic = createButton('buttonClassic', textDisplay.buttonClassic, true);
	buttonCustom = createButton('buttonCustom', textDisplay.buttonCustom, true);

	buttonModeL = createButton('buttonModeL', '', false, 'itemArrowL');
	buttonModeR = createButton('buttonModeR', '', false, 'itemArrowR');
	buttonMode = createButton('buttonMode', '', true);

	modeDescTxt = new createjs.Text();
	modeDescTxt.font = "25px aldo_the_apacheregular";
	modeDescTxt.color = '#fff';
	modeDescTxt.textAlign = "center";
	modeDescTxt.textBaseline='alphabetic';
	modeDescTxt.text = '';

	//custom
	customTitleTxt = new createjs.Text();
	customTitleTxt.font = "60px aldo_the_apacheregular";
	customTitleTxt.textAlign = "center";
	customTitleTxt.textBaseline='alphabetic';

	sizeTxt = new createjs.Text();
	sizeTxt.font = "50px aldo_the_apacheregular";
	sizeTxt.color = '#13359e';
	sizeTxt.textAlign = "center";
	sizeTxt.textBaseline='alphabetic';
	sizeTxt.text = textDisplay.share;

	buttonRowL = createButton('buttonRowL', '', false, 'itemArrowL');
	buttonRowR = createButton('buttonRowR', '', false, 'itemArrowR');

	buttonColumnL = createButton('buttonColumnL', '', false, 'itemMinus');
	buttonColumnR = createButton('buttonColumnR', '', false, 'itemPlus');

	buttonThemeL = createButton('buttonThemeL', '', false, 'itemMinus');
	buttonThemeR = createButton('buttonThemeR', '', false, 'itemPlus');

	buttonCustomStart = createButton('buttonCustomStart', textDisplay.buttonStart, true);

	customSizeContainer.addChild(buttonRowL, buttonRowR, buttonColumnL, buttonColumnR, sizeTxt);
	customContainer.addChild(customBlockContainer, customTitleTxt, customSizeContainer, buttonCustomStart, buttonThemeL, buttonThemeR);
	
	//game
	boardBackground = new createjs.Shape();
	boardMask = new createjs.Shape();
	previewMask = new createjs.Shape();
	holdMask = new createjs.Shape();
	statusBg = new createjs.Shape();

	blocksContainer.mask = boardMask;
	previewBlocksContainer.mask = previewMask;
	holdBlocksContainer.mask = holdMask;

	nextTxt = new createjs.Text();
	nextTxt.textAlign = "center";
	nextTxt.textBaseline='alphabetic';
	nextTxt.text = textDisplay.next;

	holdTxt = new createjs.Text();
	holdTxt.textAlign = "center";
	holdTxt.textBaseline='alphabetic';
	holdTxt.text = textDisplay.hold;

	scoreTxt = new createjs.Text();
	scoreTxt.textAlign = "center";
	scoreTxt.textBaseline='alphabetic';

	timerTxt = new createjs.Text();
	timerTxt.textAlign = "center";
	timerTxt.textBaseline='alphabetic';

	goalTxt = new createjs.Text();
	goalTxt.textAlign = "center";
	goalTxt.textBaseline='alphabetic';

	linesTxt = new createjs.Text();
	linesTxt.textAlign = "center";
	linesTxt.textBaseline='alphabetic';

	levelTxt = new createjs.Text();
	levelTxt.textAlign = "center";
	levelTxt.textBaseline='alphabetic';

	statusTextContainer.addChild(goalTxt, linesTxt, levelTxt);

	gameStatusTxt = new createjs.Text();
	gameStatusTxt.textAlign = "center";
	gameStatusTxt.textBaseline='alphabetic';

	pauseTxt = new createjs.Text();
	pauseTxt.textAlign = "center";
	pauseTxt.textBaseline='alphabetic';
	pauseTxt.text = textDisplay.pause;

	instructionLeftTxt = new createjs.Text();
	instructionLeftTxt.font = "22px aldo_the_apacheregular";
	instructionLeftTxt.lineHeight = 30;
	instructionLeftTxt.color = '#ccc';
	instructionLeftTxt.textAlign = "left";
	instructionLeftTxt.textBaseline='alphabetic';
	instructionLeftTxt.text = textDisplay.instructionLeft;

	instructionRightTxt = new createjs.Text();
	instructionRightTxt.font = "22px aldo_the_apacheregular";
	instructionRightTxt.lineHeight = 30;
	instructionRightTxt.color = '#ccc';
	instructionRightTxt.textAlign = "right";
	instructionRightTxt.textBaseline='alphabetic';
	instructionRightTxt.text = textDisplay.instructionRight;

	touchUp = createButton('touchUp', '', false, 'itemUp');
	touchLeft = createButton('touchLeft', '', false, 'itemArrowL');
	touchRight = createButton('touchRight', '', false, 'itemArrowR');
	touchDown = createButton('touchDown', '', false, 'itemDown');
	touchHold = createButton('touchHold', '', false, 'itemHold');
	touchDrop = createButton('touchDrop', '', false, 'itemDrop');

	touchContainer.addChild(touchUp, touchLeft, touchRight, touchDown, touchHold, touchDrop);
	
	//result
	buttonContinue = createButton('buttonContinue', textDisplay.buttonContinue, true);
	
	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "35px aldo_the_apacheregular";
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline='alphabetic';
	resultShareTxt.text = textDisplay.share;
	
	resultTitleTxt = new createjs.Text();
	resultTitleTxt.font = "60px aldo_the_apacheregular";
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline='alphabetic';
	resultTitleTxt.text = textDisplay.resultTitle;
	
	resultDescTxt = new createjs.Text();
	resultDescTxt.font = "55px aldo_the_apacheregular";
	resultDescTxt.lineHeight = 35;
	resultDescTxt.textAlign = "center";
	resultDescTxt.textBaseline='alphabetic';
	resultDescTxt.text = '';

	resultTimerTxt = new createjs.Text();
	resultTimerTxt.font = "45px aldo_the_apacheregular";
	resultTimerTxt.lineHeight = 35;
	resultTimerTxt.textAlign = "center";
	resultTimerTxt.textBaseline='alphabetic';
	resultTimerTxt.text = '';
	
	buttonFacebook = createButton('buttonFacebook', '', false, 'buttonFacebook');
	buttonTwitter = createButton('buttonTwitter', '', false, 'buttonTwitter');
	buttonWhatsapp = createButton('buttonWhatsapp', '', false, 'buttonWhatsapp');
	
	buttonFullscreen = createButton('buttonFullscreen', '', false, 'buttonFullscreen');
	buttonSoundOn = createButton('buttonSoundOn', '', false, 'buttonSoundOn');
	buttonSoundOff = createButton('buttonSoundOff', '', false, 'buttonSoundOff');
	buttonSoundOn.visible = false;
	
	buttonExit = createButton('buttonExit', '', false, 'buttonExit');
	buttonSettings = createButton('buttonSettings', '', false, 'buttonSettings');

	optionsContainer = new createjs.Container();
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit);
	optionsContainer.visible = false;
	
	//exit
	buttonConfirm = createButton('buttonConfirm', textDisplay.buttonConfirm, true);
	buttonCancel = createButton('buttonCancel', textDisplay.buttonCancel, true);
	
	popTitleTxt = new createjs.Text();
	popTitleTxt.font = "60px aldo_the_apacheregular";
	popTitleTxt.textAlign = "center";
	popTitleTxt.textBaseline='alphabetic';
	popTitleTxt.text = textDisplay.exitTitle;
	
	popDescTxt = new createjs.Text();
	popDescTxt.font = "45px aldo_the_apacheregular";
	popDescTxt.lineHeight = 50;
	popDescTxt.textAlign = "center";
	popDescTxt.textBaseline='alphabetic';
	popDescTxt.text = textDisplay.exitMessage;
	
	confirmContainer.addChild(popTitleTxt, popDescTxt, buttonConfirm, buttonCancel);
	confirmContainer.visible = false;

	//pop background
	popHitArea = new createjs.Shape();
	popBgContainer.addChild(popBgInnerContainer);
	backgroundPop = new createjs.Bitmap(loader.getResult('backgroundPop'));
	backgroundPopP = new createjs.Bitmap(loader.getResult('backgroundPopP'));
	popContainer.addChild(backgroundPop, backgroundPopP, popHitArea, popBgContainer);
	
	if(guide){
		guideline = new createjs.Shape();	
		guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW-contentW)/2, (stageH-contentH)/2, contentW, contentH);
	}

	holdContainer.addChild(holdBgContainer, holdBlocksContainer, holdTxt);
	previewContainer.addChild(previewBgContainer, previewBlocksContainer, nextTxt);
	statusContainer.addChild(statusBgContainer, statusTextContainer);
	scoreContainer.addChild(scoreBgContainer, scoreTxt);
	timerContainer.addChild(timerBgContainer, timerTxt);
	instructionContainer.addChild(instructionLeftTxt, instructionRightTxt);
	
	buttonTypeContainer.addChild(buttonClassic, buttonCustom);
	buttonModeContainer.addChild(buttonMode, buttonModeL, buttonModeR, modeDescTxt);

	mainContainer.addChild(logo, logoP, buttonTypeContainer, buttonModeContainer);
	boardContainer.addChild(boardBgContainer, blocksContainer);
	boardScaleContainer.addChild(boardContainer, previewContainer, holdContainer, statusContainer, statusBg, pauseTxt, gameStatusTxt);
	gameContainer.addChild(boardScaleContainer, scoreContainer, timerContainer, instructionContainer, touchContainer);
	resultContainer.addChild(buttonContinue, resultTitleTxt, resultDescTxt, resultTimerTxt);
	
	if(shareEnable){
		resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp);
	}
	
	canvasContainer.addChild(bg, bgP, mainContainer, gameContainer, popContainer, customContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
	stage.addChild(canvasContainer);
	
	changeViewport(viewport.isLandscape);
	resizeGameFunc();
}

function createButton(name, text, size, image){
	$.button[name] = new createjs.Container();

	var buttonBg = new createjs.Container();
	var buttonText = new createjs.Text();
	buttonText.font = "45px aldo_the_apacheregular";
	buttonText.lineHeight = 35;
	buttonText.color = '#fff';
	buttonText.textAlign = "center";
	buttonText.textBaseline='alphabetic';
	buttonText.text = text;
	buttonText.y = 14;

	var buttonImage
	if(image != undefined){
		buttonImage = new createjs.Bitmap(loader.getResult(image));
		centerReg(buttonImage);
	}

	$.button[name].bgObj = buttonBg;
	$.button[name].textObj = buttonText;
	$.button[name].size = size;
	$.button[name].addChild(buttonBg, buttonText, buttonImage);
	gameData.buttons.push($.button[name]);

	return $.button[name];
}

function changeViewport(isLandscape){
	if(isLandscape){
		//landscape
		stageW=landscapeSize.w;
		stageH=landscapeSize.h;
		contentW = landscapeSize.cW;
		contentH = landscapeSize.cH;
	}else{
		//portrait
		stageW=portraitSize.w;
		stageH=portraitSize.h;
		contentW = portraitSize.cW;
		contentH = portraitSize.cH;
	}
	
	gameCanvas.width = stageW;
	gameCanvas.height = stageH;
	
	canvasW=stageW;
	canvasH=stageH;
	
	changeCanvasViewport();
}

function changeCanvasViewport(){
	if(canvasContainer!=undefined){
		popHitArea.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, canvasW, canvasH));
		popBgContainer.x = canvasW/2;
		popBgContainer.y = canvasH/2;
		boardScaleContainer.x = canvasW/2;
		boardScaleContainer.y = canvasH/2;
	
		if(viewport.isLandscape){
			backgroundPop.visible = true;
			backgroundPopP.visible = false;
			
			bg.visible = true;
			bgP.visible = false;

			logo.visible = true;
			logoP.visible = false;
			
			if(customSettings.enable){
				buttonClassic.x = (canvasW/2) - 150;
				buttonClassic.y = canvasH/100 * 75;

				buttonCustom.x = (canvasW/2) + 150;
				buttonCustom.y = canvasH/100 * 75;
				buttonCustom.visible = true;
			}else{
				buttonClassic.x = canvasW/2;
				buttonClassic.y = canvasH/100 * 75;
				buttonCustom.visible = false;
			}

			buttonMode.x = canvasW/2;
			buttonMode.y = canvasH/100 * 75;

			buttonModeL.x = canvasW/2 - 190;
			buttonModeL.y = canvasH/100 * 75;

			buttonModeR.x = canvasW/2 + 190;
			buttonModeR.y = canvasH/100 * 75;

			modeDescTxt.x = canvasW/2;
			modeDescTxt.y = canvasH/100 * 86;

			//custom
			customTitleTxt.x = canvasW/2;
			customTitleTxt.y = canvasH/100 * 30;

			buttonCustomStart.x = canvasW/2;
			buttonCustomStart.y = canvasH/100 * 70;

			buttonRowL.x = (canvasW/2 + 200) - 35;
			buttonRowR.x = (canvasW/2 + 200) + 35;
			buttonColumnL.x = (canvasW/2 - 200) - 35;
			buttonColumnR.x = (canvasW/2 - 200) + 35;

			sizeTxt.x = canvasW/2;
			buttonRowL.y = buttonRowR.y = buttonColumnL.y = buttonColumnR.y = canvasH/100 * 57;
			sizeTxt.y = buttonRowL.y + 20;

			buttonThemeL.x = (canvasW/2) - 200;
			buttonThemeR.x = (canvasW/2) + 200;

			//game
			
			//result
			buttonFacebook.x = canvasW/100*43;
			buttonFacebook.y = canvasH/100*57;
			buttonTwitter.x = canvasW/2;
			buttonTwitter.y = canvasH/100*57;
			buttonWhatsapp.x = canvasW/100*57;
			buttonWhatsapp.y = canvasH/100*57;
			
			buttonContinue.x = canvasW/2;
			buttonContinue.y = canvasH/100 * 70;
	
			resultShareTxt.x = canvasW/2;
			resultShareTxt.y = canvasH/100 * 51;
	
			resultTitleTxt.x = canvasW/2;
			resultTitleTxt.y = canvasH/100 * 30;
	
			resultDescTxt.x = canvasW/2;
			resultDescTxt.y = canvasH/100 * 39;

			resultTimerTxt.x = canvasW/2;
			resultTimerTxt.y = canvasH/100 * 45;
			
			//exit
			buttonConfirm.x = (canvasW/2) - 140;
			buttonConfirm.y = (canvasH/100 * 70);
			
			buttonCancel.x = (canvasW/2) + 140;
			buttonCancel.y = (canvasH/100 * 70);

			popTitleTxt.x = canvasW/2;
			popTitleTxt.y = canvasH/100 * 30;
			
			popDescTxt.x = canvasW/2;
			popDescTxt.y = canvasH/100 * 45;
		}else{
			backgroundPop.visible = false;
			backgroundPopP.visible = true;

			bg.visible = false;
			bgP.visible = true;

			logo.visible = false;
			logoP.visible = true;
			
			if(customSettings.enable){
				buttonClassic.x = (canvasW/2)
				buttonClassic.y = canvasH/100 * 73;

				buttonCustom.x = (canvasW/2)
				buttonCustom.y = canvasH/100 * 85;
				buttonCustom.visible = true;
			}else{
				buttonClassic.x = canvasW/2;
				buttonClassic.y = canvasH/100 * 75;
				buttonCustom.visible = false;
			}

			buttonMode.x = canvasW/2;
			buttonMode.y = canvasH/100 * 75;

			buttonModeL.x = canvasW/2 - 190;
			buttonModeL.y = canvasH/100 * 75;

			buttonModeR.x = canvasW/2 + 190;
			buttonModeR.y = canvasH/100 * 75;

			modeDescTxt.x = canvasW/2;
			modeDescTxt.y = canvasH/100 * 86;

			//custom
			customTitleTxt.x = canvasW/2;
			customTitleTxt.y = canvasH/100 * 35;

			buttonCustomStart.x = canvasW/2;
			buttonCustomStart.y = canvasH/100 * 65;
			
			buttonRowL.x = (canvasW/2 + 200) - 35;
			buttonRowR.x = (canvasW/2 + 200) + 35;
			buttonColumnL.x = (canvasW/2 - 200) - 35;
			buttonColumnR.x = (canvasW/2 - 200) + 35;

			sizeTxt.x = canvasW/2;
			buttonRowL.y = buttonRowR.y = buttonColumnL.y = buttonColumnR.y = canvasH/100 * 55;
			sizeTxt.y = buttonRowL.y + 20;

			buttonThemeL.x = (canvasW/2) - 200;
			buttonThemeR.x = (canvasW/2) + 200;

			//game
			
			//result
			buttonFacebook.x = canvasW/100*39;
			buttonFacebook.y = canvasH/100*54;
			buttonTwitter.x = canvasW/2;
			buttonTwitter.y = canvasH/100*54;
			buttonWhatsapp.x = canvasW/100*61;
			buttonWhatsapp.y = canvasH/100*54;
			
			buttonContinue.x = canvasW/2;
			buttonContinue.y = canvasH/100 * 65;
	
			resultShareTxt.x = canvasW/2;
			resultShareTxt.y = canvasH/100 * 49;
	
			resultTitleTxt.x = canvasW/2;
			resultTitleTxt.y = canvasH/100 * 35;
	
			resultDescTxt.x = canvasW/2;
			resultDescTxt.y = canvasH/100 * 42;

			resultTimerTxt.x = canvasW/2;
			resultTimerTxt.y = canvasH/100 * 46;
			
			//exit
			buttonConfirm.x = (canvasW/2);
			buttonConfirm.y = (canvasH/100 * 54);
			
			buttonCancel.x = (canvasW/2);
			buttonCancel.y = (canvasH/100 * 65);

			popTitleTxt.x = canvasW/2;
			popTitleTxt.y = canvasH/100 * 35;
			
			popDescTxt.x = canvasW/2;
			popDescTxt.y = canvasH/100 * 42;
		}
	}
}



/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		
		buttonSettings.x = (canvasW - offset.x) - 50;
		buttonSettings.y = offset.y + 45;
		
		var distanceNum = boardData.tileSize + boardData.tileBorder + boardData.bgBorder + 20;

		if(curPage != 'game'){
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);

			if(viewport.isLandscape){
				if(curPage == 'custom'){
					buttonThemeL.y = buttonThemeR.y = canvasH/100 * 42;
				}else{
					buttonThemeL.y = buttonThemeR.y = canvasH/100 * 50;
				}
			}else{
				if(curPage == 'custom'){
					buttonThemeL.y = buttonThemeR.y = canvasH/100 * 42;
				}else{
					buttonThemeL.y = buttonThemeR.y = canvasH/100 * 50;
				}
			}
		}else{
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);
			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*3);
			
			var touchRangeX = 70;
			var touchRangeY = 40;

			var rightControlX = (canvasW - offset.x) - 120;
			var rightControlY = (canvasH - offset.y) - 110;

			touchRight.x = rightControlX + touchRangeX;
			touchRight.y = rightControlY;

			touchLeft.x = rightControlX - touchRangeX;
			touchLeft.y = rightControlY;

			touchUp.x = rightControlX;
			touchUp.y = rightControlY - touchRangeY;

			touchDown.x = rightControlX;
			touchDown.y = rightControlY + touchRangeY;

			var leftControlX = (offset.x) + 120;
			var leftControlY = (canvasH - offset.y) - 110;

			touchHold.x = leftControlX - touchRangeX;
			touchHold.y = leftControlY;

			touchDrop.x = leftControlX;
			touchDrop.y = leftControlY + touchRangeY;
		}

		resizeGameLauyout();
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}