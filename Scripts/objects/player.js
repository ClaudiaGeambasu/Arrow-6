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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // private instance variables
        // constructors
        function Player() {
            var _this = _super.call(this, "plane") || this;
            _this.Start();
            return _this;
        }
        // public methods
        Player.prototype.Start = function () {
            this.regX = this.HalfWidth;
            this.regY = this.HalfHeight;
            this.x = 680; //la posicion donde va a comenzar el avion como era de arriba hacia abajo 0 es arriba y 435 es pegado a abajo, menos la altura del avion
            this.y = 250; //kiero k el avion comienze en el medio de mi eje y
        };
        Player.prototype.Update = function () {
            this.Move();
            // checking the bottom boundary
            if (this.y >= 650 - this.HalfWidth) { //it is not responsive.If I want to fo that i should add a configuration file
                this.y = 650 - this.HalfWidth;
            }
            // checking the top boundary
            if (this.y <= this.HalfWidth) {
                this.y = this.HalfWidth;
            }
        };
        Player.prototype.Move = function () {
            //mouse control
            //this.y = managers.Game.stage.mouseY;//where the y-coordinate of my plane is gonna be on my x-coordinate.
            //My plane is not allowed go right left with my mouse
            //keyboard control
            if (managers.Game.keyboardManager.moveForward) {
                this.y -= 5;
            }
            if (managers.Game.keyboardManager.moveBackward) {
                this.y += 5;
            }
        };
        Player.prototype.Reset = function () {
        };
        Player.prototype.Destroy = function () {
        };
        return Player;
    }(objects.AbstractGameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map