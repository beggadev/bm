////////////////////////////////////////////////////////////
// SETTINGS
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING START
 * 
 */

//tetris blocks array
var blocks_arr = [
	{
		chances:1,
		rotate:1,
		shape:[
			[0, -1, -1, 0, 0, 0, 1, 0] // T
		]
	},
	{
		chances:1,
		rotate:1,
		shape:[
			[0, -1, 0, 0, 0, 1, 1, 1] // L
		]
	},
	{
		chances:1,
		rotate:1,
		shape:[
			[0, -1, 0, 0, -1, 0, 1, -1] // z opp
		]
	},
	{
		chances:1,
		rotate:1,
		shape:[
			[-1, -1, -1, 0, 0, 0, 1, 0] // L opp
		]
	},
	{
		chances:1,
		rotate:1,
		shape:[
			[-1, 0, 0, 0, 1, 0, 2, 0] // I
		]
	},
	{
		chances:1,
		rotate:1,
		shape:[
			[0, -1, 0, 0, -1, 0, -1, 1] // z
		]
	},
	{
		chances:.5,
		rotate:0,
		shape:[
			[0, 0, 1, 0, 1, 1, 0, 1] // O
		]
	}
];

//themes
var themes_arr = [
	{
		bgBorder:15,
		bgBorderRadius:10,
		bgBorderInner:10,
		bgBorderInnerRadius:10,
		tileBorder:5,
		tileBorderRadius:5,
		tileSize:30,
		board:{
			color:'#fff',
			border:'#0f194a',
			borderInner:'#7789fb',
			background:'#7789fb',
			tile:['#282e3c','#141e2f','#141e2f','#141e2f']
		},
		blocks:[
			['#000','#a000f0','#dd99ff','#500078'],
			['#000','#f0a000','#facb6b','#9c6800'],
			['#000','#00f000','#6bfa6b','#007800'],
			['#000','#0000f0','#9999ff','#000078'],
			['#000','#00f0f0','#99ffff','#007878'],
			['#000','#f00000','#ff9999','#780000'],
			['#000','#f0f000','#ffff99','#787800']
		],
		showShadow:true,
		shadowAlpha:1,
		shadow:['#1c97a3','#141e2f','#141e2f','#141e2f'],
		complete:['#000','#fff','#fff','#fff'],
		completeAnimation:'flash',
		button:{
			color:'#fff',
			border:'#0f194a',
			borderInner:'#7789fb',
			background:'#7789fb',
			tile:['#282e3c','#141e2f','#141e2f','#141e2f']			
		},
		music:'assets/sounds/hellfire_midi.mp3'
	},
	{
		bgBorder:15,
		bgBorderRadius:10,
		bgBorderInner:10,
		bgBorderInnerRadius:10,
		tileBorder:3,
		tileBorderRadius:5,
		tileSize:32,
		board:{
			color:'#fff',
			border:'#0f194a',
			borderInner:'#fff',
			background:'#0a0c0f',
			tile:['#1d2026','#0a0c0f','#0a0c0f','#0a0c0f']
		},
		blocks:[
			['#fff','#a000f0','#dd99ff','#dd99ff'],
			['#fff','#f0a000','#facb6b','#facb6b'],
			['#fff','#00f000','#6bfa6b','#6bfa6b'],
			['#fff','#0000f0','#9999ff','#9999ff'],
			['#fff','#00f0f0','#99ffff','#99ffff'],
			['#fff','#f00000','#ff9999','#ff9999'],
			['#fff','#f0f000','#ffff99','#ffff99']
		],
		showShadow:true,
		shadowAlpha:1,
		shadow:['#1c97a3','#141e2f','#141e2f','#141e2f'],
		complete:['#fff','#fff','#fff','#fff'],
		completeAnimation:'flash',
		button:{
			color:'#fff',
			border:'#0f194a',
			borderInner:'#fff',
			background:'#7789fb',
			tile:['#1d2026','#0a0c0f','#0a0c0f','#0a0c0f']			
		},
		music:'assets/sounds/music_game.ogg'
	},
	{
		bgBorder:12,
		bgBorderRadius:0,
		bgBorderInner:8,
		bgBorderInnerRadius:0,
		tileBorder:0,
		tileBorderRadius:0,
		tileSize:35,
		board:{
			color:'#fff',
			border:'#420c64',
			borderInner:'#a63eae',
			background:'#420c64',
			tile:['','','',''],
			tileImage:'assets/tile_purple.png',
		},
		blocks:[
			['#6231b9','#6231b9','#6231b9','#6231b9'],
			['#f98a1e','#f98a1e','#f98a1e','#f98a1e'],
			['#009486','#009486','#009486','#009486'],
			['#2d63ab','#2d63ab','#2d63ab','#2d63ab'],
			['#00869f','#00869f','#00869f','#00869f'],
			['#d22654','#d22654','#d22654','#d22654'],
			['#f2cb01','#f2cb01','#f2cb01','#f2cb01']
		],
		showShadow:true,
		shadowAlpha:.3,
		shadow:['#ccc','','',''],
		complete:['#fff','#fff','#fff','#fff'],
		completeAnimation:'slide',
		button:{
			color:'#fff',
			border:'#420c64',
			borderInner:'#a63eae',
			background:'#420c64',
			tile:['','','',''],
			tileImage:'assets/tile_purple.png'
		},
		music:'assets/sounds/music_game_fun.ogg'
	},
	{
		bgBorder:12,
		bgBorderRadius:0,
		bgBorderInner:8,
		bgBorderInnerRadius:0,
		tileBorder:0,
		tileBorderRadius:0,
		tileSize:35,
		board:{
			color:'#000',
			border:'#ed0a0a',
			borderInner:'#a30f0f',
			background:'#ccc',
			tile:['#ccc','#ccc','#ccc','#ccc'],
			tileImage:'assets/tile_lego.png'
		},
		blocks:[
			['#b136ff','#b136ff','#b136ff','#b136ff'],
			['#ff8500','#ff8500','#ff8500','#ff8500'],
			['#6bbd00','#6bbd00','#6bbd00','#6bbd00'],
			['#0d6aff','#0d6aff','#0d6aff','#0d6aff'],
			['#51bcff','#51bcff','#51bcff','#51bcff'],
			['#ff2121','#ff2121','#ff2121','#ff2121'],
			['#ffd000','#ffd000','#ffd000','#ffd000']
		],
		blocksImages:[
			'assets/tile_lego.png',
			'assets/tile_lego.png',
			'assets/tile_lego.png',
			'assets/tile_lego.png',
			'assets/tile_lego.png',
			'assets/tile_lego.png',
			'assets/tile_lego.png'
		],
		showShadow:true,
		shadowAlpha:1,
		shadow:['#919191','#919191','#919191','#919191'],
		shadowImage:'assets/tile_lego.png',
		complete:['#ff2121','#ff2121','#ff2121','#ff2121'],
		completeImage:'assets/tile_lego.png',
		completeAnimation:'flash',
		button:{
			color:'#fff',
			border:'#ed0a0a',
			borderInner:'#a30f0f',
			background:'#ccc',
			tile:['#ff2121','#ff2121','#ff2121','#ff2121'],
			tileImage:'assets/tile_lego.png'		
		},
		music:'assets/sounds/music_game.ogg'
	},
	{
		bgBorder:18,
		bgBorderRadius:10,
		bgBorderInner:10,
		bgBorderInnerRadius:10,
		tileBorder:5,
		tileBorderRadius:5,
		tileSize:30,
		board:{
			color:'#000',
			border:'#000',
			borderInner:'#efcc1a',
			background:'#99a785',
			tile:['#869472','#869472','#99a785','#99a785']
		},
		blocks:[
			['#000100','#000100','#99a785','#99a785'],
			['#000100','#000100','#99a785','#99a785'],
			['#000100','#000100','#99a785','#99a785'],
			['#000100','#000100','#99a785','#99a785'],
			['#000100','#000100','#99a785','#99a785'],
			['#000100','#000100','#99a785','#99a785'],
			['#000100','#000100','#99a785','#99a785'],
		],
		showShadow:true,
		shadowAlpha:1,
		shadow:['#697a51','#697a51','#869472','#869472'],
		complete:['#000100','#99a785','#99a785','#000100'],
		completeAnimation:'flash',
		button:{
			color:'#fff',
			border:'#000',
			borderInner:'#efcc1a',
			background:'#99a785',
			tile:['#869472','#869472','#99a785','#99a785']			
		},
		music:'assets/sounds/music_game_bit.ogg'
	},
	{
		bgBorder:15,
		bgBorderRadius:0,
		bgBorderInner:10,
		bgBorderInnerRadius:0,
		tileBorder:0,
		tileBorderRadius:0,
		tileSize:35,
		board:{
			color:'#000',
			border:'#727272',
			borderInner:'#050808',
			background:'#f9fafb',
			tile:['#f9fafb','#f9fafb','#f9fafb','#f9fafb']
		},
		blocks:[
			['#000100','#000100','#99a785','#99a785'],
			['#000100','#000100','#99a785','#99a785'],
			['#000100','#000100','#99a785','#99a785'],
			['#000100','#000100','#99a785','#99a785'],
			['#000100','#000100','#99a785','#99a785'],
			['#000100','#000100','#99a785','#99a785'],
			['#000100','#000100','#99a785','#99a785'],
		],
		blocksImages:[
			'assets/tile_block_2.png',
			'assets/tile_block_5.png',
			'assets/tile_block_3.png',
			'assets/tile_block_3.png',
			'assets/tile_block_6.png',
			'assets/tile_block_4.png',
			'assets/tile_block_1.png'
		],
		showShadow:false,
		shadowAlpha:1,
		shadow:['#a4a4a4','#a4a4a4','#a4a4a4','#a4a4a4'],
		complete:['#000100','#99a785','#99a785','#000100'],
		completeAnimation:'slide',
		button:{
			color:'#fff',
			border:'#727272',
			borderInner:'#050808',
			background:'#727272',
			tile:['#727272','#727272','#727272','#727272']			
		},
		music:'assets/sounds/music_game_bit.ogg'
	},
	{
		bgBorder:12,
		bgBorderRadius:0,
		bgBorderInner:8,
		bgBorderInnerRadius:0,
		tileBorder:0,
		tileBorderRadius:0,
		tileSize:35,
		board:{
			color:'#fff',
			border:'#ffa14e',
			borderInner:'#ff7f0d',
			background:'#000',
			tile:['','','',''],
			tileImage:'assets/tile_color_10.png'
		},
		blocks:[
			['','','',''],
			['','','',''],
			['','','',''],
			['','','',''],
			['','','',''],
			['','','',''],
			['','','',''],
		],
		blocksImages:[
			'assets/tile_color_1.png',
			'assets/tile_color_3.png',
			'assets/tile_color_4.png',
			'assets/tile_color_5.png',
			'assets/tile_color_6.png',
			'assets/tile_color_7.png',
			'assets/tile_color_2.png'
		],
		showShadow:true,
		shadowAlpha:1,
		shadow:['','','',''],
		shadowImage:'assets/tile_color_9.png',
		complete:['#ff2121','#ff2121','#ff2121','#ff2121'],
		completeImage:'assets/tile_color_11.png',
		completeAnimation:'flash',
		button:{
			color:'#fff',
			border:'#ffa14e',
			borderInner:'#ff7f0d',
			background:'#000',
			tile:['#000','#1f1f1f','#1f1f1f','#1f1f1f'],
			tileImage:'assets/tile_color_8.png'		
		},
		music:'assets/sounds/music_game_3.ogg'
	}
];

