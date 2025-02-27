/**
 * Standard Content Types
 *
 * This file defines standardized content structures that can be used across all components.
 * Following the "convention over configuration" principle, these structures allow components
 * to automatically detect and render content appropriately without explicit configuration.
 */

/**
 * Standard Content Types
 *
 * @typedef {Object} TextContent
 * @property {string} text - The text content to display
 *
 * @typedef {Object} StatContent
 * @property {string|number} value - The primary value to display
 * @property {string} [description] - Optional description or context for the value
 * @property {string} [trend] - Optional trend indicator ('up', 'down', 'neutral')
 * @property {number} [change] - Optional numeric change value
 *
 * @typedef {Object} MediaContent
 * @property {string} image - URL to the image
 * @property {string} [caption] - Optional caption for the image
 * @property {string} [alt] - Optional alt text for accessibility
 *
 * @typedef {Object} ListContent
 * @property {Array<string|Object>} items - Array of items to display in the list
 *
 * @typedef {Object} ActionContent
 * @property {Array<Object>} actions - Array of action objects
 * @property {string} actions[].text - Text for the action button
 * @property {string} [actions[].icon] - Optional icon for the action
 * @property {string} [actions[].variant] - Optional styling variant
 *
 * @typedef {Object} CustomContent
 * @property {string} _type - Custom component type
 * @property {Object} [data] - Data for the custom component
 */

/**
 * Content Type Detection
 *
 * Functions to detect content types based on data structure
 */

/**
 * Detects if content is a stat type
 * @param {any} content - The content to check
 * @returns {boolean} - True if content is a stat type
 */
export const isStatContent = (content) => {
  return content && typeof content === "object" && "value" in content;
};

/**
 * Detects if content is a media type
 * @param {any} content - The content to check
 * @returns {boolean} - True if content is a media type
 */
export const isMediaContent = (content) => {
  return content && typeof content === "object" && "image" in content;
};

/**
 * Detects if content is a list type
 * @param {any} content - The content to check
 * @returns {boolean} - True if content is a list type
 */
export const isListContent = (content) => {
  return (
    content &&
    typeof content === "object" &&
    "items" in content &&
    Array.isArray(content.items)
  );
};

/**
 * Detects if content is a custom component type
 * @param {any} content - The content to check
 * @returns {boolean} - True if content is a custom component type
 */
export const isCustomContent = (content) => {
  return content && typeof content === "object" && "_type" in content;
};

/**
 * Detects if content has actions
 * @param {any} content - The content to check
 * @returns {boolean} - True if content has actions
 */
export const hasActions = (content) => {
  return (
    content &&
    typeof content === "object" &&
    "actions" in content &&
    Array.isArray(content.actions) &&
    content.actions.length > 0
  );
};

/**
 * Detects the content type based on its structure
 * @param {any} content - The content to check
 * @returns {string} - The detected content type
 */
export const detectContentType = (content) => {
  if (isCustomContent(content)) return "custom";
  if (isMediaContent(content)) return "media";
  if (isStatContent(content)) return "stat";
  if (isListContent(content)) return "list";
  if (typeof content === "string") return "text";
  if (hasActions(content)) return "action";
  return "generic";
};
