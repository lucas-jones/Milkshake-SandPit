package ;

import milkshake.Milkshake;
import scenes.PongScene;
import scenes.PolygonScene;

@:expose
class SandPit
{
	static function main() { }

	public static function boot()
	{
		var milkshake = Milkshake.boot();
		//milkshake.scenes.addScene(new PongScene());
		milkshake.scenes.addScene(new PolygonScene());
	}
}