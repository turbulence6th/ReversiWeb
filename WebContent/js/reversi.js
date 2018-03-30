class Reversi {
	
	constructor() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		
		this.width = width < height ? width : height;
		this.height = this.width;
		this.pieceRadius = this.width / 18;
		
		this.lock = false;
		
		this.board = [];
		for(var i = 0; i < 8; i++) {
			var row = [];
			for(var j = 0; j < 8; j++) {
				row.push(0);
			}
			
			this.board.push(row);
		}
		
		this.pieces = [];
		for(var i = 0; i < 8; i++) {
			var row = [];
			for(var j = 0; j < 8; j++) {
				row.push(null);
			}
			
			this.pieces.push(row);
		}
		
		this.colors = {
				'-1': 'black',
				'1': 'white'
		};
		
		this.hints = [];
		
		this.init();
	}
	
	init() {
		this.canvas = reversi;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.addEventListener('click', event => this.click(event));
		this.context = this.canvas.getContext('2d');
		this.draw();
	}
	
	draw() {
		this.context.fillStyle = 'green';
		this.context.fillRect(0, 0, this.width, this.height);
		this.drawLines();
		
		this.addPiece(3, 3, 1);
		this.addPiece(4, 4, 1);
		this.addPiece(3, 4, -1);
		this.addPiece(4, 3, -1);
		
		this.fillHints();
	}
	
	drawLines() {
		for(var i = 0; i < 9; i++) {
			this.context.fillStyle = 'black';
			this.context.fillRect((i * this.width / 8) - 1.5, 0, 3, this.height);
			this.context.fillRect(0, (i * this.height / 8) - 1.5, this.width, 3);
		}
	}
	
	addPiece(width, height, player) {
		this.board[width][height] = player;
		this.pieces[width][height] = new Piece(this.context, this.getPieceWidth(width), this.getPieceHeight(height), this.pieceRadius, this.colors[player]);
	}
	
	fillHints() {
		this.hints = [];
		for(var i = 0; i < 8; i++) {
			for(var j = 0; j < 8; j++) {
				var flips = this.getFlips(i, j, -1);
				if(flips.length != 0) {
					this.addHint(i, j, -1, flips.length);
				}
			}
		}
	}
	
	addHint(width, height, player, number) {
		this.hints.push(new Hint(this.context, number, this.getPieceWidth(width), this.getPieceHeight(height), this.pieceRadius, this.colors[player]));
	}
	
	getPieceWidth(width) {
		return (width * this.width / 8) + this.width / 16;
	}
	
	getPieceHeight(height) {
		return (height * this.height / 8) + this.height / 16;
	}
	
	getFlips(x, y, player) {
		if(this.board[x][y] != 0) {
			return [];
		}
		
		return this.checkFlipLeft(x, y, player).concat(this.checkFlipRight(x, y, player)).
			concat(this.checkFlipUp(x, y, player)).concat(this.checkFlipDown(x, y, player)).
			concat(this.checkFlipUpLeft(x, y, player)).concat(this.checkFlipUpRight(x, y, player)).
			concat(this.checkFlipDownLeft(x, y, player)).concat(this.checkFlipDownRight(x, y, player));
	}
	
	checkFlipLeft(x, y, player) {
		var search = false;
		x--;
		var positions = [];
		while(x >= 0) {
			if(this.board[x][y] == -player) {
				search = true;
				positions.push({x: x, y: y});
			}
			
			else if(search && this.board[x][y] == player) {
				return positions;
			}
			
			else {
				return [];
			}
			
			x--;
		}
		
		return [];
	}
	
	checkFlipRight(x, y, player) {
		var search = false;
		x++;
		var positions = [];
		while(x < 8) {
			if(this.board[x][y] == -player) {
				search = true;
				positions.push({x: x, y: y});
			}
			
			else if(search && this.board[x][y] == player) {
				return positions;
			}
			
			else {
				return [];
			}
			
			x++;
		}
		
		return [];
	}
	
	checkFlipUp(x, y, player) {
		var search = false;
		y--;
		var positions = [];
		while(y >= 0) {
			if(this.board[x][y] == -player) {
				search = true;
				positions.push({x: x, y: y});
			}
			
			else if(search && this.board[x][y] == player) {
				return positions;
			}
			
			else {
				return [];
			}
			
			y--;
		}
		
		return [];
	}
	
	checkFlipDown(x, y, player) {
		var search = false;
		y++;
		var positions = [];
		while(y < 8) {
			if(this.board[x][y] == -player) {
				search = true;
				positions.push({x: x, y: y});
			}
			
			else if(search && this.board[x][y] == player) {
				return positions;
			}
			
			else {
				return [];
			}
			
			y++;
		}
		
		return [];
	}
	
	checkFlipUpLeft(x, y, player) {
		var search = false;
		x--;
		y--;
		var positions = [];
		while(x >= 0 && y >= 0) {
			if(this.board[x][y] == -player) {
				search = true;
				positions.push({x: x, y: y});
			}
			
			else if(search && this.board[x][y] == player) {
				return positions;
			}
			
			else {
				return [];
			}
			
			x--;
			y--;
		}
		
		return [];
	}
	
	checkFlipUpRight(x, y, player) {
		var search = false;
		x++;
		y--;
		var positions = [];
		while(x < 8 && y >= 0) {
			if(this.board[x][y] == -player) {
				search = true;
				positions.push({x: x, y: y});
			}
			
			else if(search && this.board[x][y] == player) {
				return positions;
			}
			
			else {
				return [];
			}
			
			x++;
			y--;
		}
		
		return [];
	}
	
	checkFlipDownLeft(x, y, player) {
		var search = false;
		x--;
		y++;
		var positions = [];
		while(x >= 0 && y < 8) {
			if(this.board[x][y] == -player) {
				search = true;
				positions.push({x: x, y: y});
			}
			
			else if(search && this.board[x][y] == player) {
				return positions;
			}
			
			else {
				return [];
			}
			
			x--;
			y++;
		}
		
		return [];
	}
	
	checkFlipDownRight(x, y, player) {
		var search = false;
		x++;
		y++;
		var positions = [];
		while(x < 8 && y < 8) {
			if(this.board[x][y] == -player) {
				search = true;
				positions.push({x: x, y: y});
			}
			
			else if(search && this.board[x][y] == player) {
				return positions;
			}
			
			else {
				return [];
			}
			
			x++;
			y++;
		}
		
		return [];
	}
	
	click(event) {
		
		if(this.lock) {
			return;
		}
		
		this.lock = true;
		
		var totalOffsetX = 0;
	    var totalOffsetY = 0;
	    var canvasX = 0;
	    var canvasY = 0;
	    var currentElement = this.canvas;

	    do{
	        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
	        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
	    }
	    
	    while(currentElement = currentElement.offsetParent);

	    canvasX = event.pageX - totalOffsetX;
	    canvasY = event.pageY - totalOffsetY;
	    
	    var width = Math.floor(canvasX * 8 / this.width);
	    var height = Math.floor(canvasY * 8 / this.height);
	    
	    var flips = this.getFlips(width, height, -1);
	    
	    if(flips.length != 0) {
	    	this.addPiece(width, height, -1);
	    	
	    	
    		flips.forEach(f => {
	    		this.addPiece(f.x, f.y, -1);
	    	});
	    	
	    	this.hints.forEach(h => {
	    		
	    		var x = Math.floor(h.centerWidth * 8 / this.width);
	    		var y = Math.floor(h.centerHeight * 8 / this.height);
	    		if(x != width || y != height) {
	    			h.clear();
	    		}
	    		
	    	});
	    	
	    	
	    		this.sendTable();
	    
		    
	    }
	    
	    else {
	    	this.lock = false;
	    }
	    
	}
	
	sendTable() {
		$.ajax({
            type: 'POST',
            url: '/move',
            data: {
            	'board[]': this.board
            },
            async: false,
            
            success: (response) => {
            	if(response) {
            		var data = JSON.parse(response);
	            	var opponentFlips = this.getFlips(data.x, data.y, 1);
	            	
	            	if(opponentFlips.length != 0) {
	        	    	this.addPiece(data.x, data.y, 1);
	        	    	opponentFlips.forEach(f => {
	        	    		this.addPiece(f.x, f.y, 1);
	        	    	});
	            	}
            	}
            	
            	this.fillHints();
            	
            	if(response && this.hints.length == 0) {
            		this.sendTable();
            	}
            	
            	else if (!response && this.hints.length == 0) {
            		var black = 0;
            		var white = 0;
            		for(var i = 0; i < 8; i++) {
            			for(var j = 0; j < 8; j++) {
            				if(this.board[i][j] == -1) {
            					black++;
            				}
            				
            				else if(this.board[i][j] == 1) {
            					white++;
            				}
            			}
            		}
            		
            		var message = black > white ? "You Win" : black < white ? "You Lose" : "Draw";
            		alert(message + "\n" + "Black: " + black + "\nWhite: " + white);
            	}
            	
            	else {
            		this.lock = false;
            	}
            	
            }
        });
	}
	
}

