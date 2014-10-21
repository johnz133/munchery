/*** TitleView.js ***/

define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var Modifier      = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface  = require('famous/surfaces/ImageSurface')
    var Timer         = require('famous/utilities/Timer');
    function TitleView() {
        View.apply(this, arguments);
        _createSurfaces.call(this);
    }

    TitleView.prototype = Object.create(View.prototype);
    TitleView.prototype.constructor = TitleView;

    TitleView.DEFAULT_OPTIONS = {};

    function _createSurfaces() {

        var backgroundSurface = new Surface({
            properties: {
                backgroundColor: 'rgb(252,252,251)'
            }
        });
        var muncheryImage = new ImageSurface({
            content: 'img/muncheryLogo.png',
            size:[210,150],
            pointerEvents : 'none'
        });
        this.muncheryModifier = new StateModifier({
            align: [0.5, 0.5],
            origin: [.5, .5],
            transform: Transform.translate(2,0),
        });

        var knife = new ImageSurface({
            content: 'img/knife.png',
            size: [9,41]
        });

        var fork = new ImageSurface({
            content: 'img/fork.png',
            size: [9,41]
        });

        this.knifeModifier = new StateModifier({
            align: [0.5, 0.5],
            origin: [0.5, 0.5],
            transform: Transform.translate(10,-45,3)
        });
        this.forkModifier = new StateModifier({
            align: [0.5, 0.5],
            origin: [0.5, 0.5],
            transform: Transform.translate(-10,-45,3)
        });
        this.forkRotateModifier = new Modifier({
            origin: [0.5,0.5]
        });
        this.knifeRotateModifier = new Modifier({
            origin: [0.5,0.5]
        })
        this.add(this.knifeModifier).add(this.knifeRotateModifier).add(knife);
        this.add(this.forkModifier).add(this.forkRotateModifier).add(fork);
        this.add(this.muncheryModifier).add(muncheryImage);
        this.add(backgroundSurface);
        Timer.setTimeout(function(){ muncheryImage.setContent('img/muncheryLogoNoKF.png')},1000);
    }

    TitleView.prototype.animate = function() {
        //this.muncheryModifier.setOpacity(0, { duration : 300, curve: 'easeOut'});
        this.muncheryModifier.setTransform(Transform.translate(2,0,1));
        this.forkRotateModifier.setTransform(function() {
            return Transform.rotateY(.016 * (Date.now()));
        });
        this.knifeRotateModifier.setTransform(function(){
            return Transform.rotateY(.016 * Date.now() -.5);
        })
        //this.knifeModifier.setTransform(Transform.translate(10,-200,2), {duration: 500, curve: 'easeIn'});
        //this.forkModifier.setTransform(Transform.translate(-10,-200,2), {duration: 500, curve: 'easeOut'});
        Timer.setTimeout(function(){
            this.knifeModifier.setTransform(Transform.translate(10,500,2), {duration: 700});
            this.forkModifier.setTransform(Transform.translate(-10,500,2), {duration: 700});
        }.bind(this),2000);
    };
    module.exports = TitleView;
});
