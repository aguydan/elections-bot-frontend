'use client';

import {
  Box,
  BoxProps,
  factory,
  Factory,
  useProps,
  useStyles,
} from '@mantine/core';
import classes from './angled-line.module.css';

export interface AngledLineProps extends BoxProps {
  angle?: number | string;
}

export type AngledLineFactory = Factory<{
  props: AngledLineProps;
  ref: HTMLDivElement;
  stylesNames: 'root';
}>;

const defaultProps: AngledLineProps = {
  angle: -0.75,
  w: '94%',
  h: '2px',
};

export const AngledLine = factory<AngledLineFactory>((_props, ref) => {
  const props = useProps('AngledLine', defaultProps, _props);
  const { className, style, angle, w, h, ...others } = props;

  const getStyles = useStyles<AngledLineFactory>({
    name: 'AngledLine',
    props,
    classes,
    className,
    style,
  });

  return (
    <Box
      ref={ref}
      w={w}
      h={h}
      {...getStyles('root')}
      style={{ transform: `rotate(${angle}deg)` }}
      {...others}
    />
  );
});
