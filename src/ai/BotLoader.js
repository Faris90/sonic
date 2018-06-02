// Project imports
var BotPlayer = require('./BotPlayer');
var FakeSocket = require('./FakeSocket');
var PacketHandler = require('../PacketHandler');

function BotLoader(gameServer,botAmount) {
	this.gameServer = gameServer;
	
	// Names
	this.nameIndex = 0;
	
	for (var i = 0; i < botAmount; i++) {
		var s = new FakeSocket();
		s.playerTracker = new BotPlayer(gameServer, s);
		s.packetHandler = new PacketHandler(gameServer, s);
		
		// Add to client list
		gameServer.clients.push(s);
		
		// Add to world
		s.packetHandler.setNickname(this.getName());
	}
}

module.exports = BotLoader;

BotLoader.prototype.getName = function() {
	var name = "";
	
	// Picks a random name for the bot
	if (this.randomNames.length > 0) {
		var index = Math.floor(Math.random() * this.randomNames.length);
		name = this.randomNames[index];
		this.randomNames.splice(index,1);
	} else {
		name = "bot" + ++this.nameIndex;
	}
	
	return name;
}
