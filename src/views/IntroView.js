/*** IntroView.js ***/

//1. Make text pretty
//2. Add the bar
//3. Add text area in zip
//4. Clean up

define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var HeaderFooter  = require('famous/views/HeaderFooterLayout');
    var ImageSurface  = require('famous/surfaces/ImageSurface');
    var RenderNode    = require('famous/core/RenderNode');
    var SplashView    = require('views/SplashView');
    var GridLayout    = require("famous/views/GridLayout");
    var ScrollView    = require("famous/views/Scrollview");
    var SplashData    = require('data/SplashData');
    var Timer         = require('famous/utilities/Timer');

    var GenericSync     = require('famous/inputs/GenericSync');
    var MouseSync       = require('famous/inputs/MouseSync');
    var TouchSync       = require('famous/inputs/TouchSync');
    GenericSync.register({'mouse': MouseSync, 'touch': TouchSync});

    function IntroView() {
        View.apply(this, arguments);

        _createLayout.call(this);
        _createSync.call(this);
        _createFooter.call(this);
        _createSplashViews.call(this);
        _createZIPView.call(this);
        _syncHandling.call(this);
    }

    IntroView.prototype = Object.create(View.prototype);
    IntroView.prototype.constructor = IntroView;

    IntroView.DEFAULT_OPTIONS = {
        firstClick: true,
        footerSize: 30,
        screenSize: [0,0],
    };

    function _createSync() {
        this.sync = new GenericSync(
            ['mouse', 'touch'],
            {direction : GenericSync.DIRECTION_X}
        );
    }

    function _createLayout() {
        this.layout = new HeaderFooter({
            footerSize: this.options.footerSize
        });

        var layoutModifier = new StateModifier({
            transform: Transform.translate(0, 0, 0)
        });

        this.add(layoutModifier).add(this.layout);
    }

    function _createSplashViews() {
        this.scrollView = new ScrollView({
            direction: 0,
            paginated: true
        });
        this.splashViews = [];
        this.scrollView.sequenceFrom(this.splashViews);
        for (var i = 0; i < SplashData.length; i++) {
            var splashView = new SplashView({
                featureUrl: SplashData[i].featureUrl,
                content: SplashData[i].content,
                button: SplashData[i].button
            });

            if(SplashData[i].button){
                this.subscribe(splashView.button);
            }
            splashView.surfaces[0].pipe(this.scrollView);
            splashView.surfaces[1].pipe(this.scrollView);

            splashView.surfaces[0].pipe(this.sync);
            splashView.surfaces[1].pipe(this.sync);
            this.splashViews.push(splashView);
        }
        this.layout.content.add(this.scrollView);
    }

    function _createFooter() {
        var backgroundSurface = new Surface({
            properties: {
                backgroundColor: 'rgb(244, 247, 248)'
            }
        });
        var grid = new GridLayout({
            dimensions: [4, 1]
        });

        this.dots = [];
        this.dotModifiers = [];
        grid.sequenceFrom(this.dots);

        for(var i = 0; i < 4; i++) {
            var dotModifier = new StateModifier({
                opacity: 0.5
            });

            this.dotModifiers.push(dotModifier);
            
            var dotSurface = new ImageSurface({
                size:[7,7],
                content: 'img/dot.png'
            });
            dotSurface.node = new RenderNode();
            dotSurface.mod = dotModifier;
            dotSurface.mod.setOpacity(0.5);

            dotSurface.node.add(dotSurface.mod).add(dotSurface);

            this.dots.push(dotSurface.node);
        }
        this.dotModifiers[0].setOpacity(1);


        var gridModifier = new StateModifier({
            origin: [.5,.5],
            align: [.5,.5],
            size: [55,7]
        })

        this.layout.footer.add(backgroundSurface);
        this.layout.footer.add(gridModifier).add(grid);
    }

    function _syncHandling() {

        Timer.setInterval(function(){
            for(var i = 0; i<this.dotModifiers.length; i++){
                this.dotModifiers[i].setOpacity(0.5);
            }
            if(this.scrollView.getVelocity()>0){
                this.dotModifiers[Math.max(0,Math.floor((this.scrollView.getAbsolutePosition()-this.options.screenSize[0]/2)/this.options.screenSize[0])+1)].setOpacity(1);
            } else {
                this.dotModifiers[Math.max(0,Math.floor((this.scrollView.getAbsolutePosition())/this.options.screenSize[0]))].setOpacity(1);
            }
        }.bind(this), 10);

        this._eventInput.on('buttonClick', (function(){
            if(this.options.firstClick){
                this.zipModifier.setTransform(
                    Transform.translate(0,0,0),
                    { duration : 300, curve: 'easeOut'}
                );
                this.options.firstClick = false;
            } else {
                this._eventOutput.emit("exitIntro");
            }
        }).bind(this));
    }

    function _createZIPView(){
        var zipView = new SplashView({
            content: "<h3>PLEASE CONFIRM YOUR ZIP CODE</h3>",
            featureUrl: "img/sfmap.jpg",
            button: true,
            zip: true
        });
        this.zipModifier = new StateModifier({
            transform: Transform.translate(3200,0,2)
        });
        this.subscribe(zipView.button);
        this.add(this.zipModifier).add(zipView);
    }

    module.exports = IntroView;
});
