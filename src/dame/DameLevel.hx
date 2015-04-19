package dame;

import dame.layers.DameLayer;
import dame.entitys.DameSprite;
import dame.layers.DameSpriteLayer;

using Reflect;

class DameLevel
{
	public static inline var BACKGROUND_SPRITES:String = "Background_Sprites";
	public static inline var FOREGROUND_SPRITES:String = "Foreground_Sprites";

	public var backgroundColor(default, null):Int;
	public var backgroundSprites(default, null):Array<DameSprite>;
	public var foregroundSprites(default, null):Array<DameSprite>;

	public function new(levelObject:Dynamic)
	{
		var level:Dynamic = levelObject.level;

		backgroundColor = level.bgColor;

		var layers:Array<DameLayer> = cast level.layers;

		for(layerIndex in level.layer.fields()) {
			var layer:DameLayer = level.layer.field(layerIndex);

			trace(layer);

			if(layer.name == BACKGROUND_SPRITES) {
				var spriteLayer:DameSpriteLayer = cast layer;
				backgroundSprites = cast toArray(spriteLayer.sprite);
			}

			if(layer.name == FOREGROUND_SPRITES) {
				var spriteLayer:DameSpriteLayer = cast layer;
				foregroundSprites = cast toArray(spriteLayer.sprite);
			}
		}
	}

	function toArray(object:Dynamic):Array<Dynamic>
	{
		return Std.is(object, Array) ? object : [ object ];
	}
}