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
		var milkshake:Milkshake = Milkshake.boot();
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

		//gameObject.x = 100;
		//gameObject.y = 100;
		gameObject.scale = Vector2.HALF;
		doge.anchor = Vector2.HALF;
		doge.rotation = -1;
	}
}