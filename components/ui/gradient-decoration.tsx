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
  root: '--gradient-box-angle';
};

export interface GradientDecorationProps
  extends AngledLineProps,
    StylesApiProps<GradientDecorationFactory>,
    ElementProps<'div'> {}

export type GradientDecorationFactory = Factory<{
  props: GradientDecorationProps;
  ref: HTMLDivElement;
  stylesNames: 'root';
  vars: GradientDecorationCssVariables;
}>;

const varsResolver = createVarsResolver<GradientDecorationFactory>(
  (theme, { angle }) => {
    return {
      root: {
        '--gradient-box-angle': angle ? angle + 'deg' : 'unset',
      },
    };
  },
);

export const GradientDecoration = (_props: GradientDecorationProps) => {
  const props = useProps('GradientDecoration', {}, _props);
  const { className, style, angle, vars, children, ...others } = props;

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
