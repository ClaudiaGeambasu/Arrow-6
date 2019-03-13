var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // constructor
        function Play() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // public methods
        Play.prototype.Start = function () {
            this._meteorNum = 3;
            // Instantiates a new Array container of Type objects.meteor
            this._meteor = new Array();
            // Fill the meteor Array with meteors
            for (var count = 0; count < this._meteorNum; count++) {
                this._meteor[count] = new objects.Meteor();
            }
            this._engineSound = createjs.Sound.play("gameSound"); //lo pongo akip ara que comience en cuanto comience la scence
            this._engineSound.loop = -1; //play forever
            this._engineSound.volume = 0.1;
            //create the score board UI for the scene
            this._scoreBoard = new managers.ScoreBoard();
            managers.Game.scoreBoard = this._scoreBoard;
            this._shotManager = new managers.Shoot();
            managers.Game.shootManager = this._shotManager;
            this.Main();
        };
        //triggered every frame
        Play.prototype.Update = function () {
            this._space.Update();
            this._player.Update();
            this._enemy.Update();
            this._shotManager.Update();
            //check collision between arrow and island
            managers.Collision.Check(this._player, this._enemy);
            // Update Each meteor in the Meteor Array
            for (var _i = 0, _a = this._meteor; _i < _a.length; _i++) {
                var meteor = _a[_i];
                meteor.Update();
                //check collision between arrow and meteor
                managers.Collision.Check(this._player, meteor); //check collision between the arrow and the meteor
            }
            for (var _b = 0, _c = this._shotManager.Shoots; _b < _c.length; _b++) {
                var shoot = _c[_b];
                //  shoot.Update();
                managers.Collision.Check(this._enemy, shoot);
                //console.log("estoy aki");
            }
            //if lives fall below zero switch scenes to the game over scene
            if (this._scoreBoard.Lives <= 0) {
                this._engineSound.stop(); //sino me sigue sonando the app
                managers.Game.currentState = config.Scene.OVER;
            }
        };
        Play.prototype.Destroy = function () {
            this.removeAllChildren();
        };
        Play.prototype.Reset = function () {
        };
        Play.prototype.Main = function () {
            var _this = this;
            // adds space to the scene
            this._space = new objects.Space();
            this.addChild(this._space);
            // adds enemy to the scene
            this._enemy = new objects.Enemy();
            this.addChild(this._enemy);
            // adds player to the scene
            this._player = new objects.Player();
            this.addChild(this._player);
            this._shotManager.Shoots.forEach(function (shoot) {
                _this.addChild(shoot);
            });
            // adds Each meteor in the meteor Array to the Scene
            /*for (const meteor of this._meteor) {
                this.addChild(meteor);*/
            this._meteor.forEach(function (meteor) {
                _this.addChild(meteor);
            });
            //add scoreboard labels to the scene
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map