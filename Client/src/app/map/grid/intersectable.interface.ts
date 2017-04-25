export interface Intersectable {
    x: number;
    y: number;
    width: number;
    height: number;
    id: number;
    intersects(other: Intersectable): boolean;
    clone(): Intersectable;
    draggable: boolean;
}