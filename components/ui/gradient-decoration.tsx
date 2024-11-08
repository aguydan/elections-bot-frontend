'use client';

import {
  Box,
  createVarsResolver,
  ElementProps,
  Factory,
  StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core';
import { AngledLineProps } from './angled-line';
import classes from './gradient-decoration.module.css';

export type GradientDecorationCssVariables = {
  root: '--gradient-box-angle' | '--gradient-box-left' | '--gradient-box-top';
};

export interface GradientDecorationProps
  extends AngledLineProps,
    StylesApiProps<GradientDecorationFactory>,
    ElementProps<'div'> {
  gradientTop?: string | number;
  gradientLeft?: string | number;
}

export type GradientDecorationFactory = Factory<{
  props: GradientDecorationProps;
  ref: HTMLDivElement;
  stylesNames: 'root';
  vars: GradientDecorationCssVariables;
}>;

const varsResolver = createVarsResolver<GradientDecorationFactory>(
  (theme, { angle, gradientTop, gradientLeft }) => {
    return {
      root: {
        '--gradient-box-angle': angle ? angle + 'deg' : '0deg',
        '--gradient-box-left': gradientLeft
          ? gradientLeft.toString()
          : '-0.8rem',
        '--gradient-box-top': gradientTop ? gradientTop.toString() : 'unset',
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
