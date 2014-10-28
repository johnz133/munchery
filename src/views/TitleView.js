/*** TitleView.js ***/

define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var Modifier      = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface  = require('famous/surfaces/ImageSurface');
    var Timer         = require('famous/utilities/Timer');

    function TitleView() {
        View.apply(this, arguments);
        _createSurfaces.call(this);
    }

    TitleView.prototype = Object.create(View.prototype);
    TitleView.prototype.constructor = TitleView;

    TitleView.DEFAULT_OPTIONS = {
        rotate:10,
        screenSize: [0,0]
    };

    function _createSurfaces() {
        var backgroundSurface = new Surface({
            size: [undefined, undefined],
            properties: {
                backgroundColor: 'rgb(255,255,255)'
            }
        });

        var muncheryImage = new ImageSurface({
            content: 'img/muncheryLogoNoKF.png',
            size:[210,150]
        });
        this.muncheryModifier = new StateModifier({
            align: [0.5, 0.5],
            origin: [.5, .5],
            //transform: Transform.translate(2,0,0),
        });

        var knife = new ImageSurface({
            content: 'img/knife.png',
            size: [9,41],
            classes: ['backfaceVisibility']
        });

        var fork = new ImageSurface({
            content: 'img/fork.png',
            size: [9,41],
            classes: ['backfaceVisibility']
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
        this.rotateModifier = new Modifier({
            origin: [0.5,0.5]
        });
        this.kRotateModifier = new Modifier({
            origin: [0.5,0.5]
        })
        this.backgroundModifier = new StateModifier({
            //transform: Transform.translate(0,0,2)
        });
        this.add(this.knifeModifier).add(this.kRotateModifier).add(knife);
        this.add(this.forkModifier).add(this.rotateModifier).add(fork);
        this.add(this.muncheryModifier).add(muncheryImage);
        this.add(this.backgroundModifier).add(backgroundSurface);
    }

    TitleView.prototype.animate = function() {
        this.muncheryModifier.setOpacity(0, { duration : 800, curve: 'easeOut'});
        this.backgroundModifier.setTransform(Transform.translate(0,0,5));
        this.rotateModifier.setTransform(function() {
            return Transform.rotateY(.1*this.options.rotate++);
        }.bind(this));

        this.kRotateModifier.setTransform(function() {
            return Transform.rotateY(.1*this.options.rotate++);
        }.bind(this));

        this.forkModifier.setTransform(Transform.translate(-10,-this.options.screenSize[1]/3,50), {duration:500, curve:'easeOut'});
        this.knifeModifier.setTransform(Transform.translate(10,-this.options.screenSize[1]/3,50), {duration:600, curve:'easeIn'});
        Timer.setTimeout(function(){
            this.forkModifier.setTransform(Transform.translate(-10,this.options.screenSize[1],50), {duration:600, curve:'easeIn'});
            this.knifeModifier.setTransform(Transform.translate(10,this.options.screenSize[1],50), {duration:600, curve:'easeIn'});
            //this.backgroundModifier.setOpacity(0, {duration:1200, curve: 'easeIn'});
            Timer.setTimeout(function () {
                this.rotateModifier.setTransform(function() {
                    return Transform.rotateY(0);
                }.bind(this));

                this.kRotateModifier.setTransform(function() {
                    return Transform.rotateY(0);
                }.bind(this));
                //this.render = function(){ return null;};
            }.bind(this), 600);
        }.bind(this), 2000);

    };
    module.exports = TitleView;
});
