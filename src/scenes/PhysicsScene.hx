package scenes;

import milkshake.assets.SpriteSheets;
import milkshake.components.phsyics.PhysicsDebug;
import milkshake.core.Sprite;
import milkshake.game.scene.camera.CameraPresets;
import milkshake.game.scene.Scene;
import milkshake.math.Vector2;
import milkshake.utils.Color;
import nape.geom.Vec2;
import nape.phys.Body;
import nape.phys.BodyType;
import nape.shape.Circle;
import nape.shape.Polygon;
import nape.shape.Shape;
import nape.space.Space;
import pixi.Texture;

class PhysicsSprie extends Sprite
{
	public var body(default, null):Body;

	public function new(texture:Texture, ?shape:Shape)
	{
		body = new Body(BodyType.DYNAMIC);
		
		if(shape != null) body.shapes.add(shape);

		super(texture);

		this.anchor = Vector2.HALF;
	}

	override function set_position(value:Vector2):Vector2
	{
		body.position.x = value.x;
		body.position.y = value.y;

		return value;
	}

	override function get_position():Vector2
	{
		return new Vector2(body.position.x, body.position.y);
	}

	override public function update(deltaTime:Float):Void
	{
		x = body.position.x;
		y = body.position.y;

		super.update(deltaTime);		
	}
}

class PhysicsScene extends Scene
{
	var space:Space;

	public function new()
	{
		super("PhysicsScene", [ SpriteSheets.PHYSICS ], CameraPresets.DEFAULT, 0x6ED7E2);

		space = new Space(new Vec2(0, 10));
	}

	override public function create():Void
	{
		super.create();

		for (i in 0...10) {
			var sprite:PhysicsSprie = new PhysicsSprie(Texture.fromFrame("elementWood000.png"), new Circle(35));
			space.bodies.add(sprite.body);

			addNode(sprite, 
			{
				position: new Vector2(Math.random() * 1280 / 2, 720 / 2 + (300 * Math.random()))
			});
		}
		

		addNode(new PhysicsDebug(space));
	}

	override public function update(deltaTime:Float):Void
	{
		super.update(deltaTime);

		space.step(1 / 24);
	}
}