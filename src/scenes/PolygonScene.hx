package scenes;

import milkshake.assets.SpriteSheets;
import milkshake.game.scene.camera.CameraPresets;
import milkshake.game.scene.Scene;
import milkshake.utils.Color;
import pixi.Strip;
import pixi.Texture;

class PolygonScene extends Scene
{
	public function new()
	{
		super("PolygonScene", [ SpriteSheets.CHARACTERS ], CameraPresets.DEFAULT, 0x1c1c1c);
	}

	override public function create():Void
	{
		super.create();

		var texture = Texture.fromImage("rock.png");
		
		// PixiJS hack to allow repeating textures...
		untyped texture.baseTexture._powerOf2 = true;

		var strip = new Strip(texture);

		strip.vertices = new js.html.Float32Array([ 0, 0,
													512, 0,
													512, 512,
													0, 512 ]);

		strip.indices = new js.html.Uint16Array([0, 1, 2, 3, 0]);

		strip.uvs = new js.html.Float32Array([ 0, 0,
											   2, 0,
											   2, 2,
											   0, 2 ]);

		displayObject.addChild(strip);
	}
}