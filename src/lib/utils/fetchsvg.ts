import { icons } from '@iconify-json/simple-icons';
import { getIconData, iconToSVG, iconToHTML, replaceIDs } from '@iconify/utils';

export const fetchSVG = (iconName: string, height: string = "1em", width: string = "1em", extraAttributes: Record<string, string> = {}): string => {
  const iconData = getIconData(icons, iconName);
  if (!iconData) {
    throw new Error(`Icon "${iconName}" is missing`);
  }
  const renderData = iconToSVG(iconData, {
    height: height,
    width: width,
  });
  // const exampleExtraAttributes = {
  //   "aria-hidden": "true",
  //   "alt": "A kitten frolicking in a field"
  // }
  const svgHTML = iconToHTML(replaceIDs(renderData.body), {
      ...extraAttributes,
      ...renderData.attributes
    }
  );
  console.log(renderData)

  return svgHTML;
}