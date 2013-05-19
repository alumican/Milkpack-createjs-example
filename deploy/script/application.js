(function() {
  var Util;

  Util = (function() {
    function Util() {}

    Util.createButton = function(manager, container, fragments, offsetY) {
      var button, buttonIndex, buttonLength, buttonMargin, buttonRadius, buttons;

      buttonLength = fragments.length;
      buttons = new Array(buttonLength);
      buttonMargin = 50;
      buttonIndex = 0;
      buttonRadius = 10;
      while (buttonIndex < buttonLength) {
        button = new createjs.Shape();
        button.graphics.beginFill('#000').drawCircle(0, 0, buttonRadius);
        button.x = buttonMargin * (buttonIndex - (buttonLength - 1) / 2);
        button.y = container.y + offsetY;
        Util.setButtonHandlers(manager, button, fragments[buttonIndex]);
        container.addChild(button);
        buttons[buttonIndex] = button;
        ++buttonIndex;
      }
      return buttons;
    };

    Util.setButtonHandlers = function(manager, button, fragment) {
      var _this = this;

      button.onMouseOver = function(event) {
        button.alpha = 0.3;
        return $('#canvas').css('cursor', 'pointer');
      };
      button.onMouseOut = function(event) {
        button.alpha = 1;
        return $('#canvas').css('cursor', 'default');
      };
      return button.onClick = function(event) {
        return manager.goto(fragment);
      };
    };

    Util.getCssColor = function(r, g, b) {
      return "#" + (Math.round(r * 15).toString(16)) + (Math.round(g * 15).toString(16)) + (Math.round(b * 15).toString(16));
    };

    return Util;

  })();

  jpp.util.Namespace('app').register('Util', Util);

}).call(this);

