package scenes;

import milkshake.assets.SpriteSheets;
import milkshake.assets.TileSheets;
import milkshake.core.Graphics;
import milkshake.game.scene.camera.Camera;
import milkshake.game.scene.camera.CameraPresets;
import milkshake.game.scene.Scene;
import milkshake.game.tile.renderers.BasicTileMapRenderer;
import milkshake.game.tile.TileMap;
import milkshake.game.tile.TileMapData;
import milkshake.Milkshake;
import milkshake.utils.Color;
import milkshake.utils.GraphicsHelper;
import pixi.BaseTexture;

class PlaybackScene extends Scene
{
	var tileMapData:TileMapData;
	var graphics:Graphics;

	public function new()
	{
		super("PlaybackScene", [ SpriteSheets.CHARACTERS, TileSheets.GLADE ], CameraPresets.DEFAULT, Color.BLUE);
	}

	override public function create():Void
	{
		super.create();

		tileMapData = TileMapData.fromCSV(CompileTime.readFile("assets/tilemaps/data.csv"));

		addNode(new TileMap(tileMapData, new BasicTileMapRenderer(BaseTexture.fromImage(TileSheets.GLADE), 24)));
		addNode(graphics = new Graphics());
	}

	override public function update(delta:Float):Void
	{
		super.update(delta);

		var camera = this.cameras.activeCameras[0];

		camera.targetZoom = 1;//(Milkshake.getInstance().mousePosition.y / 720) + 0.5;

		camera.targetPosition.x = (Milkshake.getInstance().mousePosition.x);
		camera.targetPosition.y = (Milkshake.getInstance().mousePosition.y);
	}

	override public function render(camera:Camera):Void
	{
		super.render(camera);

		graphics.graphics.clear();
		graphics.graphics.beginFill(0xFF0000, 0.5);
		graphics.graphics.drawRect(camera.boundingBox.x, camera.boundingBox.y, camera.boundingBox.width, camera.boundingBox.height);
	}
}