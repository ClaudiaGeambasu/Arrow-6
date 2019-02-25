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
    var Over = /** @class */ (function (_super) {
        __extends(Over, _super);
        // public properties
        // constructor
        function Over() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // private methods
        Over.prototype._restartButtonClick = function () {
            managers.Game.currentState = config.Scene.PLAY;
        };
        // public methods
        Over.prototype.Start = function () {
            this._space = new objects.Space();
            this._gameOverLabel = new objects.Label("Game Over", "60px", "Consolas", "#FF0000", 320, 240, true);
            this._restartButton = new objects.Button("restartButton", 320, 360, true);
            this.Main();
        };
        Over.prototype.Update = function () {
            this._space.Update();
        };
        Over.prototype.Destroy = function () {
            this.removeAllChildren();
        };
        Over.prototype.Reset = function () {
        };
        Over.prototype.Main = function () {
            // adds ocean to the stage     
            this.addChild(this._space);
            this.addChild(this._gameOverLabel);
            this.addChild(this._restartButton);
            this._restartButton.on("click", this._restartButtonClick);
            // restart the play scene    
        };
        return Over;
    }(objects.Scene));
    scenes.Over = Over;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map