//classic settings
var defaultSettings = {
	column:10,
	row:20
};

//custom settings
var customSettings = {
	enable:true,
	columnMin:10,
	columnMax:20,
	rowMin:20,
	rowMax:30,
};

//board settings
var boardSettings = {
	countdown:3, //countdown
	flashTime:6, //flash times
	flashSpeed:.05, //flash speed
	slideSpeed:.1, //slide speed
	hold:true, //enable hold
	preview:true, //show preview
	previewTotal:4, //total preview
	previewTotalPortrait:3, //total preview for portrait mode
	keyboard:{ //keyboard keycode
		rotate:38,
		left:37,
		right:39,
		down:40,
		space:32,
		hold:67
	}
};

//mode settings
var modes_arr = [
	{
		name:'MARATHON',
		description:'Iconic falling blocks you will love',
		mode:'default',
		timer:0,
		blocks:[0,1,2,3,4,5,6],
		levels:[
			{
				speed:1, //speed
				score:20, //score * lines
				speedScore:100, //hard drop score
				goal:5, //goal lines to reach next level
			},
			{
				speed:.8,
				score:30,
				speedScore:120,
				goal:10,
			},
			{
				speed:.6,
				score:50,
				speedScore:160,
				goal:20,
			},
			{
				speed:.4,
				score:70,
				speedScore:200,
				goal:40,
			},
			{
				speed:.2,
				score:100,
				speedScore:300,
				goal:80,
			},
			{
				speed:.05,
				score:150,
				speedScore:500,
				goal:120,
			}
		]
	},
	{
		name:'QUICK PLAY',
		description:'A three minute race for points',
		mode:'timer',
		timer:180000,
		blocks:[0,1,2,3,4,5,6],
		levels:[
			{
				speed:1,
				score:20,
				speedScore:100,
				goal:5,
			},
			{
				speed:.6,
				score:30,
				speedScore:120,
				goal:10,
			},
			{
				speed:.2,
				score:50,
				speedScore:160,
				goal:20,
			}
		]
	},
	{
		name:'L BLOCKS',
		description:'Play only with L Blocks',
		mode:'default',
		timer:0,
		blocks:[1,3],
		levels:[
			{
				speed:1, //speed
				score:20, //score * lines
				speedScore:100, //hard drop score
				goal:5, //goal lines to reach next level
			},
			{
				speed:.8,
				score:30,
				speedScore:120,
				goal:10,
			},
			{
				speed:.6,
				score:50,
				speedScore:160,
				goal:20,
			},
			{
				speed:.4,
				score:70,
				speedScore:200,
				goal:40,
			},
			{
				speed:.2,
				score:100,
				speedScore:300,
				goal:80,
			},
			{
				speed:.05,
				score:150,
				speedScore:500,
				goal:120,
			}
		]
	},
	{
		name:'HARDCORE',
		description:'Almost impossible to play',
		mode:'default',
		timer:0,
		blocks:[0,1,2,3,4,5,6],
		levels:[
			{
				speed:.1,
				score:20,
				speedScore:100,
				goal:50,
			},
			{
				speed:.05,
				score:30,
				speedScore:120,
				goal:100,
			}
		]
	},
	{
		name:'RELAX',
		description:'Chill Marathon to cleari 150 lines',
		mode:'goal',
		timer:0,
		blocks:[0,1,2,3,4,5,6],
		levels:[
			{
				speed:.6,
				score:50,
				speedScore:160,
				goal:150,
			},
		]
	},
]

