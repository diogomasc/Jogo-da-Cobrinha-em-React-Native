# Jogo da Cobrinha em React Native

Este projeto é o clássico jogo da cobrinha, desenvolvido exclusivamente em React Native. No jogo, o jogador controla uma cobra que deve comer frutas para crescer e aumentar sua pontuação, assim como no jogo original. O jogo termina quando a cobra colide com ela mesma.

<div align="center">
  <img src="https://github.com/user-attachments/assets/ecb0e50f-4dcc-4016-9cc9-35e8bfbe79d3" 
       alt="Demo-Jogo-da-Cobrinha-em-React-Native" 
       width="200" 
  />
</div>

## Tecnologias Utilizadas

- *React Native*: Framework para desenvolvimento de aplicações móveis multiplataforma.
- *JavaScript*: Linguagem de programação utilizada.
- *Expo*: Ferramenta para facilitar o desenvolvimento e a execução de aplicações React Native.

## Recursos do Jogo

- *Movimentação da Cobra*: Controle intuitivo da direção da cobra através de botões na tela, permitindo que o jogador direcione a cobra para cima, para baixo, para a esquerda ou para a direita.
- *Crescimento da Cobra*: Cada vez que a cobra come uma fruta, ela cresce em comprimento, aumentando o desafio à medida que o jogo avança.
- *Aumento de Velocidade*: A cada 5 frutas consumidas, a velocidade da cobra aumenta gradualmente, tornando o jogo mais desafiador e dinâmico.
- *Teletransporte nas Bordas*: Quando a cobra atravessa a borda da tela, ela reaparece instantaneamente no lado oposto, mantendo o fluxo contínuo do jogo.
- *Contagem de Frutas*: O número total de frutas comidas é exibido claramente na tela, permitindo ao jogador acompanhar seu progresso.
- *Controle de Tempo*: O tempo de jogo é monitorado e exibido em segundos, proporcionando um senso de urgência e competição.
- *Tela de Início*: Apresentação de uma tela inicial com o título do jogo e uma opção clara para iniciar uma nova partida, criando uma introdução amigável.
- *Tela de Game Over*: Ao colidir com a própria cauda, o jogo exibe uma tela final com a pontuação total e o tempo de jogo, oferecendo uma visão clara do desempenho do jogador.


## Pré-requisitos

- *Node.js*: Certifique-se de ter o Node.js instalado. [Download Node.js](https://nodejs.org/)
- *Expo CLI*: Instale a ferramenta Expo CLI globalmente no seu sistema.

  sh
  npm install -g expo-cli
  

## Passos para Executar o Jogo

1. *Clone o Repositório*
   sh
   git clone https://github.com/diogomasc/Jogo-da-Cobrinha-em-React-Native.git
   cd Jogo-da-Cobrinha-em-React-Native
   

2. *Instale as Dependências*
   sh
   npm install
   

3. *Execute o Projeto*
   sh
   expo start
   
   - Isso abrirá uma nova aba no navegador com o Expo DevTools.
   - Escaneie o código QR com o aplicativo Expo Go em seu dispositivo móvel ou execute no emulador.
