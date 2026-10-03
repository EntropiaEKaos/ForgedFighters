# Forged Fighter — Character Art Pipeline

Este diretório registra o pipeline oficial de personagens do Forged Fighter.

## Regra de produção
Concept aprovado -> turnaround -> sprites transparentes -> animações -> VFX separados -> atlas -> metadata -> pivôs -> hitbox/hurtbox/pushbox -> frame data -> integração -> teste in-game.

## Princípios
- Gameplay e colisão são independentes da arte.
- VFX são assets independentes do corpo do fighter.
- Concepts exploratórios não se tornam canon automaticamente.
- Assets finais devem ser versionados e reproduzíveis.
- Kael / The Runebreaker é o benchmark inicial do pipeline.

## Estrutura alvo
```
assets/characters/<fighter>/
  concept/
  sprites/
  vfx/
  atlases/
  metadata/
```

## Primeiro pacote
Kael:
- idle, walk, dash, crouch, jump/land
- LP/MP/HP, LK/MK/HK
- block high/low
- hit light/heavy, knockdown/get-up
- Rune Strike, Rune Wave, Rune Uppercut, Rune Grab, Rune Burst
- Apocalypse Breaker
- estados de Rune Charge
