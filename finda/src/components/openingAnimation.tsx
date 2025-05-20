import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { color } from '@/lib/color';

const texts = ['환경을 살', '지구를 살', '내일을 살'];

export default function OpeningAnimation() {
  const [index, setIndex] = useState<number>(0);
  const [animationIndex, setAnimationIndex] = useState<number>(1);

  const lockScroll = () => {
    document.body.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    width: 100%;
  `;
  };

  const unlockScroll = () => {
    document.body.style.cssText = '';
  };

  useEffect(() => {
    let count = 0;
    lockScroll();
    const autoAnimation = () => {
      if (index < 3) setIndex((prev) => (prev + 1) % 4);
      count++;

      if (count < 3) {
        setTimeout(autoAnimation, 800);
        console.log(animationIndex);
      } else {
        setAnimationIndex(animationIndex + 1);
        unlockScroll();
      }
    };

    setTimeout(autoAnimation, 1000);

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <ThreeFindaContainer animationIndex={animationIndex}>
        <TextBox offset={-index * 110}>
          {texts.map((line, i) => (
            <TextContainer key={i}>
              <Text opacity={index === i ? 1 : Math.abs(index - i) == 2 || index == 3 ? 0 : 0.2}>
                {line}
                <Span>핀다.</Span>
              </Text>
            </TextContainer>
          ))}
        </TextBox>
      </ThreeFindaContainer>
      <IntroduceContainer></IntroduceContainer>
    </>
  );
}

const ThreeFindaContainer = styled.div<{ animationIndex: number }>`
  height: 119px;
  display: ${(props) => (props.animationIndex < 3 ? 'block' : 'none')};
  transition: 0.3s;
`;

const TextBox = styled.div<{ offset: number }>`
  transform: translateY(${(props) => props.offset}px);
  transition: transform 1s;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
  user-select: none;
`;

const TextContainer = styled.div``;

const Text = styled.h1<{ opacity: number }>`
  font-size: 100px;
  font-weight: 900;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.3s;
`;

const Span = styled.span`
  color: ${color.blue[500]};
`;

const IntroduceContainer = styled.div``;

const IntroduceTitle = styled.h1``;
