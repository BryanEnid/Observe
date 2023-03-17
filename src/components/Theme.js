import { extendTheme } from "native-base";

/**
 * Color pallette
 * Primary: #609ff7
 */

export const theme = extendTheme({
  config: { strictMode: "warn" },

  components: {
    Box: {
      variants: {
        elevated: () => ({
          shadowColor: "#999",
          shadowOpacity: 0.25,
          shadowRadius: 18.46,
          elevation: 22,
          shadowOffset: {
            width: 0,
            height: 16,
          },
        }),
      },
    },

    Text: {
      variants: {
        caption: () => ({
          opacity: 0.5,
          color: "red",
        }),
      },
    },

    ActionsheetItem: {
      defaultProps: {
        // Other styles
        _pressed: { bg: "primary.800" },
        // _hover: { bg: "red.500" },

        // Config
        variant: "unstyled",

        // Styles
        bg: "#eee",
        borderRadius: "15px",
        color: "#609ff7",
        py: 8,
        alignItems: "center",
      },

      // variants: {
      //   submit: {
      //     background: "primary.900",
      //   },
      // },
    },
  },
});
