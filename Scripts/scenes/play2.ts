module scenes {
  export class Play2 extends objects.Scene {
    // private instance variable
    private _player: objects.Player;
    private _space: objects.Space;
    private _enemy: objects.Enemy[];
    private _numero: number;
    private _bigmeteorNum: number;
    private _meteor: objects.Meteor[];
    private _smallmeteor: objects.SmallMeteor[];
    private _brouncerock: objects.BrounceRock[];
    private _bigmeteor: objects.BigMeteor[];
    private _scoreBoard: managers.ScoreBoard;
    private _engineSound: createjs.AbstractSoundInstance;
    private _shotManager: managers.Shoot;
    private _redenemy: objects.RedEnemy;
    private _sonEnemy: objects.SonEnemy;

    // constructor
    constructor() {
      super();
      //this._getSleep(2000);
    
      this.Start();
     
    }

    // public methods

    public Start(): void {
      this._numero = 3;
      this._bigmeteorNum = 3;
      this._space = new objects.Space();
      this._scoreBoard = new managers.ScoreBoard;
      this._player = new objects.Player();
      this._redenemy= new objects.RedEnemy();
      managers.Game.player = this._player;
      this._sonEnemy= new objects.SonEnemy();

      this._enemy = new Array<objects.Enemy>();
      for (let count = 0; count < this._numero; count++) {
        this._enemy[count] = new objects.Enemy();
      }
      this._bigmeteor = new Array<objects.BigMeteor>();
      for (let count = 0; count < this._bigmeteorNum; count++) {
        this._bigmeteor[count] = new objects.BigMeteor();
      }
      this._smallmeteor = new Array<objects.SmallMeteor>();
      for (let count = 0; count < this._numero; count++) {
        this._smallmeteor[count] = new objects.SmallMeteor();
      }

      this._meteor = new Array<objects.Meteor>();
      for (let count = 0; count < this._numero; count++) {
        this._meteor[count] = new objects.Meteor();
      }

      this._brouncerock = new Array<objects.BrounceRock>();
      for (let count = 0; count < this._numero; count++) {
        this._brouncerock[count] = new objects.BrounceRock();
      }

      this._engineSound = createjs.Sound.play("gameSound");
      this._engineSound.loop = -1;
      this._engineSound.volume = 0.1;

      //create the score board UI for the scene
     /* this._scoreBoard = new managers.ScoreBoard();
      managers.Game.scoreBoard = this._scoreBoard;*/

      this._shotManager = new managers.Shoot();
      managers.Game.shootManager = this._shotManager;
      this.Main();
    }

    public Update(): void {
      this._space.Update();
      this._player.Update();
      this._shotManager.Update();
      this._redenemy.Update();
      this._sonEnemy.Update();
    
      managers.Collision.Check(this._player, this._sonEnemy);

      for (const enemy of this._enemy) {
        enemy.Update();
        managers.Collision.Check(this._player, enemy);

      }

      for (const bigmeteor of this._bigmeteor) {
        bigmeteor.Update();
        managers.Collision.Check(this._player, bigmeteor);
      }
      for (const smallmeteor of this._smallmeteor) {
        smallmeteor.Update();
        managers.Collision.Check(this._player, smallmeteor);
      }

      for (const brouncerock of this._brouncerock) {
        brouncerock.Update();
        managers.Collision.Check(this._player, brouncerock);
      }

      // Update Each meteor in the Meteor Array
      for (const meteor of this._meteor) {
        meteor.Update();
        managers.Collision.Check(this._player, meteor);
      }
      this._shotManager.Update();

      this._shotManager.Shoots.forEach(bullet => {
        this._enemy.forEach(enemy => {
          managers.Collision.Check(bullet, enemy);

        });

      });
      //////**********RULES -LEVEL1- RULES -LEVEL1- RULES -LEVEL1- RULES -LEVEL1- RULES***************////////

      //if lives fall below zero switch scenes to the game over scene
      if (this._scoreBoard.Lives <= 0) {
        this._engineSound.stop();      
        managers.Game.currentState = config.Scene.OVER;
      }
   
      if ((this._scoreBoard.Score >= 2000) && (this._scoreBoard.Lives >= 0)) {
        this._engineSound.stop();
        managers.Game.currentState = config.Scene.START3;
        managers.Game.scoreBoard.Level +=1;
      }
      // right
      if (managers.Game.goingRigth) {
        this._player.rotation = 180;
      }
      // left
      if (managers.Game.goingLeft) {
        this._player.rotation = 0;
      }
      // down
      if (managers.Game.goingDown) {
        this._player.rotation = 270;
      }
      // Up
      if (managers.Game.goingUp) {
        this._player.rotation = 90;
      }
    }


    public Destroy(): void {
      this.removeAllChildren();
    }

    public Reset(): void { }

    public Main(): void {
      this.addChild(this._space);
      this.addChild(this._player);
      this.addChild(this._redenemy);
      this.addChild(this._sonEnemy);

      createjs.Tween.get(this._player, { loop: 0 }).to(
        { x: 800, y: 300 },
        1000
      );
      this.addChild(this._player.planeflash);
      for (const enemy of this._enemy) {
        this.addChild(enemy);
      }

      this._shotManager.Shoots.forEach(shoot => {
        this.addChild(shoot);
      });

      for (const bigmeteor of this._bigmeteor) {
        this.addChild(bigmeteor);
      }
      for (const smallmeteor of this._smallmeteor) {
        this.addChild(smallmeteor);
      }

      for (const brouncerock of this._brouncerock) {
        this.addChild(brouncerock);
      }
      this._meteor.forEach(meteor => {
        this.addChild(meteor);
      });

      //add scoreboard labels to the scene
      this.addChild(this._scoreBoard.LivesLabel);
      this.addChild(this._scoreBoard.ScoreLabel);
      this.addChild(this._scoreBoard.LevelLabel);
    }

    private _getSleep(delay):void {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
      
    }
  }
}