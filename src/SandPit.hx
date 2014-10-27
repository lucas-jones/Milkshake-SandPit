package ;

import milkshake.core.DisplayObject;
import milkshake.core.Sprite;
import milkshake.game.scene.Scene;
import milkshake.math.Vector2;
import milkshake.Milkshake;

class SandPit
{
	static function main()
	{
		var milkshake = Milkshake.boot();
		milkshake.scenes.addScene(new SampleScene());
	}
}

class SampleScene extends Scene
{
	var gameObject:DisplayObject;

	public function new()
	{
		super();

		gameObject = new DisplayObject();
		var doge = new Sprite("doge.jpg");

		addNode(gameObject);
		gameObject.addNode(doge);

		gameObject.x = 1280 / 2;
		gameObject.y = 720 / 2;
		doge.anchor = Vector2.HALF;
	}

	override public function update(delta:Float):Void
	{
		super.update(delta);

		cameras.currentCamera.x++;
		gameObject.rotation += 0.01;
	}
}