package ;

import milkshake.game.scene.Scene;
import milkshake.Milkshake;

class SandPit 
{
	static function main() 
	{
		var milkshake:Milkshake = Milkshake.boot();

		milkshake.onCreated = function()
		{
			milkshake.scenes.addScene(new SampleScene());
		}
		
		trace("Milkshake");
		trace(milkshake);
	}
}

class SampleScene extends Scene
{
	public function new()
	{
		super();
	}
}