package ;

import hxcollision.Collision;
import hxcollision.shapes.Polygon;
import hxcollision.shapes.Shape;
import milkshake.core.DisplayObject;
import milkshake.core.Graphics;
import milkshake.core.Sprite;
import milkshake.game.scene.camera.Camera;
import milkshake.game.scene.camera.CameraPresets;
import milkshake.game.scene.Scene;
import milkshake.math.Vector2;
import milkshake.Milkshake;
import milkshake.utils.Color;
import milkshake.utils.Globals;
import milkshake.utils.GraphicsHelper;
import milkshake.utils.MathHelper;

@:expose
class SandPit
{
	static function main() { }

	public static function boot()
	{
		var milkshake = Milkshake.boot();
		milkshake.scenes.addScene(new SampleScene());
	}
}

class SimpleCollisionObject extends DisplayObject
{
	public var shape(default, null):Shape;

	public function new(width:Int, height:Int, color:Int = Color.WHITE)
	{
		super();

		addNode(GraphicsHelper.generateRectangle(width, height, color));
		shape = Polygon.rectangle(0, 0, width, height, false);
	}

	override public function update(detla:Float):Void
	{
		shape.x = x;
		shape.y = y;

		super.update(detla);
	}
}

class SampleScene extends Scene
{
	public static inline var PADDLE_WIDTH:Int = 30;
	public static inline var PADDLE_HEIGHT:Int = 200;

	public static inline var BALL_SIZE:Int = 10;
	public static inline var BALL_SPEED:Int = 7;

	var paddleLeft:SimpleCollisionObject;
	var paddleRight:SimpleCollisionObject;
	var ball:SimpleCollisionObject;

	var ballVelocity:Vector2;

	public function new()
	{
		super("SampleScene", CameraPresets.DEFAULT, Color.BLACK);

		addNode(paddleLeft = new SimpleCollisionObject(PADDLE_WIDTH, PADDLE_HEIGHT),
		{
			x: 30
		});

		addNode(paddleRight = new SimpleCollisionObject(PADDLE_WIDTH, PADDLE_HEIGHT),
		{
			x: Globals.SCREEN_WIDTH - 30 - paddleRight.width
		});
		
		addNode(ball = new SimpleCollisionObject(BALL_SIZE, BALL_SIZE), 
		{
			position: Globals.SCREEN_CENTER
		});

		resetBall();
	}

	function resetBall()
	{
		ballVelocity = Vector2.EQUAL(BALL_SPEED);
		ball.position = Globals.SCREEN_CENTER;
	}

	override public function update(delta:Float):Void
	{
		super.update(delta);

		// Ball vs Paddle Collision
		for(result in Collision.testShapes(ball.shape, [ paddleLeft.shape, paddleRight.shape ]))
		{
			ball.x += result.separation.x;
			ball.y += result.separation.y;

			ballVelocity.multi(Vector2.EQUAL(1.1));
			ballVelocity.x *= -1;
		}

		// Paddle Movement
		paddleLeft.y = MathHelper.clamp(Milkshake.getInstance().mousePosition.y, 0, Globals.SCREEN_HEIGHT - paddleLeft.height);
		paddleRight.y = MathHelper.clamp(ball.y - paddleLeft.height / 2, 0, Globals.SCREEN_HEIGHT - paddleLeft.height);

		// Ball Velocity
		ball.position.add(ballVelocity);
		
		// Bounce off Top & Bottom
		if(ball.y < 0 || ball.y + ball.height > Globals.SCREEN_HEIGHT) ballVelocity.y *= -1;

		// Ensure ball is always clamped to screen height
		ball.y = MathHelper.clamp(ball.y, 0, Globals.SCREEN_HEIGHT - ball.height);		

		if(ball.x > Globals.SCREEN_WIDTH || ball.x < 0) resetBall();
	}
}