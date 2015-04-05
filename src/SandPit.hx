package ;

import milkshake.Milkshake;
import scenes.PlaybackScene;
import scenes.PolygonScene;
import scenes.TestScene;

@:expose
class SandPit
{
	static function main() { }

	public static function boot()
	{
		var milkshake = Milkshake.boot();
		//milkshake.scenes.addScene(new PongScene());
		milkshake.scenes.addScene(new PlaybackScene());
	}
}