define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var HeaderFooter    = require('famous/views/HeaderFooterLayout');
    var ImageSurface    = require('famous/surfaces/ImageSurface');
    var ScrollView      = require('famous/views/Scrollview');

    function PageView() {
        View.apply(this, arguments);

        _createBacking.call(this);
        _createLayout.call(this);
        _createHeader.call(this);
        _createBody.call(this);

        _setListeners.call(this);
    }

    PageView.prototype = Object.create(View.prototype);
    PageView.prototype.constructor = PageView;

    PageView.DEFAULT_OPTIONS = {
        headerSize: 44
    };

    function _createBacking() {
        var backing = new Surface({
            properties: {
                backgroundColor: 'black',
                //boxShadow: '0 0 20px rgba(0,0,0,0.5)'
            }
        });

        this.add(backing);
    }

    function _createLayout() {
        this.layout = new HeaderFooter({
            headerSize: this.options.headerSize
        });

        var layoutModifier = new StateModifier({
            transform: Transform.translate(0, 0, 0.1)
        });

        this.add(layoutModifier).add(this.layout);
    }

    function _createHeader() {
        var backgroundSurface = new Surface({
            properties: {
                backgroundColor: 'white',
                boxShadow: '0 0 1px 0 rgba(150,150,150,.5)'
            }
        });

        var searchSurface = new Surface({
            //size: [232, 44],
            content : 'Today 10/28',
            properties:{
                color: 'black',
                fontSize: '12px',
                textAlign: 'center',
                lineHeight: "44px",
                verticalAlign: "middle"
                //backgroundColor: 'rgb(240,114,73)'
            },
        });

        this.hamburgerSurface = new ImageSurface({
            size: [44, 44],
            content : 'img/hamburger.png' //rename to hamburger?
        });


        var iconSurface = new ImageSurface({
            size: [44, 44],
            content : 'img/shoppingbagicon.png'
        });

        var backgroundModifier = new StateModifier({
            transform : Transform.translate(0,0,2)
        });

        var hamburgerModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0, 0.5],
            transform : Transform.translate(0,0,2)
        });

        var searchModifier = new StateModifier({
            origin: [0.5, 0.5],
            align : [0.5, 0.5],
            transform : Transform.translate(0,0,2)
        });

        var iconModifier = new StateModifier({
            origin: [1, 0.5],
            align : [1, 0.5],
            transform : Transform.translate(0,0,2)
        });

        this.layout.header.add(backgroundModifier).add(backgroundSurface);
        this.layout.header.add(hamburgerModifier).add(this.hamburgerSurface);
        this.layout.header.add(searchModifier).add(searchSurface);
        this.layout.header.add(iconModifier).add(iconSurface);
    }

    function _createBody() {
        this.scrollView = new ScrollView({
            direction: 1,
            groupScroll: true
        });
        this.exampleDishes = [];
        this.scrollView.sequenceFrom(this.exampleDishes);

        //each dish is a view
        var dish1 = new ImageSurface({
            size: [320, 380],
            content: 'img/exampledish1.jpg'
        });

        this.exampleDishes.push(dish1);

        var dish2 = new ImageSurface({
            size: [320, 380],
            content: 'img/exampledish2.png'
        });

        this.exampleDishes.push(dish2);

        var dish3 = new ImageSurface({
            size: [320, 380],
            content: 'img/exampledish3.png'
        });

        this.exampleDishes.push(dish3);
        this.layout.content.add(this.scrollView);

        this.dimmer = new Surface({
            size: [ undefined, undefined],
            properties:{
                //color: 'white',
                //textAlign: 'center',
                //lineHeight: "33px",
                //verticalAlign: "middle",
                backgroundColor: 'rgb(206,217,227)'
            }
        });
        this.dimmerMod = new StateModifier({
            transform: Transform.translate(0,0,-1),
            opacity: 0
        });
        this.layout.content.add(this.dimmerMod).add(this.dimmer);
        //filter is a view
        this.dimmer.on('click', function(){
            if(!this.filterToggle){
                this.filterMod.setTransform(Transform.translate(0,33,1), {duration: 200, curve:'linear'});
                this.dimmerMod.setOpacity(0, {duration:200});
                this.dimmerMod.setTransform(Transform.translate(0,0,-1), {duration: 200, curve:"easeIn"});
                this.filterToggle = true;
            }
            if(!this.footerToggle){
                this.footerMod.setTransform(Transform.translate(0,-55,1), {duration:200});
                this.dimmerMod.setOpacity(0, {duration:200});
                this.dimmerMod.setTransform(Transform.translate(0,0,-1), {duration:200, curve:"easeIn"});
                this.footerToggle = true;
            }
        }.bind(this));
        this.filter = new ImageSurface({
            size: [undefined, 401],
            content: 'img/exampleFilter.jpg'
        });

        this.filterMod = new StateModifier({
            transform: Transform.translate(0,33,1),
            origin: [0,1],
            align:[0,0]
        });
        this.layout.content.add(this.filterMod).add(this.filter);
        this.filterToggle = true;
        this.filter.on('click', function(){
            if(this.filterToggle){
                this.filterMod.setTransform(Transform.translate(0,401,1.5), {duration: 200});
                this.dimmerMod.setTransform(Transform.translate(0,0,1.1));
                this.dimmerMod.setOpacity(.9, {duration:200});
                //this.filterToggle = false;
            } else {
                this.filterMod.setTransform(Transform.translate(0,33,1), {duration: 200, curve:'linear'});
                this.dimmerMod.setOpacity(0, {duration:200});
                this.dimmerMod.setTransform(Transform.translate(0,0,-1), {duration:200, curve:"easeIn"});

                //this.filterToggle = true;
            }
            this.filterToggle = !this.filterToggle;
        }.bind(this));

        this.footer = new ImageSurface({
            size: [undefined,197],
            content: 'img/examplefooter.jpg'
        });

        this.footerMod = new StateModifier({
            transform: Transform.translate(0,-55,1),
            origin: [0,0],
            align: [0,1]
        });

        this.layout.content.add(this.footerMod).add(this.footer);
        this.footerToggle = true;
        this.footer.on('click', function(){
            if(this.footerToggle){
                this.footerMod.setTransform(Transform.translate(0,-197,1.5), {duration:200});
                this.dimmerMod.setTransform(Transform.translate(0,0,1.1));
                this.dimmerMod.setOpacity(.9, {duration:200});
            } else {
                this.footerMod.setTransform(Transform.translate(0,-55,1), {duration:200});
                this.dimmerMod.setOpacity(0, {duration:200});
                this.dimmerMod.setTransform(Transform.translate(0,0,-1), {duration:200, curve:"easeIn"});
            }
            this.footerToggle = !this.footerToggle;
        }.bind(this));


        /*
        for (var i = 0; i < 3; i++) {
            var splashView = new SplashView({
                featureUrl: SplashData[i].featureUrl,
                content: SplashData[i].content,
                button: SplashData[i].button,
                screenSize: this.options.screenSize
            });

            if(SplashData[i].button){
                this.subscribe(splashView.button);
            }
            splashView.surfaces[0].pipe(this.scrollView);
            splashView.surfaces[1].pipe(this.scrollView);
            this.splashViews.push(splashView);
        }
        /*
        this.bodySurface = new ImageSurface({
            size : [undefined, true],
            content : 'img/body.png'
        });

        this.layout.content.add(this.bodySurface);
        */
    }

    function _setListeners() {
        this.hamburgerSurface.on('click', function() {
            this._eventOutput.emit('menuToggle');
        }.bind(this));


        for(var i = 0; i < 3; i++){
            this.exampleDishes[i].pipe(this._eventOutput);
        }
        
        //this.layout.content.pipe(this._eventOutput);
    }

    module.exports = PageView;
});
