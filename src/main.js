/*** main.js ***/

define(function(require, exports, module) {
    var Engine 		= require('famous/core/Engine');
    var IntroView   = require('views/IntroView');

    var mainContext = Engine.createContext();
    var introView = new IntroView();

    mainContext.add(introView);
});
