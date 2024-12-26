'use client';

import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  getRadius,
  PaperBaseProps,
  polymorphicFactory,
  PolymorphicFactory,
  StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core';
import classes from './info-paper.module.css';

export type InfoPaperCssVariables = {
  parent: '--paper-radius';
};

export interface InfoPaperProps
  extends BoxProps,
    PaperBaseProps,
    StylesApiProps<InfoPaperFactory>,
    ElementProps<'div'> {
  bgSrc?: string;
}

export type InfoPaperFactory = PolymorphicFactory<{
  props: InfoPaperProps;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
  stylesNames: 'root' | 'parent' | 'backdrop';
}>;

const varsResolver = createVarsResolver<InfoPaperFactory>((_, { radius }) => ({
  parent: {
    '--paper-radius': radius ? getRadius(radius) : '1.4rem',
  },
}));

export const InfoPaper = polymorphicFactory<InfoPaperFactory>((_props, ref) => {
  const props = useProps('InfoPaper', {}, _props);
  const { className, style, bgSrc, children, p, m, classNames, ...others } =
    props;

  const getStyles = useStyles<InfoPaperFactory>({
    name: 'InfoPaper',
    props,
    classes,
    classNames,
    style,
    varsResolver,
  });

  return (
    <Box {...getStyles('parent')} ref={ref} {...others}>
      <Box
        {...getStyles('backdrop')}
        style={{ backgroundImage: `url(${bgSrc})` }}
      />
      <Box {...getStyles('root')} p={p} m={m}>
        {children}
      </Box>
    </Box>
  );
});
