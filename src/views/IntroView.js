/*** IntroView.js ***/

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


    function IntroView() {
        View.apply(this, arguments);
        _createLayout.call(this);
        _createFooter.call(this);
        _createSplashViews.call(this);
    }

    IntroView.prototype = Object.create(View.prototype);
    IntroView.prototype.constructor = IntroView;

    IntroView.DEFAULT_OPTIONS = {
        footerSize: 30
    };

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
        var splashView = new SplashView();
        this.layout.content.add(splashView);
    }
    /*
    function addContent() {
        this.layout.content.add(createGrid( 'content', [2, 1] ));
    }
    function createGrid( section, dimensions ) {
        var grid = new GridLayout({
            dimensions: dimensions
        });

        var surfaces = [];
        grid.sequenceFrom(surfaces);

        for(var i = 0; i < dimensions[0]; i++) {
            surfaces.push(new Surface({
              content: section + ' ' + (i + 1),
              size: [undefined, undefined],
              properties: {
                backgroundColor: "hsl(" + (i * 360 / 8) + ", 100%, 50%)",
                color: "#404040",
                textAlign: 'center'
            }
        }));
        }

        return grid;
    }
    */

    function _createFooter() {
        var backgroundSurface = new Surface({
            properties: {
                backgroundColor: '#f4f7f8'
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
            //this.layout.footer.add(dotModifier).add(dotSurface);

            this.dots.push(dotSurface.node);
        }

        var backgroundModifier = new StateModifier({
            transform : Transform.behind
        });

        
        /*
        this.hamburgerSurface = new ImageSurface({
            size: [44, 44],
            content : 'img/hamburger.png'
        });

        var searchSurface = new ImageSurface({
            size: [232, 44],
            content : 'img/search.png'
        });

        var iconSurface = new ImageSurface({
            size: [44, 44],
            content : 'img/icon.png'
        });

        var hamburgerModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0, 0.5]
        });

        var searchModifier = new StateModifier({
            origin: [0.5, 0.5],
            align : [0.5, 0.5]
        });

        var iconModifier = new StateModifier({
            origin: [1, 0.5],
            align : [1, 0.5]
        });

        this.layout.footer.add(hamburgerModifier).add(this.hamburgerSurface);
        this.layout.footer.add(searchModifier).add(searchSurface);
        this.layout.footer.add(iconModifier).add(iconSurface);
        */

        var gridModifier = new StateModifier({
            origin: [.5,.5],
            align: [.5,.5],
            size: [55,7]
        })
        this.layout.footer.add(backgroundModifier).add(backgroundSurface);
        this.layout.footer.add(gridModifier).add(grid);
    }

    module.exports = IntroView;
});