class Piece {
	
	constructor(context, centerWidth, centerHeight, radius, color) {
		this.context = context;
		this.centerWidth = centerWidth;
		this.centerHeight = centerHeight;
		this.radius = radius;
		this.color = color;
		this.draw();
	}
	
	draw() {
		this.context.beginPath();
		this.context.clearRect(this.centerWidth - this.radius, this.centerHeight - this.radius, this.radius * 2, this.radius * 2);
		this.context.fillStyle = 'green';
		this.context.fillRect(this.centerWidth - this.radius - 1, this.centerHeight - this.radius - 1, this.radius * 2 + 2, this.radius * 2 + 2);
		this.context.fillStyle = this.color;
		this.context.arc(this.centerWidth, this.centerHeight, this.radius, 0, Math.PI * 2);
		this.context.fill();
	}
	
}

class Hint {
	
	constructor(context, number, centerWidth, centerHeight, radius, color) {
		this.context = context;
		this.number = number;
		this.centerWidth = centerWidth;
		this.centerHeight = centerHeight;
		this.radius = radius;
		this.color = color;
		this.draw();
	}
	
	draw() {
		this.context.beginPath();
		this.context.fillStyle = this.color;
		this.context.arc(this.centerWidth, this.centerHeight, 4 * this.radius / 5, 0, Math.PI * 2);
		this.context.lineWidth = 5;
		this.context.stroke();
		this.context.font = "bold " + this.radius +"px Arial";
		this.context.textAlign = "center";
		this.context.textBaseline = 'middle';
		this.context.fillText(this.number, this.centerWidth, this.centerHeight);
	}
	
	clear() {
		this.context.clearRect(this.centerWidth - this.radius, this.centerHeight - this.radius, this.radius * 2, this.radius * 2);
		this.context.fillStyle = 'green';
		this.context.fillRect(this.centerWidth - this.radius - 1, this.centerHeight - this.radius - 1, this.radius * 2 + 2, this.radius * 2 + 2);
	}
	
}

$(function() { 
	game = new Reversi();
});

