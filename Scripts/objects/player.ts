module objects {
  export class Player extends objects.AbstractGameObject {
    // private instance variables
    //private _shootOrigin: math.Vec2;

    // constructors
    constructor() {
      super("player");
      this.Start();
    }

    // public methods
    public Start(): void {
      this.regX = this.HalfWidth;
      this.regY = this.HalfHeight;

      this.x = 1024; //la posicion donde va a comenzar el avion como era de arriba hacia abajo 0 es arriba y 435 es pegado a abajo, menos la altura del avion
      this.y = 250; //kiero k el avion comienze en el medio de mi eje y
      //this._shootOrigin = new math.Vec2();
    }

    public Update(): void {
      this.Move();
      // checking the bottom boundary
      if (this.y >= 600 - this.HalfHeight) {
        //it is not responsive.If I want to fo that i should add a configuration file
        this.y = 600 - this.HalfHeight;
      }

      // checking the top boundary
      if (this.y <= this.HalfHeight) {
        this.y = this.HalfHeight;
      }

      // Check right boundary
      if (this.x >= 1024 - this.HalfWidth) {
        this.x = 1024 - this.HalfWidth;
      }

      // Check left boundary
      if (this.x <= this.HalfWidth) {
        this.x = this.HalfWidth;
      }
      managers.Game.xPlayer = this.x;
      managers.Game.yPlayer = this.y;
      this.ShootFire();
    }
    public Move(): void {
      if (managers.Game.keyboardManager.moveForward) {
        this.y -= 4;
        managers.Game.goingLeft = false;
        managers.Game.goingRigth = false;
        managers.Game.goingUp = true;
        managers.Game.goingDown = false;
      }
      if (managers.Game.keyboardManager.moveBackward) {
        this.y += 4;
        managers.Game.goingLeft = false;
        managers.Game.goingRigth = false;
        managers.Game.goingUp = false;
        managers.Game.goingDown = true;
      }
      if (managers.Game.keyboardManager.moveLeft) {
        this.x -= 4;
        managers.Game.goingLeft = true;
        managers.Game.goingRigth = false;
        managers.Game.goingUp = false;
        managers.Game.goingDown = false;
      }
      if (managers.Game.keyboardManager.moveRight) {
        this.x += 4;
        managers.Game.goingLeft = false;
        managers.Game.goingRigth = true;
        managers.Game.goingUp = false;
        managers.Game.goingDown = false;
      }
      this.Gravity();
    }

    public Gravity(): void {
      if (managers.Game.goingLeft) {
        this.x -= 2;
      }
      if (managers.Game.goingRigth) {
        this.x += 2;
      }
      if (managers.Game.goingUp) {
        this.y -= 2;
      }
      if (managers.Game.goingDown) {
        this.y += 2;
      }
    }

    public Reset(): void {}

    public Destroy(): void {}

    public ShootFire(): void {
      if ((this.alpha = 1)) {
        //esto significa k estoy alive
        let ticker: number = createjs.Ticker.getTicks();
        if (managers.Game.keyboardManager.shoot && ticker % 10 == 0) {
          //how many frames when i fire my ticker
          //this._shootOrigin = new math.Vec2(this.x, this.y -this.Height-2)
          let currentshot = managers.Game.shootManager.CurrentShoot; //call a shoot into being
          let shoot = managers.Game.shootManager.Shoots[currentshot];

          if (managers.Game.goingLeft) {
            if (managers.Game.shootManager.swi == 0) {
              shoot.y = this.y - 40;
              managers.Game.shootManager.swi = 1;
            } else {
              shoot.y = this.y + 35;
              managers.Game.shootManager.swi = 0;
            }
            shoot.x = this.x - 10;
          }
          if (managers.Game.goingRigth) {
            if (managers.Game.shootManager.swi == 0) {
              shoot.y = this.y - 40;
              managers.Game.shootManager.swi = 1;
            } else {
              shoot.y = this.y + 35;
              managers.Game.shootManager.swi = 0;
            }
            shoot.x = this.x + 10;
          }

          if (managers.Game.goingDown) {
            if (managers.Game.shootManager.swi == 0) {
              shoot.x = this.x - 35;
              managers.Game.shootManager.swi = 1;
            } else {
              shoot.x = this.x + 35;
              managers.Game.shootManager.swi = 0;
            }
            shoot.y = this.y - 10;
          }
          if (managers.Game.goingUp) {
            if (managers.Game.shootManager.swi == 0) {
              shoot.x = this.x - 35;
              managers.Game.shootManager.swi = 1;
            } else {
              shoot.x = this.x + 35;
              managers.Game.shootManager.swi = 0;
            }
            shoot.y = this.y - 10;
          }
          createjs.Sound.play("shootSound");

          managers.Game.shootManager.CurrentShoot++;
          if (managers.Game.shootManager.CurrentShoot > 49) {
            managers.Game.shootManager.CurrentShoot = 0;
          }
        }
      }
    }
  }
}
