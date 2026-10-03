# Architecture

## Regra principal

O **Forged Fighter Engine** não depende do conteúdo específico do jogo **Forged Fighter**.

## Camadas

1. **Simulation**
   - fixed tick de 60 Hz;
   - estado serializável;
   - snapshots;
   - hash determinístico;
   - input buffer.

2. **Combat**
   - fighter state machine;
   - hitbox/hurtbox/pushbox;
   - frame data;
   - hitstop/hitstun/blockstun;
   - throws/cancels/projectiles/juggle/scaling.

3. **Netcode**
   - input prediction;
   - rollback;
   - resimulation;
   - desync detection;
   - replay/input log.

4. **Presentation**
   - Phaser;
   - WebGL;
   - VFX;
   - câmera;
   - áudio;
   - animações.

5. **Online Platform**
   - Forged ID;
   - matchmaking;
   - ranked;
   - social;
   - lobbies;
   - spectator;
   - torneios.

6. **Studio**
   - edição data-driven de fighters, moves e stages.

## Invariante

A mesma sequência de inputs e o mesmo estado inicial devem produzir exatamente o mesmo estado final.
