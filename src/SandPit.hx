package ;

import milkshake.Milkshake;
import milkshake.utils.Globals;
import scenes.PlaybackScene;

@:expose
class SandPit
{
	static function main()
	{
		var milkshake = Milkshake.boot(new Settings(Globals.SCREEN_WIDTH, Globals.SCREEN_HEIGHT));

		milkshake.scenes.addScene(new scenes.DinoScene());
	}
}