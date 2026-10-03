# Forged Fighters

Forged Fighters é composto por dois produtos acoplados, porém arquiteturalmente separados:

- **Forged Fighter Engine** — motor reutilizável para fighting games.
- **Forged Fighter** — jogo-vitrine construído sobre o engine.

## Princípios

- simulação determinística a 60 Hz;
- Fighting Core headless, independente do renderer;
- conteúdo orientado a dados;
- rollback netcode como requisito de arquitetura;
- renderer desacoplado da simulação;
- ferramentas visuais para criação de fighters, golpes e stages;
- testes de determinismo como gate de CI.

## Estrutura

- `apps/game` — cliente jogável;
- `apps/server` — backend/serviços online;
- `apps/studio` — Forged Fighter Studio;
- `packages/core` — loop, estado, snapshots e determinismo;
- `packages/combat` — regras e primitivas de combate;
- `packages/netcode` — rollback e transporte de inputs;
- `packages/renderer` — integração visual Phaser/WebGL;
- `packages/protocol` — contratos cliente/servidor;
- `packages/content-schema` — schemas data-driven;
- `packages/testing` — harnesses e golden-match tests.

## Marco atual

**M0.1 — Arquitetura e monorepo do Engine**
