# Character Production Roadmap

## P0 — Kael locomotion vertical slice
- [x] Concept aprovado
- [x] Asset contract + schema
- [x] Canvas/pivot baseline
- [ ] PNG frames transparentes: idle
- [ ] PNG frames transparentes: walk
- [ ] PNG frames transparentes: dash
- [ ] PNG frames transparentes: crouch
- [ ] PNG frames transparentes: jump / land
- [ ] Atlas + metadata validado
- [ ] Renderer playback test
- [ ] Visual regression evidence

**Gate P0:** Kael entra na arena, permanece estável no chão, anda, corre/agacha/pula e aterrissa sem jitter; troca de animação não altera estado determinístico.

## P1 — Normal combat
LP/MP/HP, LK/MK/HK, crouch/air attack, block high/low, hit light/heavy, knockdown/get-up.

**Gate P1:** animação acompanha frame-data sem ser fonte de verdade para hitboxes/hurtboxes.

## P2 — Rune kit
Rune Strike, Rune Wave, Rune Uppercut, Rune Grab, Rune Burst + VFX separados e anchors semânticos.

**Gate P2:** VFX podem ser desligados/substituídos sem alterar resultado da simulação.

## P3 — Apocalypse Breaker
Sequência do Ultimate, VFX, câmera e presentation events.

**Gate P3:** cinematic/presentation nunca pausa ou modifica arbitrariamente a simulação determinística.

## P4 — Production factory
Aplicar o mesmo contrato aos demais personagens canônicos, um fighter por pacote/PR, mantendo concept, sprites, VFX, atlas e metadata versionados.

## Observação sobre as pranchas
Pranchas geradas são direção visual. Não são consideradas sprites finais só por conterem poses. Cada frame final precisa ser exportado individualmente, com transparência real, canvas/pivô consistentes e inspeção in-engine.
