'use client';

import {
  Box,
  BoxProps,
  ElementProps,
  PaperBaseProps,
  polymorphicFactory,
  PolymorphicFactory,
  useProps,
  useStyles,
} from '@mantine/core';
import classes from './info-paper.module.css';

export interface InfoPaperProps
  extends BoxProps,
    PaperBaseProps,
    ElementProps<'div'> {
  bgSrc?: string;
}

export type InfoPaperFactory = PolymorphicFactory<{
  props: InfoPaperProps;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
  stylesNames: 'root' | 'parent' | 'backdrop';
}>;

const defaultProps: InfoPaperProps = {
  bgSrc: '/static/images/old-paper-bg.png',
};

export const InfoPaper = polymorphicFactory<InfoPaperFactory>((_props, ref) => {
  const props = useProps('InfoPaper', defaultProps, _props);
  const { className, style, bgSrc, children, ...others } = props;

  const getStyles = useStyles<InfoPaperFactory>({
    name: 'InfoPaper',
    props,
    classes,
    className,
    style,
  });

  return (
    <Box {...getStyles('parent')} ref={ref} {...others}>
      <Box
        {...getStyles('backdrop')}
        style={{ backgroundImage: `url(${bgSrc})` }}
      />
      <Box {...getStyles('root')}>{children}</Box>
    </Box>
  );
});
