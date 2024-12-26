'use client';

import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  Factory,
  getRadius,
  getSize,
  MantineSize,
  PaperBaseProps,
  StyleProp,
  StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core';
import classes from './gradient-decoration.module.css';

export type GradientDecorationCssVariables = {
  root:
    | '--gradient-angle'
    | '--gradient-left'
    | '--gradient-top'
    | '--gradient-add-height'
    | '--gradient-radius'
    | '--gradient-width';
};

export interface GradientDecorationProps
  extends BoxProps,
    PaperBaseProps,
    StylesApiProps<GradientDecorationFactory>,
    ElementProps<'div'> {
  angle?: string | number;
  gradientTop?: StyleProp<MantineSize | (string & {}) | number>;
  gradientLeft?: StyleProp<MantineSize | (string & {}) | number>;
  gradientAddHeight?: StyleProp<MantineSize | (string & {}) | number>;
  gradientWidth?: StyleProp<MantineSize | (string & {}) | number>;
}

export type GradientDecorationFactory = Factory<{
  props: GradientDecorationProps;
  ref: HTMLDivElement;
  stylesNames: 'root';
  vars: GradientDecorationCssVariables;
}>;

const varsResolver = createVarsResolver<GradientDecorationFactory>(
  (
    theme,
    {
      angle,
      radius,
      gradientTop,
      gradientLeft,
      gradientAddHeight,
      gradientWidth,
    },
  ) => {
    return {
      root: {
        '--gradient-angle': angle ? angle + 'deg' : '0deg',
        '--gradient-left': gradientLeft ? getSize(gradientLeft) : '-0.8rem',
        '--gradient-top': gradientTop ? getSize(gradientTop) : undefined,
        '--gradient-add-height': gradientAddHeight
          ? getSize(gradientAddHeight)
          : '0.6rem',
        '--gradient-radius': radius ? getRadius(radius) : '0.6rem',
        '--gradient-width': gradientWidth ? getRadius(gradientWidth) : '30rem',
      },
    };
  },
);

export const GradientDecoration = (_props: GradientDecorationProps) => {
  const props = useProps('GradientDecoration', {}, _props);
  const {
    className,
    style,
    vars,
    children,
    gradientTop,
    gradientLeft,
    gradientWidth,
    gradientAddHeight,
    ...others
  } = props;

  const getStyles = useStyles<GradientDecorationFactory>({
    name: 'GradientDecoration',
    props,
    classes,
    className,
    style,
    vars,
    varsResolver,
  });

  return (
    <Box {...getStyles('root')} {...others}>
      {children}
    </Box>
  );
};
