package scenes;

import dame.DameLevel;
import haxe.Json;
import milkshake.assets.SpriteSheets;
import milkshake.assets.TileSheets;
import milkshake.core.Graphics;
import milkshake.core.Sprite;
import milkshake.game.scene.camera.Camera;
import milkshake.game.scene.camera.CameraPresets;
import milkshake.game.scene.Scene;
import milkshake.game.tile.renderers.BasicTileMapRenderer;
import milkshake.game.tile.renderers.BoltTileMapRenderer;
import milkshake.game.tile.renderers.FastTileMapRenderer;
import milkshake.game.tile.TileMap;
import milkshake.game.tile.TileMapCollision;
import milkshake.game.tile.TileMapData;
import milkshake.math.Vector2;
import milkshake.Milkshake;
import milkshake.utils.Color;
import milkshake.utils.Globals;
import milkshake.utils.GraphicsHelper;
import pixi.BaseTexture;

class PlaybackScene extends Scene
{
	var tileMapData:TileMapData;
	var breakableTiles:TileMapData;

	var graphics:Graphics;

	public function new()
	{
		var json = Json.parse(CompileTime.readFile("assets/levels/level.json"));
		var level = new DameLevel(json);

		var sprites = level.backgroundSprites.map(function(sprite)
		{
			return "assets/sprites/" + sprite.name + ".png";
		});

		super("PlaybackScene", [ TileSheets.GLADE ].concat(sprites), CameraPresets.DEFAULT, Color.BLUE);
	}

	override public function create():Void
	{
		super.create();

		var json = Json.parse(CompileTime.readFile("assets/levels/level.json"));
		var level = new DameLevel(json);

		for(spriteEntry in level.backgroundSprites)
		{
			var sprite = Sprite.fromUrl("assets/sprites/" + spriteEntry.name + ".png");

			sprite.x = spriteEntry.x;
			sprite.y = spriteEntry.y;
			sprite.scale.x = spriteEntry.xScale;
			sprite.scale.y = spriteEntry.yScale;

			if(spriteEntry.flip == "true")
			{
				sprite.displayObject.scale.x = -1;
				//sprite.x += sprite.width * Math.abs(sprite.scale.x);
				//sprite.scale.x *= -1;

			}

			addNode(sprite);
		}

		tileMapData = TileMapData.fromCSV(CompileTime.readFile("assets/tilemaps/data.csv"));
		//tileMapData.replaceBulk([ 41, 42, 43 ], 40); // Replace grassy platforms
		//tileMapData.replaceBulk([ 33, 34, 35 ], 32); // Replace purple block decals
		//var breakableTileMapData = tileMapData.cut([ 7 ]);

		breakableTiles = tileMapData.cut([ 7 ]);

		addNode(new TileMap(tileMapData, new BoltTileMapRenderer(BaseTexture.fromImage(TileSheets.GLADE), 24, true, false)));
		addNode(new TileMap(breakableTiles, new FastTileMapRenderer(BaseTexture.fromImage(TileSheets.GLADE), 24, Globals.SCREEN_WIDTH, Globals.SCREEN_HEIGHT)));
		//addNode(new TileMapCollision(tileMapData, 24));

		addNode(graphics = new Graphics());


	}

	override public function update(delta:Float):Void
	{
		super.update(delta);

		//cameras.activeCameras[0].targetPosition.y = 2000;//(0.5 * delta);
		//cameras.activeCameras[0].targetPosition.y += 5;
	}

	override public function render(camera:Camera):Void
	{
		super.render(camera);

		graphics.clear();
		graphics.begin(0xFF0000, 0.5);

		var mousePosition = new Vector2(Math.floor(Milkshake.getInstance().mousePosition.x / 24) * 24, Math.floor(Milkshake.getInstance().mousePosition.y / 24) * 24);

		var tileX:Int = Std.int(mousePosition.x / 24);
		var tileY:Int = Std.int(mousePosition.y / 24);

		if(tileX > 0 && tileX < breakableTiles.width)
		{
			if(tileY > 0 && tileY < breakableTiles.height)
			{
				if(breakableTiles.data[tileY][tileX] != null && breakableTiles.data[tileY][tileX] > 0)
				{
					breakableTiles.data[tileY][tileX] = 0;
					Console.log("Hello!" + breakableTiles.data[tileY][tileX]);
				}
			}
		}
		


		


		graphics.graphics.drawRect(mousePosition.x, mousePosition.y, 24, 24);
	}
}