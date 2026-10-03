# Fighter Asset Specification v1

## Canvas
Production fighter frames use a consistent 320x320 transparent canvas for the initial benchmark. A stable foot pivot prevents visual jitter between frames.

## Naming
`<animation>_<frame:000>`, lowercase. VFX use their own atlas and never bake gameplay collision into pixels.

## Runtime separation
Visual metadata contains frame order, playback rate, anchors and presentation events. Deterministic combat data owns startup/active/recovery, hitboxes, hurtboxes, pushboxes, damage and cancel rules.

## VFX anchors
Supported initial semantic anchors: `root`, `torso`, `head`, `hand_l`, `hand_r`, `foot_l`, `foot_r`, `world`.

## Export gates
1. transparent background;
2. identical canvas dimensions;
3. stable pivot;
4. no baked UI;
5. VFX exported separately;
6. atlas + manifest agree on frame IDs;
7. no collision timing inferred from artwork.

## Kael benchmark
320x320 is the initial art-production target, not a combat-coordinate contract. It can be revised after the first in-engine visual test without changing simulation rules.
