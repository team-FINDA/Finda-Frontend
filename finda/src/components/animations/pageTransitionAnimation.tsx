'use client';

import { motion } from 'framer-motion';
import styled from '@emotion/styled';

type AnimatedIcon = {
  src: string;
  initial: any;
  animate: any;
  transition: any;
  style?: React.CSSProperties;
};

const ICONS: AnimatedIcon[] = [
  {
    src: '/ICONS/animation-icons/animationElement1.svg',
    initial: { y: 1080, rotate: -15 },
    animate: { y: -1080, rotate: 15 },
    transition: { delay: 0.025, duration: 5, ease: 'easeOut' },
    style: { left: '65%', bottom: '5%', zIndex: '8' },
  },
  {
    src: '/ICONS/animation-icons/animationElement2.svg',
    initial: { y: 1080, rotate: -35 },
    animate: { y: -1080, rotate: 35 },
    transition: { delay: 0.05, duration: 5, ease: 'easeOut' },
    style: { left: '45%', bottom: '10%' },
  },
  {
    src: '/ICONS/animation-icons/animationElement3.svg',
    initial: { y: 1080, rotate: 35 },
    animate: { y: -1080, rotate: -75 },
    transition: { delay: 0.175, duration: 5, ease: 'easeOut' },
    style: { left: '-5%', bottom: '10%' },
  },
  {
    src: '/ICONS/animation-icons/animationElement4.svg',
    initial: { y: 1080, rotate: 0 },
    animate: { y: -1080, rotate: -75 },
    transition: { delay: 0.25, duration: 5, ease: 'easeOut' },
    style: { left: '15%', bottom: '10%' },
  },
  {
    src: '/ICONS/animation-icons/animationElement5.svg',
    initial: { y: 1080, rotate: 15 },
    animate: { y: -1080, rotate: -85 },
    transition: { delay: 0.425, duration: 5, ease: 'easeOut' },
    style: { left: '60%', bottom: '10%' },
  },
  {
    src: '/ICONS/animation-icons/animationElement6.svg',
    initial: { y: 1080, rotate: 45 },
    animate: { y: -1080, rotate: -40 },
    transition: { delay: 0.675, duration: 5, ease: 'easeOut' },
    style: { left: '15%', bottom: '00' },
  },
  {
    src: '/ICONS/animation-icons/animationElement7.svg',
    initial: { y: 1080, rotate: -45 },
    animate: { y: -1080, rotate: 75 },
    transition: { delay: 0.75, duration: 5, ease: 'easeOut' },
    style: { left: '80%', bottom: '10%' },
  },
  {
    src: '/ICONS/animation-icons/animationElement8.svg',
    initial: { y: 1080, rotate: 115 },
    animate: { y: -1080, rotate: -115 },
    transition: { delay: 0.675, duration: 5, ease: 'easeOut' },
    style: { left: '-3%', bottom: '10%' },
  },
];

export default function PageTransitionAnimation() {
  return (
    <>
      {ICONS.map((icon, i) => (
        <MotionImg
          key={i}
          src={icon.src}
          alt={`icon-${i}`}
          initial={icon.initial}
          animate={icon.animate}
          transition={icon.transition}
          style={{
            position: 'absolute',
            ...icon.style,
          }}
        />
      ))}
    </>
  );
}

const MotionImg = styled(motion.img)`
  will-change: transform;
`;
