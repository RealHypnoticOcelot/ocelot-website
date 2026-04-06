export const svgToURI = (svg: string): string => {
  const svgURI = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  return svgURI;
}