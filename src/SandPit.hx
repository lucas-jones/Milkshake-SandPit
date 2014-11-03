package ;

import milkshake.core.DisplayObject;
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

class SampleScene extends Scene
{
	var paddleLeft:DisplayObject;
	var paddleRight:DisplayObject;

	var ball:DisplayObject;
	var ballX:Float;
	var ballY:Float;

	public function new()
	{
		super("SampleScene", CameraPresets.DEFAULT, Color.BLACK);

		//gameObject = new DisplayObject();
		addNode(paddleLeft = GraphicsHelper.generateRectangle(30, 300, Color.WHITE), 
		{
			x: 20
		});

		addNode(paddleRight = GraphicsHelper.generateRectangle(30, 300, Color.WHITE), 
		{
			// WishList:
			// x: width - 20
			// scale.x: 2
			x: Globals.SCREEN_WIDTH - 50
		});

		addNode(ball = GraphicsHelper.generateRectangle(30, 30, Color.WHITE), 
		{
			anchor: Vector2.HALF,
			position: Globals.SCREEN_CENTER
		});

		ballX = 3;
		ballY = 3;
	}

	override public function update(delta:Float):Void
	{
		super.update(delta);

		paddleLeft.y = MathHelper.clamp(Milkshake.getInstance().mousePosition.y, 20, 400);
		paddleRight.y = MathHelper.clamp(ball.y - 150, 20, 400);

		ball.x += ballX;
		ball.y += ballY;
		
		if(ball.y > Globals.SCREEN_HEIGHT || ball.y < 0) ballY *= -1;
		if(ball.x > Globals.SCREEN_WIDTH || ball.x < 0) ballX *= -1;

		// for(camera in cameras.cameras)
		// {
		// 	camera.targetPosition = ball.position;
		// }
	}
}