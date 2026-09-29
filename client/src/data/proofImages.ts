// Proof-of-work images index. Parts are lazy-loaded via dynamic import()
// from InstagramProof so they never block initial page load.

import { PART_1 } from './proof/p1';
import { PART_2 } from './proof/p2';
import { PART_3 } from './proof/p3';
import { PART_4 } from './proof/p4';
import { PART_5 } from './proof/p5';
import { PART_6 } from './proof/p6';
import { PART_7 } from './proof/p7';
import { PART_8 } from './proof/p8';
import { PART_9 } from './proof/p9';
import { PART_10 } from './proof/p10';
import { PART_11 } from './proof/p11';
import { PART_12 } from './proof/p12';

export type ProofHighlight = { src: string; label: string };

export const PROOF_HIGHLIGHTS: ProofHighlight[] = [
  ...PART_1,
  ...PART_2,
  ...PART_3,
  ...PART_4,
  ...PART_5,
  ...PART_6,
  ...PART_7,
  ...PART_8,
  ...PART_9,
  ...PART_10,
  ...PART_11,
  ...PART_12,
];
