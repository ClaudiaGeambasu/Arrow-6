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
var objects;
(function (objects) {
    var SonEnemy = /** @class */ (function (_super) {
        __extends(SonEnemy, _super);
        // public properties
        // constructor
        function SonEnemy() {
            var _this = _super.call(this, "sonenemy") || this;
            _this._GoReverse = false;
            _this.Start();
            return _this;
        }
        // private methods
        SonEnemy.prototype._move = function () {
            if (!this._GoReverse) {
                this.x += 3;
            }
            else {
                this.x -= 3;
            }
        };
        SonEnemy.prototype._checkBounds = function () {
            if (this.y >= managers.Game.yPlayer) {
                this.y -= 3;
            }
            else {
                this.y += 3;
            }
            if (this.x >= managers.Game.xPlayer) {
                this._GoReverse = true;
            }
            else {
                this._GoReverse = false;
            }
            if (this.x > 1024 + this.Width) {
                this.Reset();
            }
        };
        // public methods
        SonEnemy.prototype.Reset = function () {
            this.x = -100;
            this.y = 250;
        };
        SonEnemy.prototype.Start = function () {
            this._horizontalSpeed = 4;
            this.Reset();
        };
        SonEnemy.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        SonEnemy.prototype.Destroy = function () { };
        return SonEnemy;
    }(objects.AbstractGameObject));
    objects.SonEnemy = SonEnemy;
})(objects || (objects = {}));
//# sourceMappingURL=sonEnemy.js.map