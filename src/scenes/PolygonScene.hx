package scenes;

import milkshake.assets.SpriteSheets;
import milkshake.game.scene.camera.CameraPresets;
import milkshake.game.scene.Scene;
import milkshake.utils.Color;

class PolygonScene extends Scene
{
	public function new()
	{
		super("PolygonScene", [ SpriteSheets.CHARACTERS ], CameraPresets.DEFAULT, 0x1c1c1c);
	}

	override public function create():Void
	{
		super.create();

		this.displayObject.addChild(new pixi.Strip(pixi.Texture.fromImage("character_evil.png"), 1000, 1000));
	}
}