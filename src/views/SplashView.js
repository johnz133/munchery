/*** SplashView.js ***/

define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface  = require('famous/surfaces/ImageSurface');
    var FlexibleLayout = require('famous/views/FlexibleLayout');

    function SplashView() {
        View.apply(this, arguments);
        _createLayout.call(this);
        _createImage.call(this);
        this.layout.sequenceFrom(this.surfaces);
        this.add(this.layout);

    }

    SplashView.prototype = Object.create(View.prototype);
    SplashView.prototype.constructor = SplashView;

    SplashView.DEFAULT_OPTIONS = {
        featureHeight: 317,
        featureURL: 'img/sushicropped.jpg',
        splashURL: 'img/splash1.jpg',
        ratios: [6,4]
    };

    function _createLayout() {
        this.layout = new FlexibleLayout({
            direction: 1,
            ratios: [6,4]
        });

        this.layoutModifier = new StateModifier({
            transform: Transform.translate(0, 0, 0)
        });
        this.surfaces = [];

    }
    function _createImage() {

        var featureImage = new ImageSurface({
            size: [undefined, undefined],
            content : this.options.featureURL,
            pointerEvents : 'none'
        });

        this.surfaces.push(featureImage);

        this.surfaces.push(new ImageSurface({
            size: [undefined, undefined],
            content : this.options.splashURL,
            pointerEvents : 'none'
        }));

    }


    module.exports = SplashView;
});