//game text display
var textDisplay = {
	buttonClassic:'CLASSIC',
	buttonCustom:'CUSTOM',
	buttonStart:'START',
	buttonContinue:'MAIN',
	buttonConfirm:'YES',
	buttonCancel:'NO',
	themeTitle:'TETRIS THEME',
	customTitle:'CUSTOM TETRIS',
	customSize:'[COLUMN] x [ROW] SIZE',
	instructionLeft:'KEYBOARD :\nC TO HOLD\nSPACE TO HARD DROP',
	instructionRight:'KEYBOARD :\nUP TO ROTATE\nLEFT/RIGHT TO MOVE\nDOWN TO DROP',
	timer:'TIME : [NUMBER]',
	goal:'GOAL : [NUMBER]',
	score:'SCORE : [NUMBER]',
	lines:'LINES : [NUMBER]',
	level:'LEVEL : [NUMBER]',
	next:'NEXT',
	hold:'HOLD',
	pause:'PAUSE',
	complete:'COMPLETE',
	timesup:'TIME\'S UP',
	gameover:'GAME OVER',
	exitTitle:'Exit Game',
	exitMessage:'Are you sure you want\nto quit game?',
	share:'Share your score:',
	resultTitle:'Game Over',
	resultDesc:'SCORE : [NUMBER]',
	resultTime:'TIME : [NUMBER]',
}

//Social share, [SCORE] will replace with game score
var shareEnable = true; //toggle share
var shareTitle = 'Highscore on Super Tetris is [SCORE]pts';//social share score title
var shareMessage = '[SCORE]pts is mine new highscore on Super Tetris game! Try it now!'; //social share score message

/*!
 *
 * GAME SETTING END
 *
 */