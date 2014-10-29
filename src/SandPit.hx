package ;

import milkshake.core.DisplayObject;
import milkshake.core.Sprite;
import milkshake.game.scene.camera.Camera;
import milkshake.game.scene.camera.CameraPresets;
import milkshake.game.scene.Scene;
import milkshake.math.Vector2;
import milkshake.Milkshake;

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
	var gameObject:DisplayObject;
	var doge:Sprite;

	public function new()
	{
		super("SampleScene", CameraPresets.SPLIT_FOUR);


		doge = new Sprite("doge.jpg");
		gameObject = new DisplayObject();
		
		gameObject.addNode(doge);
		addNode(gameObject);

		//gameObject.x = 1280 / 2;
		// gameObject.y = 720 / 2;
		//doge.anchor = Vector2.HALF;
		doge.width = 1280;
		doge.height = 720;
	}

	override public function update(delta:Float):Void
	{
		trace("Update");
		super.update(delta);

		//scene.cameras.currentCamera.x++;
		gameObject.rotation += 0.01;
	}
}