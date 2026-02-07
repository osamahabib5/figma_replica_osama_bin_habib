/**
 * Design Tokens for Sidebar Component
 * Extracted from Figma's design system
 */

export const SIDEBAR_TOKENS = {
  // Layout
  width: {
    default: 240,
    min: 180,
    max: 360,
  },

  // Colors
  colors: {
    // Dark theme values (match Figma left panel)
    bg: '#2c2c2c',
    bgHover: '#333333',
    bgSelected: '#393939',
    bgSectionHover: '#323232',
    border: '#252525',
    divider: '#2B2B2B',
    textPrimary: '#E6E6E6',
    textSecondary: '#BFC7CC',
    textMuted: '#9DA7AD',
    iconDefault: '#9AA4AD',
    iconHover: '#D1D7DB',
    activePage: '#18A0FB',
  },

  // Typography
  typography: {
    sectionTitle: {
      fontSize: 11,
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: 0.5,
      textTransform: 'uppercase' as const,
      color: '#666666',
    },
    itemLabel: {
      fontSize: 13,
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#333333',
    },
    itemLabelSelected: {
      fontWeight: 500,
    },
    itemLabelMuted: {
      color: '#888888',
    },
  },

  // Spacing
  spacing: {
    itemHeight: 28,
    indentPerLevel: 16,
    iconSize: 16,
    chevronSize: 16,
    paddingX: 6,
    paddingY: 0,
    gapBetweenElements: 6,
    sectionGap: 12,
  },

  // Animation
  animation: {
    transition: 150,
    easing: 'cubic-bezier(0.2, 0, 0.38, 0.9)',
  },

  // Hover states
  interaction: {
    hoverBg: '#EDEDED',
    selectedBg: '#E0E0E0',
    cursorResize: 'col-resize',
    // cursorPointer: 'pointer',
  },
}

export const LIGHT_THEME = {
  ...SIDEBAR_TOKENS,
}

export default SIDEBAR_TOKENS
