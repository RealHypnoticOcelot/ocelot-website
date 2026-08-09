import { getIconData, iconToSVG, iconToHTML, replaceIDs } from '@iconify/utils';
import type { IconifyJSON, IconifyInfo } from '@iconify-json/simple-icons'; // Can be imported from any @iconify-json package, I think

export const fetchSVG = (iconSet: IconifyJSON, iconName: string, setInfo: IconifyInfo, height: string = "1em", width: string = "1em", extraAttributes: Record<string, string> = {}): string => {
  const iconData = getIconData(iconSet, iconName);
  if (!iconData) {
    throw new Error(`Icon "${iconName}" is missing`);
  }
  const renderData = iconToSVG(iconData, {
    height: height,
    width: width,
  });
  // const extraAttributes = {
  //   "aria-hidden": "true",
  //   "alt": "A kitten frolicking in a field"
  // } // Example
  const licenseInfo = {
    "data-license": setInfo.license.title,
    ...(setInfo.license?.url && {
      "data-license-url": setInfo.license.url // Add URL if it exists
    }),
  }
  const svgHTML = iconToHTML(replaceIDs(renderData.body), {
      ...extraAttributes,
      ...renderData.attributes,
      ...licenseInfo,
      "aria-label": iconName
    }
  );

  return svgHTML;
}