(function() {
  var Application, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jpp.util.Namespace('app').use();

  jpp.util.Namespace('jpp.milkpack').use();

  Application = (function(_super) {
    __extends(Application, _super);

    function Application() {
      this._windowResizeHandler = __bind(this._windowResizeHandler, this);
      this._tickerTickHandler = __bind(this._tickerTickHandler, this);      _ref = Application.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Application.prototype.root = '/';

    Application.prototype.rootFile = 'index.html';

    Application.prototype.routes = {
      '/': 'app.IndexScene',
      '/about': 'app.PageAboutScene',
      '/gallery': 'app.PageGalleryScene',
      '/gallery/<int:id>': 'app.PagePhotoScene'
    };

    Application.prototype.onInit = function() {
      this.stage = new createjs.Stage('canvas');
      this.stage.enableMouseOver(30);
      createjs.Ticker.setFPS(60);
      createjs.Ticker.addEventListener('tick', this._tickerTickHandler);
      $('body').css({
        margin: 0
      });
      $('#sizeref').css({
        position: 'absolute',
        width: '100%',
        height: '100%'
      });
      $('#canvas').css({
        position: 'absolute'
      });
      $(window).resize(this._windowResizeHandler);
      return this._windowResizeHandler();
    };

    Application.prototype._tickerTickHandler = function(event) {
      return this.stage.update();
    };

    Application.prototype._windowResizeHandler = function(event) {
      var canvas, sizeref;

      sizeref = $('#sizeref');
      this.stageWidth = sizeref.width();
      this.stageHeight = sizeref.height();
      canvas = $('#canvas');
      canvas.attr({
        width: this.stageWidth
      });
      canvas.attr({
        height: this.stageHeight
      });
      return this.dispatchEvent('resize', {
        stageWidth: this.stageWidth,
        stageHeight: this.stageHeight
      });
    };

    return Application;

  })(jpp.milkpack.Milkpack);

  jpp.util.Namespace('app').register('Application', Application);

}).call(this);

(function() {
  var AbstractDisplayScene, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jpp.util.Namespace('jpp.milkpack').use();

  AbstractDisplayScene = (function(_super) {
    __extends(AbstractDisplayScene, _super);

    function AbstractDisplayScene() {
      this.resize = __bind(this.resize, this);
      this._resizeHandler = __bind(this._resizeHandler, this);
      this._onInit = __bind(this._onInit, this);      _ref = AbstractDisplayScene.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AbstractDisplayScene.prototype._onInit = function(title) {
      this.manager = this.getManager();
      this.stage = this.manager.stage;
      this.container = new createjs.Container();
      this.container.alpha = 0;
      this.stage.addChild(this.container);
      this.setTitle("" + title + " | MilkpackJS with CreateJS Example");
      return this.manager.addEventListener('resize', this._resizeHandler);
    };

    AbstractDisplayScene.prototype._resizeHandler = function(event) {
      return this.resize(event.extra.stageWidth, event.extra.stageHeight);
    };

    AbstractDisplayScene.prototype.resize = function(stageWidth, stageHeight) {
      this.container.x = stageWidth / 2;
      return this.container.y = 0;
    };

    return AbstractDisplayScene;

  })(jpp.milkpack.Scene);

  jpp.util.Namespace('app').register('AbstractDisplayScene', AbstractDisplayScene);

}).call(this);

(function() {
  var AbstractPageScene, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jpp.util.Namespace('app').use();

  jpp.util.Namespace('jpp.command').use();

  jpp.util.Namespace('jpp.util').use();

  AbstractPageScene = (function(_super) {
    __extends(AbstractPageScene, _super);

    function AbstractPageScene() {
      this._applyTitleColor = __bind(this._applyTitleColor, this);
      this._onBye = __bind(this._onBye, this);
      this._onLeave = __bind(this._onLeave, this);
      this._onArrive = __bind(this._onArrive, this);
      this._onHello = __bind(this._onHello, this);
      this._onInit = __bind(this._onInit, this);      _ref = AbstractPageScene.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AbstractPageScene.prototype._onInit = function(text, offsetY, subFragments) {
      if (offsetY == null) {
        offsetY = 0;
      }
      if (subFragments == null) {
        subFragments = [];
      }
      AbstractPageScene.__super__._onInit.call(this, text);
      this.titleText = new createjs.Text(text, '40px Arial', '#333');
      this.titleText.textAlign = 'center';
      this.titleTextMoveX = 300;
      this.titleText.x = this.titleTextMoveX;
      this.titleText.y = offsetY + 260;
      this.titleText.r = this.titleText.g = this.titleText.b = 0;
      this.titleTextArea = new createjs.Shape();
      this.titleTextArea.graphics.beginFill('#000').drawRect(-60, 0, 120, 40);
      this.titleText.hitArea = this.titleTextArea;
      this.container.addChild(this.titleText);
      app.Util.setButtonHandlers(this.manager, this.titleText, this.getFragment());
      app.Util.createButton(this.manager, this.container, subFragments, offsetY + 340);
      return this.resize(this.manager.stageWidth, this.manager.stageHeight);
    };

    AbstractPageScene.prototype._onHello = function() {
      console.log("" + (this.getFragment()) + " : Hello");
      return this.addCommand(new jpp.command.Parallel(new jpp.command.Tween(this.titleText, {
        x: 0
      }, {
        x: this.titleTextMoveX
      }, 1, jpp.util.Easing.easeOutBounce), new jpp.command.Tween(this.container, {
        alpha: 1
      }, null, 1, jpp.util.Easing.easeOutQuart)));
    };

    AbstractPageScene.prototype._onArrive = function() {
      console.log("" + (this.getFragment()) + " : Arrive");
      return this.addCommand(new jpp.command.Tween(this.titleText, {
        r: 1
      }, null, 0.5, jpp.util.Easing.easeOutQuart, null, this._applyTitleColor));
    };

    AbstractPageScene.prototype._onLeave = function() {
      console.log("" + (this.getFragment()) + " : Leave");
      return this.addCommand(new jpp.command.Tween(this.titleText, {
        r: 0
      }, null, 0.5, jpp.util.Easing.easeOutQuart, null, this._applyTitleColor));
    };

    AbstractPageScene.prototype._onBye = function() {
      console.log("" + (this.getFragment()) + " : Bye");
      return this.addCommand(new jpp.command.Parallel(new jpp.command.Tween(this.titleText, {
        x: -this.titleTextMoveX
      }, {
        x: 0
      }, 1, jpp.util.Easing.easeOutBounce), new jpp.command.Tween(this.container, {
        alpha: 0
      }, null, 1, jpp.util.Easing.easeOutQuart)));
    };

    AbstractPageScene.prototype._applyTitleColor = function() {
      return this.titleText.color = app.Util.getCssColor(this.titleText.r, this.titleText.g, this.titleText.b);
    };

    return AbstractPageScene;

  })(app.AbstractDisplayScene);

  jpp.util.Namespace('app').register('AbstractPageScene', AbstractPageScene);

}).call(this);

(function() {
  var IndexScene, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jpp.util.Namespace('app').use();

  jpp.util.Namespace('jpp.command').use();

  jpp.util.Namespace('jpp.util').use();

  IndexScene = (function(_super) {
    __extends(IndexScene, _super);

    function IndexScene() {
      this._applyTitleColor = __bind(this._applyTitleColor, this);
      this._onBye = __bind(this._onBye, this);
      this._onLeave = __bind(this._onLeave, this);
      this._onArrive = __bind(this._onArrive, this);
      this._onHello = __bind(this._onHello, this);
      this._onInit = __bind(this._onInit, this);      _ref = IndexScene.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    IndexScene.prototype._onInit = function() {
      IndexScene.__super__._onInit.call(this, 'Index');
      this.titleText = new createjs.Text('MilkpackJS with CreateJS\nPushState Example', '60px Arial', '#333');
      this.titleText.textAlign = 'center';
      this.titleText.lineHeight = 80;
      this.titleTextOffsetY = 50;
      this.titleTextMoveY = 50;
      this.titleText.y = this.titleTextOffsetY - this.titleTextMoveY;
      this.titleText.r = this.titleText.g = this.titleText.b = 0;
      this.titleTextArea = new createjs.Shape();
      this.titleTextArea.graphics.beginFill('#000').drawRect(-340, 0, 680, 150);
      this.titleText.hitArea = this.titleTextArea;
      this.container.addChild(this.titleText);
      app.Util.setButtonHandlers(this.manager, this.titleText, this.getFragment());
      app.Util.createButton(this.manager, this.container, ['/about', '/gallery'], 230);
      return this.resize(this.manager.stageWidth, this.manager.stageHeight);
    };

    IndexScene.prototype._onHello = function() {
      console.log("" + (this.getFragment()) + " : Hello");
      return this.addCommand(new jpp.command.Parallel(new jpp.command.Tween(this.titleText, {
        y: this.titleTextOffsetY
      }, null, 1, jpp.util.Easing.easeOutBounce), new jpp.command.Tween(this.container, {
        alpha: 1
      }, null, 1, jpp.util.Easing.easeOutQuart)));
    };

    IndexScene.prototype._onArrive = function() {
      console.log("" + (this.getFragment()) + " : Arrive");
      return this.addCommand(new jpp.command.Tween(this.titleText, {
        r: 1
      }, null, 0.5, jpp.util.Easing.easeOutQuart, null, this._applyTitleColor));
    };

    IndexScene.prototype._onLeave = function() {
      console.log("" + (this.getFragment()) + " : Leave");
      return this.addCommand(new jpp.command.Tween(this.titleText, {
        r: 0
      }, null, 0.5, jpp.util.Easing.easeOutQuart, null, this._applyTitleColor));
    };

    IndexScene.prototype._onBye = function() {
      console.log("" + (this.getFragment()) + " : Bye");
      return this.addCommand(new jpp.command.Parallel(new jpp.command.Tween(this.titleText, {
        y: this.titleTextOffsetY - this.titleTextMoveY
      }, null, 1, jpp.util.Easing.easeOutQuart), new jpp.command.Tween(this.container, {
        alpha: 0
      }, null, 1, jpp.util.Easing.easeOutQuart)));
    };

    IndexScene.prototype._applyTitleColor = function() {
      return this.titleText.color = app.Util.getCssColor(this.titleText.r, this.titleText.g, this.titleText.b);
    };

    return IndexScene;

  })(app.AbstractDisplayScene);

  jpp.util.Namespace('app').register('IndexScene', IndexScene);

}).call(this);

(function() {
  var PageAboutScene, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jpp.util.Namespace('app').use();

  PageAboutScene = (function(_super) {
    __extends(PageAboutScene, _super);

    function PageAboutScene() {
      this._onInit = __bind(this._onInit, this);      _ref = PageAboutScene.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PageAboutScene.prototype._onInit = function() {
      return PageAboutScene.__super__._onInit.call(this, 'About');
    };

    return PageAboutScene;

  })(app.AbstractPageScene);

  jpp.util.Namespace('app').register('PageAboutScene', PageAboutScene);

}).call(this);

(function() {
  var PageGalleryScene, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jpp.util.Namespace('app').use();

  PageGalleryScene = (function(_super) {
    __extends(PageGalleryScene, _super);

    function PageGalleryScene() {
      this._onInit = __bind(this._onInit, this);      _ref = PageGalleryScene.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PageGalleryScene.prototype._onInit = function() {
      return PageGalleryScene.__super__._onInit.call(this, 'Gallery', 0, ['/gallery/1', '/gallery/2', '/gallery/3', '/gallery/4', '/gallery/5']);
    };

    return PageGalleryScene;

  })(app.AbstractPageScene);

  jpp.util.Namespace('app').register('PageGalleryScene', PageGalleryScene);

}).call(this);

(function() {
  var PagePhotoScene, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jpp.util.Namespace('app').use();

  PagePhotoScene = (function(_super) {
    __extends(PagePhotoScene, _super);

    function PagePhotoScene() {
      this._onInit = __bind(this._onInit, this);      _ref = PagePhotoScene.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PagePhotoScene.prototype._onInit = function() {
      return PagePhotoScene.__super__._onInit.call(this, "Photo " + (this.getParams()[0]), 120);
    };

    return PagePhotoScene;

  })(app.AbstractPageScene);

  jpp.util.Namespace('app').register('PagePhotoScene', PagePhotoScene);

}).call(this);
