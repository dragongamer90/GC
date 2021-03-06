var basedata = {

    goomies: 1e6,
	total_goomies: 1e6,

    gpc: 1.0,
    gps: 0,

	playing: true,
	playtime: 864000000,

    clickOnGoomy: function() {
        this.goomies += this.gpc;
		this.total_goomies += this.gpc;
    },

    // update actual data.
    update: function(delta_ms) {
		if (!this.playing) return;
		this.playtime += delta_ms;

		var delta = this.gps * delta_ms / 1000.0;

        this.goomies += delta;
		this.total_goomies += delta;
    },

    recalcGPS: function() {
        var gps = 0;
        for (var a = 0; a < generators.length; ++a) {
            gps += generators[a].getGPS() * generators[a].count;
        }
        this.gps = gps;
    },

};

function onUpdate(message) {
    if (message.type == "click_on_goomy") {
        basedata.clickOnGoomy();
    } else if (message.type == "buy_generator") {
        // look for generator count
        var result = generators_by_ID[message.generatorName].buy(message.count);
        if (result) {
            basedata.recalcGPS();
        }
    } else if (message.type == "sell_generator") {
        // look for generator count
        var result = generators_by_ID[message.generatorName].sell(message.count);
        if (result) {
            basedata.recalcGPS();
        }
	} else if (message.type == "levelup_generator") {
		// look for generator count
		var result = generators_by_ID[message.generatorName].levelUp(message.count);
		if (result) {
			basedata.recalcGPS();
		}
    } else if (message.type == "buy_item") {
        // branch by item type

    }
}



// header declarations for the React files.

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
