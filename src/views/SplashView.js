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
        if(this.options.button){
            _createButton.call(this);
        }
        if(this.options.zip){
            _createZipField.call(this);
        }
        this.layout.sequenceFrom(this.surfaces);
        this.add(new StateModifier({transform: Transform.translate(0, 0, 0)})).add(this.layout);

    }

    SplashView.prototype = Object.create(View.prototype);
    SplashView.prototype.constructor = SplashView;

    SplashView.DEFAULT_OPTIONS = {
        featureHeight: 317,
        featureUrl: '',
        content: "",
        button: false,
        zip: false,
        ratios: [6,4],
        screenSize: [0,0]
    };

    function _createLayout() {
        this.layout = new FlexibleLayout({
            direction: 1,
            ratios: [6,4]
        });

        this.layoutModifier = new StateModifier({
            transform: Transform.translate(0, 0, 0),
            size: this.options.screenSize
        });
        this.surfaces = [];

    }
    function _createImage() {
        var featureImage = new ImageSurface({
            size: [undefined, undefined],
            content : this.options.featureUrl,
            pointerEvents : 'none'
        });

        this.surfaces.push(featureImage);

        this.surfaces.push(new Surface({
            content: this.options.content,
            size: [undefined, undefined],
            properties: {
                backgroundColor: 'rgb(244, 247, 248)',
                textAlign: 'center',
                //padding: '5px',
                //border: '2px solid rgb(210, 208, 203)',
                //marginTop: '50px',
                //marginLeft: '50px'
            }
        }));
    }

    function _createButton() {
        var buttonLayout = new FlexibleLayout({
            direction: 0,
            ratios: [2,50,2],
            size: [undefined, 33]
        });
        var buttonSurfaces = [];
        buttonSurfaces.push(new Surface({
            size: [undefined, 3],
            properties: {
                backgroundColor: 'rgb(244, 247, 248)'
            }
        }));
        buttonSurfaces.push(new Surface({
            content: "CHECK AVAILABILITY IN YOUR AREA",
            properties:{
                color: 'white',
                textAlign: 'center',
                lineHeight: "33px",
                verticalAlign: "middle",
                backgroundColor: 'rgb(240,114,73)'
            },
            size: [undefined, 33]
        }));
        buttonSurfaces.push(new Surface({
            size: [undefined, 33],
            properties: {
                backgroundColor: 'rgb(244, 247, 248)'
            }
        }));
        this.button = buttonSurfaces[1];
        buttonSurfaces[1]._eventOutput.on('click', function(){
            this._eventOutput.emit('buttonClick');
        });
        buttonLayout.sequenceFrom(buttonSurfaces);
        this.surfaces.push(buttonLayout);
        this.surfaces.push(new Surface({
            size:[undefined,0],
            properties: {
                backgroundColor: 'rgb(244,247,248)'
            }
        }));
        this.layout.setRatios([24,13,true,3]);
        
    }

    function _createZipField(){
        this.surfaces.push(new Surface({
            properties: {
                backgroundColor: 'rgb(244,247,248)'
            }
        }))
        this.layout.setRatios([24,11,3,2]);
    }

    module.exports = SplashView;
});
