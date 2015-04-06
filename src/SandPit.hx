package ;

import milkshake.Milkshake;
import scenes.PlaybackScene;

@:expose
class SandPit
{
	static function main()
	{
		var milkshake = Milkshake.boot();

		milkshake.scenes.addScene(new PlaybackScene());
	}
}