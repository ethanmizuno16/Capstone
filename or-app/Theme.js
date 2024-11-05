export const Colors = {
  primary: "#4B2E83",
  secondary: "#0066CC",
  background: "#f5f5f5",
  cardBackground: "#ffffff",
  text: "#333333",
  textLight: "#666666",
  border: "#e0e0e0",
  highlight: "#FF6347",
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#F44336",
};

export const Fonts = {
  family: {
    regular: "Roboto-Regular",
    bold: "Roboto-Bold",
    italic: "Roboto-Italic",
  },
  size: {
    tiny: 12,
    small: 14,
    medium: 16,
    large: 18,
    xlarge: 22,
    title: 26,
  },
};

export const Spacing = {
  xs: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

export const Borders = {
  radius: {
    small: 4,
    medium: 8,
    large: 16,
  },
  width: 1,
  color: Colors.border,
};

export const Shadows = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
};

export const ButtonStyles = {
  primary: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
    borderRadius: Borders.radius.medium,
    alignItems: "center",
  },
  secondary: {
    backgroundColor: Colors.secondary,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
    borderRadius: Borders.radius.medium,
    alignItems: "center",
  },
  disabled: {
    backgroundColor: Colors.border,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
    borderRadius: Borders.radius.medium,
    alignItems: "center",
    opacity: 0.5,
  },
};

export const InputStyles = {
  container: {
    marginVertical: Spacing.small,
  },
  input: {
    backgroundColor: Colors.cardBackground,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
    borderColor: Colors.border,
    borderWidth: Borders.width,
    borderRadius: Borders.radius.small,
    fontSize: Fonts.size.medium,
    color: Colors.text,
  },
};

export const IconSizes = {
  small: 16,
  medium: 24,
  large: 32,
};

export const Layout = {
  headerHeight: 56,
  footerHeight: 60,
};
