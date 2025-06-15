export class Vector2 {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector2): Vector2 {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  subtract(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  manhattanDistance(other: Vector2): number {
    return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vector2 {
    const length = this.magnitude();
    if (length === 0) {
      return new Vector2(0, 0);
    }
    return new Vector2(Math.floor(this.x / length), Math.floor(this.y / length));
  }

  toString() {
    return `${this.x},${this.y}`
  }

  static readonly LEFT = new Vector2(-1, 0);
  static readonly RIGHT = new Vector2(1, 0);
  static readonly UP = new Vector2(0, -1);
  static readonly DOWN = new Vector2(0, 1);
  static readonly ZERO = new Vector2(0, 0)

  getInputForDirection(): 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | undefined {
    const normalizedVector = this.normalize();
    const key = normalizedVector.toString();

    switch (key) {
      case Vector2.UP.toString():
        return 'UP';
      case Vector2.DOWN.toString():
        return 'DOWN';
      case Vector2.LEFT.toString():
        return 'LEFT';
      case Vector2.RIGHT.toString():
        return 'RIGHT';
      default:
        return undefined;
    }
  }
}