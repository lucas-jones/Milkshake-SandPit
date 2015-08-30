package fpsmeter;

@:native('FPSMeter')
extern class FPSMeter 
{
	public function new(options:Dynamic):Void;

	public function tickStart():Void;
	public function tick():Void;
}