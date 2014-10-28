/*** main.js ***/

define(function(require, exports, module) {
    var Engine 		= require('famous/core/Engine');
    var IntroView   = require('views/IntroView');
    var TitleView   = require('views/TitleView');
    var AppView		= require('views/AppView');
    var Lightbox = require('famous/views/Lightbox');

    var Timer 		= require('famous/utilities/Timer');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transform   = require('famous/core/Transform');
    var mainContext = Engine.createContext();


    this.lightbox = new Lightbox({
    	inTransform: Transform.translate(0, 0, 0),
    	outTransform: Transform.translate(0, 0, 0),
    	inTransition: { curve: 'linear', duration: 300},
    	outTransition: { curve: 'linear', duration: 300},
    	inOpacity: 1,
    	outOpacity: 0,
    	overlap: true
    });

    mainContext.add(this.lightbox);
    var introView = new IntroView({ screenSize: mainContext.getSize() });
    var titleView = new TitleView({ screenSize: mainContext.getSize() });
    var appView = new AppView({ screenSize: mainContext.getSize() });
            //console.log(mainContext.getSize());

    this.lightbox.show(appView);

    /*
    this.lightbox.show(titleView);
    Timer.setTimeout(function () {
    	this.lightbox.hide(titleView);
    	this.lightbox.show(introView);
    }.bind(this),2000);

    introView.on("exitIntro", function(){
    	this.lightbox.hide(introView);
    	this.lightbox.show(titleView);
    	Timer.setTimeout(function(){
    		titleView.animate();
    		Timer.setTimeout(function(){
    			this.lightbox.hide(titleView);
    			this.lightbox.show(appView);
    		}.bind(this),2600);
    	}.bind(this),1000);
    }.bind(this));
    */
});
