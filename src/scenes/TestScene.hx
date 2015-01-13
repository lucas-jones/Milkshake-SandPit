package scenes;

import milkshake.assets.SpriteSheets;
import milkshake.core.Sprite;
import milkshake.game.scene.camera.CameraPresets;
import milkshake.game.scene.Scene;
import milkshake.math.Vector2;
import milkshake.utils.Color;
import milkshake.utils.Globals;
import motion.easing.Elastic;
import pixi.Strip;
import pixi.Texture;

using milkshake.utils.TweenUtils;

class TestScene extends Scene
{
	var world:Sprite;

	public function new()
	{
		super("TestScene", [ "assets/images/dino/stars.png" ], CameraPresets.DEFAULT, Color.BLUE);
	}

	override public function create():Void
	{
		super.create();

		addNode(new Sprite(Texture.fromImage("assets/images/dino/stars.png")));

		addNode(new Sprite(Texture.fromImage("assets/images/dino/logo.png")),
		{
			anchor: Vector2.HALF,
			position: new Vector2(Globals.SCREEN_CENTER.x, 140)
		});

		addNode(world = new Sprite(Texture.fromImage("assets/images/dino/world.png")),
		{
			anchor: Vector2.HALF,
			position: new Vector2(Globals.SCREEN_CENTER.x, Globals.SCREEN_HEIGHT + 200),
			scale: Vector2.EQUAL(0.8)
		});
		
		world.tweenFrom(2, { y: Globals.SCREEN_HEIGHT * 2 });
	}

	override public function update(deltaTime:Float):Void
	{
		super.update(deltaTime);

		world.rotation += 0.004 * deltaTime;
	}
}