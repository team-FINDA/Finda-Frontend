import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, type CSSProperties, type ForwardedRef, type HTMLAttributes } from 'react';

type Props = {
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  direction?: CSSProperties['flexDirection'];
  position?: CSSProperties['position'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  gap?: CSSProperties['gap'];
  margin?: CSSProperties['margin'];
  overflow?: CSSProperties['overflow'];
} & HTMLAttributes<HTMLDivElement>;

type StyleProps = {
  $direction: CSSProperties['flexDirection'];
  $align: CSSProperties['alignItems'];
  $justify: CSSProperties['justifyContent'];
  $position: CSSProperties['position'];
  $width: CSSProperties['width'];
  $height: CSSProperties['height'];
  $gap: CSSProperties['gap'];
  $margin: CSSProperties['margin'];
  $overflow: CSSProperties['overflow'];
};

export const Flex = forwardRef(
  (
    {
      children,
      direction = 'row',
      align = 'flex-start',
      justify = 'flex-start',
      position = 'static',
      overflow = 'visible',
      width = '100%',
      height,
      gap = 0,
      margin = 0,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <StyledFlex
        ref={ref}
        $direction={direction}
        $align={align}
        $justify={justify}
        $position={position}
        $width={width}
        $height={height}
        $gap={gap}
        $margin={margin}
        $overflow={overflow}
        {...props}
      >
        {children}
      </StyledFlex>
    );
  }
);

const StyledFlex = styled.div<StyleProps>`
  position: ${({ $position }) => $position};
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  justify-content: ${({ $justify }) => $justify};
  align-items: ${({ $align }) => $align};
  width: ${({ $width }) => (typeof $width === 'number' ? `${$width}px` : $width)};
  ${({ $height }) =>
    $height &&
    css`
      height: ${typeof $height === 'number' ? `${$height}px` : $height};
    `};
  margin: ${({ $margin }) => (typeof $margin === 'number' ? `${$margin}px` : $margin)};
  gap: ${({ $gap }) => $gap}px;
  overflow: ${({ $overflow }) => $overflow};
`;

export default Flex;
