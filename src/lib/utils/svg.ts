/**
 *  String constant SVG
 *  @default svg
 */
export const SVG = "svg";

/**
 *  https://lucide.dev/icons/calendar-fold in v0.315.0 currently unsupported by obsidian
 *  TODO: Remove this, if https://docs.obsidian.md/Plugins/User+interface/Icons states support.
 */
export const CALENDARFOLDSVG =(() => {
  let    data  = '<path d="M8 2v4"/><path d="M16 2v4"/>';
         data += '<path d="M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z"/>';
         data += '<path d="M3 10h18"/><path d="M15 22v-4a2 2 0 0 1 2-2h4"/>';
  return data;
})();

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