package scenes;

import milkshake.assets.SpriteSheets;
import milkshake.assets.TileSheets;
import milkshake.game.scene.camera.CameraPresets;
import milkshake.game.scene.Scene;
import milkshake.game.tile.renderers.BasicTileMapRenderer;
import milkshake.game.tile.TileMap;
import milkshake.game.tile.TileMapData;
import milkshake.utils.Color;
import pixi.BaseTexture;

class PlaybackScene extends Scene
{
	var tileMapData:TileMapData;

	public function new()
	{
		super("PlaybackScene", [ SpriteSheets.CHARACTERS, TileSheets.GLADE ], CameraPresets.DEFAULT, Color.BLUE);
	}

	override public function create():Void
	{
		super.create();

		tileMapData = TileMapData.fromCSV(CompileTime.readFile("assets/tilemaps/data.csv"));

		addNode(new TileMap(tileMapData, new BasicTileMapRenderer(BaseTexture.fromImage(TileSheets.GLADE), 24)));

	}

	override public function update(delta:Float):Void
	{
		super.update(delta);
	}
}