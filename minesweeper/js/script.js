				$(document).ready(function(){
					var bombsAreSet = false;
					
					createField();
					
					$('div').on("mousedown", function mousedownFunc() {
						
						if(!bombsAreSet){
							var firstBomb = {};
							firstBomb.positionX = Number($(this).attr('data-x'));
							firstBomb.positionY = Number($(this).attr('data-y'));
							
							setTheBombs(firstBomb);
							bombsAreSet = true;
						}
						
						var div = $(this);
						var isFlagChanged = false;
						
						setTheFlag = setTimeout(function () {
							
							isFlagChanged = true;
							
							if(div.hasClass('flag')){
								div.removeClass('flag');
							} else if(div.hasClass('field')){
								div.addClass('flag');
							}
						},
						500);
						
						$('div').on("mouseup", function mouseupFunc() {
						
							clearTimeout(setTheFlag);
							
							var dataX = Number(div.attr('data-x'));
							var dataY = Number(div.attr('data-y'));
							
							if(!div.hasClass('flag') && !isFlagChanged){
								div.removeClass('field');
								if(div.hasClass('bomb')) {
									div.addClass('redbomb').removeClass('bomb');
									alert('GAME OVER. FOR PLAY AGAIN RELOAD THE WINDOW');
									$('div').removeClass('field');
									$('div').off("mousedown", mousedownFunc);
									$('div').off("mouseup", mouseupFunc);
								}
								if(div.html()== '') {
									checkEmptyBlocksAround(dataX, dataY);
								}
							} 
							
							var field = $('.field').length;
							var bombs = $('.bomb').length;
							
							if(field === bombs){
								alert('You win!');
								$('div').off("mousedown", mousedownFunc);
								$('div').off("mouseup", mouseupFunc);
							}
						});
						
					});
					
					function createField() {
						var section = '<section>';
						var dataX = 0;
						
						for(var k=0; k<10; k++){
							for(var j=0; j<10; j++){
								section += '<div class = "field" data-x =' + dataX + ' data-y =' + j +'></div>';
							}
							dataX++;
						}
						
						section += '</section>';

						$('body').append(section);
					}
					
					function getRandomNumber(size) {
						return Math.floor(Math.random() * size);
					};
					
					function isThisBombInArr(arrBombs, bombPosition) {
						for(var i=0;i<arrBombs.length;i++) {
							if(arrBombs[i].positionX==bombPosition.positionX && arrBombs[i].positionY==bombPosition.positionY) {
								return true;
							}
						}
						return false;
					}
					
					function  checkEmptyBlocksAround(x, y){
							
						var nearBlock = $('div[data-x="'+x+'"][data-y="'+(y-1)+'"]');	
						if(nearBlock.not('.bomb') && nearBlock.hasClass('field')){
							nearBlock.removeClass('field');
							if(nearBlock.html()== '') {
								checkEmptyBlocksAround(x, (y-1));
							}
						}
						var nearBlock =	$('div[data-x="'+(x+1)+'"][data-y="'+y+'"]');	
						if(nearBlock.not('.bomb') && nearBlock.hasClass('field')){
							nearBlock.removeClass('field');
							if(nearBlock.html()== ''){
								checkEmptyBlocksAround((x+1), y);
							}
						}
						var nearBlock = $('div[data-x="'+x+'"][data-y="'+(y+1)+'"]');
						if(nearBlock.not('.bomb') && nearBlock.hasClass('field')){
							nearBlock.removeClass('field');
							if(nearBlock.html()== ''){
								checkEmptyBlocksAround(x, (y+1));
							}
						}
						var nearBlock = $('div[data-x="'+(x+1)+'"][data-y="'+(y-1)+'"]');
						if(nearBlock.not('.bomb') && nearBlock.hasClass('field')){
							nearBlock.removeClass('field');
							if(nearBlock.html()== ''){
								checkEmptyBlocksAround((x+1), (y-1));
							}
						}
						var nearBlock = $('div[data-x="'+(x+1)+'"][data-y="'+(y+1)+'"]');
						if(nearBlock.not('.bomb') && nearBlock.hasClass('field')){
							nearBlock.removeClass('field');
							if(nearBlock.html()== ''){
								checkEmptyBlocksAround((x+1), (y+1));
							}
						}
						var nearBlock = $('div[data-x="'+(x-1)+'"][data-y="'+(y+1)+'"]');
						if(nearBlock.not('.bomb') && nearBlock.hasClass('field')){
							nearBlock.removeClass('field');
							if(nearBlock.html()== ''){
								checkEmptyBlocksAround((x-1), (y+1));
							}
						}
						var nearBlock = $('div[data-x="'+(x-1)+'"][data-y="'+y+'"]');
						if(nearBlock.not('.bomb') && nearBlock.hasClass('field')){
							nearBlock.removeClass('field');
							if(nearBlock.html()== ''){
								checkEmptyBlocksAround((x-1), y);
							}
						}
						var nearBlock = $('div[data-x="'+(x-1)+'"][data-y="'+(y-1)+'"]');
						if(nearBlock.not('.bomb') && nearBlock.hasClass('field')){
							nearBlock.removeClass('field');
							if(nearBlock.html()== ''){
								checkEmptyBlocksAround((x-1), (y-1));
							}
						}
					}
					
					function setTheBombs(object){
						var arrBombs = [];
						arrBombs[0] = object;
						
						for(var j=1; j< 20; j++) {
							while(true) {
								var randomX = Number(getRandomNumber(10));
								var randomY = Number(getRandomNumber(10));
								var bombPosition = {
									positionX: randomX,
									positionY: randomY,
								};
									
								if(isThisBombInArr(arrBombs, bombPosition) === false) {
									arrBombs.push(bombPosition);
									break;
								}
							}

							$('div').each(function(){
								if(Number($(this).attr('data-x')) == randomX && Number($(this).attr('data-y')) == randomY) {
									$(this).addClass('bomb');
								}
							});
						}
							
						$('div').each(function() {
							var count = 0;
							var x = Number($(this).attr('data-x'));
							var y = Number($(this).attr('data-y'));
								
							if($('div[data-x="'+x+'"][data-y="'+(y-1)+'"]').hasClass('bomb')){
								count++;
							}
							if($('div[data-x="'+(x+1)+'"][data-y="'+y+'"]').hasClass('bomb')){
								count++;
							}
							if($('div[data-x="'+x+'"][data-y="'+(y+1)+'"]').hasClass('bomb')){
								count++;
							}
							if($('div[data-x="'+(x+1)+'"][data-y="'+(y-1)+'"]').hasClass('bomb')){
								count++;
							}
							if($('div[data-x="'+(x+1)+'"][data-y="'+(y+1)+'"]').hasClass('bomb')){
								count++;
							}
							if($('div[data-x="'+(x-1)+'"][data-y="'+(y+1)+'"]').hasClass('bomb')){
								count++;
							}
							if($('div[data-x="'+(x-1)+'"][data-y="'+y+'"]').hasClass('bomb')){
								count++;
							}
							if($('div[data-x="'+(x-1)+'"][data-y="'+(y-1)+'"]').hasClass('bomb')){
								count++;
							}
							
							$(this).html(count);
							if(count == 0){
								$(this).html('');
							}
							if($(this).hasClass('bomb')){
								count='';
								$(this).html('bomb');
							}
						});
					}
				});