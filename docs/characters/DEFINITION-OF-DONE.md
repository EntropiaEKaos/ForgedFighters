# Sprite/VFX Definition of Done

Um asset só recebe status **production-ready** quando:
1. PNG tem alpha real e não contém fundo/checkerboard embutido.
2. Canvas e pivot obedecem ao manifesto.
3. IDs dos frames existem no atlas e no metadata.
4. Não há recorte de cabelo, tecido, arma ou VFX.
5. Silhueta continua legível em escala de gameplay.
6. Feet/root não apresentam jitter em idle/locomotion.
7. VFX são exportados separadamente quando não pertencem ao corpo.
8. Playback não controla hit timing, dano ou colisão.
9. Teste visual in-engine foi registrado.
10. Mudança passa pelo PR antes de entrar na main.
