export const grid = (array: Array<any>, size: number): Array<any> => {
  while (Math.sqrt(array.length) * Math.sqrt(array.length) !== array.length) {
    array.pop() // Make sure the amount of items in the array is a perfect square, e.g. 4, 9, 16
  };
  const dimension = Math.sqrt(array.length); // e.g. 2
  const tile_size = size / dimension; // e.g. 1024 / 2 = 512 
  const finalGrid = array.map((image: string, i) => ({
    "href": image,
    "x": Math.floor(i / dimension) * tile_size,
    "y": (i % dimension) * tile_size,
    "width": tile_size,
    "height": tile_size,
    "preserveAspectRatio": "xMidYMid slice"
  }));

  return finalGrid;
}