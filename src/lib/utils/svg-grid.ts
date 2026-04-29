export const grid = (array: Array<any>, size: number, scale: number = 1): string => {
  while (true) {
    const root = Math.sqrt(array.length)
    if (Number.isInteger(root)) break // Make sure the amount of items in the array is a perfect square, e.g. 4, 9, 16
    array.pop()
  }
  const dimension = Math.sqrt(array.length); // e.g. 2
  const tile_size = size / dimension; // e.g. 1024 / 2 = 512 
  const gridArray = array.map((image: string, i) => ({
    "href": image,
    "x": (Math.floor(i / dimension) * tile_size) + (tile_size * ((1 - scale) / 2)),
    "y": ((i % dimension) * tile_size) + (tile_size * ((1 - scale) / 2)),
    "width": tile_size * scale,
    "height": tile_size * scale,
    "preserveAspectRatio": "xMidYMid keep" // keep makes it so that extra width/height doesn't get cut off
  }));

  // Below takes the array and converts it into image objects for the SVG
  function toHtmlAttributes(attributes: Record<string, any>): string {
  return Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
  }
  const finalGrid = gridArray.map(svgInfo => `<image ${toHtmlAttributes(svgInfo)} />`).join("\n");

  return finalGrid;
}