package scenes;

import milkshake.core.Text;
import milkshake.game.scene.camera.CameraPresets;
import milkshake.game.scene.Scene;
import milkshake.utils.Color;
import pixi.BaseTexture;
import pixi.Pixi;
import pixi.RenderTexture;
import pixi.Sprite;
import pixi.Texture;

using milkshake.utils.TweenUtils;

class MemoryTestScene extends Scene
{
	var debugText:Text;

	public function new()
	{
		super("MemoryTestScene", [ ], CameraPresets.DEFAULT, Color.BLUE);
	}

	override public function create():Void
	{
		super.create();

		addNode(debugText = new Text(),
		{
			x: 10,
			y: 10
		});
	}

	override public function update(deltaTime:Float):Void
	{
		super.update(deltaTime);
		
		generateTexture();
		generateTexture();
		generateTexture();
		generateTexture();
		generateTexture();

		debugText.setText(calculateMemoryUsage() + "m");
	}

	function generateTexture():Void
	{
		Texture.fromImage("assets/sprites/log_underwater.png?p=" + Reflect.fields(Pixi.TextureCache).length);
	}

	private function calculateMemoryUsage():Int
	{
		var totalSize:Float = 0;

		for(key in Reflect.fields(Pixi.TextureCache))
		{
			var texture:BaseTexture = Reflect.field(Pixi.TextureCache, key);

			totalSize += texture.width * texture.height;
		}

		return Math.round(totalSize / 1000000);
	}
}