/**
 *  String constant SVG
 *  @default svg
 */
export const SVG = "svg";

/*
 *  Object literal, which defines a set of default values for
 *  all properties defined by SVGAttributeSettings.
 */
const DEFAULT_SETTINGS: {[ key: string ]: string } = {
  "xmlns":           "http://www.w3.org/2000/svg",
  "width":           "24",
  "height":          "24",
  "viewBox":         "0 0 24 24",
  "fill":            "none",
  "stroke":          "currentColor",
  "stroke-width":    "2",
  "stroke-linecap":  "round",
  "stroke-linejoin": "round"
}

/**
 *  Set default attributes to SVGSVGElement
 */
export function setDefaultSVGAttributes( element: SVGSVGElement ) {
  for ( const pname in DEFAULT_SETTINGS ) {
        element.setAttribute( pname, DEFAULT_SETTINGS[ pname ]);
  }
  return element;
}