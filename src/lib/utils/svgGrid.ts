export const svgGrid = (array: Array<any>, size: number, dimension: number = 0,  scale: number = 1): string => {
  // If the dimension would be greater than the amount of available images, or if the dimension is negative, make it zero
  // Otherwise, just round to the nearest whole number
  dimension = (Math.pow(dimension, 2) > array.length || dimension < 0) ? 0 : Math.round(dimension);
  while (true) {
    // Make sure the amount of items in the array is a perfect square, e.g. 4, 9, 16
    // If dimension isn't 0, use that, otherwise derive from the amount of items currently in the array
    if (Number.isInteger(dimension || Math.sqrt(array.length))) break
    array.pop()
  }
  // If dimension isn't 0, then derive it from the array length
  dimension = dimension || Math.sqrt(array.length); // e.g. 2
  const tileSize = size / dimension; // e.g. 1024 / 2 = 512 
  const gridArray = array.map((image: string, i) => ({
    "href": image,
    "x": (Math.floor(i / dimension) * tileSize) + (tileSize * ((1 - scale) / 2)),
    "y": ((i % dimension) * tileSize) + (tileSize * ((1 - scale) / 2)),
    "width": tileSize * scale,
    "height": tileSize * scale,
    "preserveAspectRatio": "xMidYMid keep" // keep makes it so that extra width/height doesn't get cut off
  }));

  // Below takes the array and converts it into image objects for the SVG
  function toHtmlAttributes(attributes: Record<string, any>): string {
  return Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
  }

  const finalGrid = gridArray.map((svgInfo, i) =>
    `<image ${toHtmlAttributes(svgInfo)} />`
  ).join("\n");

  return finalGrid;
}