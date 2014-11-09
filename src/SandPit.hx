package ;

import milkshake.components.assets.SpriteSheets;
import milkshake.Milkshake;
import scenes.PongScene;

@:expose
class SandPit
{
	static function main() { }

	public static function boot()
	{
		var milkshake = Milkshake.boot();
		milkshake.scenes.addScene(new PongScene());
	}
}