/*** main.js ***/

define(function(require, exports, module) {
    var Engine 		= require('famous/core/Engine');
    var IntroView   = require('views/IntroView');
    var TitleView   = require('views/TitleView');
    var Timer 		= require('famous/utilities/Timer');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transform   = require('famous/core/Transform');
    var mainContext = Engine.createContext();
    var introView = new IntroView({
    	screenSize: mainContext.getSize()
    });

    var titleView = new TitleView();
    var titleModifier = new StateModifier({
    	opacity: 1,
    	tranform: Transform.translate(0,0,2)
    });

    mainContext.add(titleModifier).add(titleView);
    mainContext.add(introView);

    Timer.setTimeout(function(){
	    titleModifier.setOpacity(0, { duration : 300, curve: 'easeOut'});
	    titleModifier.setTransform(
	    	Transform.translate(0,0,-1),{ duration : 600}
	    );
    },1000);

    introView.on("exitIntro", function(){
    	introView.render = function(){ return null; };
    	titleModifier.setOpacity(1, { duration : 300, curve: 'easeIn'});
    	Timer.setTimeout(function(){
    		titleView.animate();
    	},1000);
    });
});
