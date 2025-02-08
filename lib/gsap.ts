import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/all';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(Flip);

export default gsap;
