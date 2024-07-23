import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';

const larguraTela = Dimensions.get('window').width;
const alturaTela = Dimensions.get('window').height;

const tamanhoCelula = 20;
const margem = 1; // Margem em células para representar as paredes
const quantidadeCelulasHorizontal = Math.floor(larguraTela / tamanhoCelula) - 3 * margem;
const quantidadeCelulasVertical = Math.floor((alturaTela * 0.6) / tamanhoCelula) - 2 * margem;

const gerarPosicaoAleatoria = (cobra) => {
  let novaFruta;
  let posicaoValida = false;

  while (!posicaoValida) {
    novaFruta = {
      x: Math.floor(Math.random() * quantidadeCelulasHorizontal) + margem,
      y: Math.floor(Math.random() * quantidadeCelulasVertical) + margem,
    };

    // Verificar se a fruta está dentro da área de jogo e não colide com a cobra
    posicaoValida =
      novaFruta.x >= margem &&
      novaFruta.x < quantidadeCelulasHorizontal + margem &&
      novaFruta.y >= margem &&
      novaFruta.y < quantidadeCelulasVertical + margem &&
      !cobra.some(
        (parte) => parte.x === novaFruta.x && parte.y === novaFruta.y
      );
  }

  return novaFruta;
};

const App = () => {
  const [cobra, setCobra] = useState([{ x: 5 + margem, y: 5 + margem }]);
  const [direcao, setDirecao] = useState('DIREITA');
  const [fruta, setFruta] = useState(
    gerarPosicaoAleatoria([{ x: 5 + margem, y: 5 + margem }])
  );
  const [contadorFrutas, setContadorFrutas] = useState(0);
  const [velocidade, setVelocidade] = useState(200); // Velocidade inicial em milissegundos
  const [gameOver, setGameOver] = useState(false);
  const [tempoJogo, setTempoJogo] = useState(0);
  const [inicio, setInicio] = useState(true);
  const intervaloRef = useRef(null);
  const tempoRef = useRef(null);

  const reiniciarJogo = () => {
    setCobra([{ x: 5 + margem, y: 5 + margem }]);
    setDirecao('DIREITA');
    setFruta(gerarPosicaoAleatoria([{ x: 5 + margem, y: 5 + margem }]));
    setContadorFrutas(0);
    setVelocidade(200);
    setGameOver(false);
    setTempoJogo(0);
    setInicio(false);
  };

  const moverCobra = () => {
    setCobra((prevCobra) => {
      const novaCabeca = { ...prevCobra[0] };

      switch (direcao) {
        case 'CIMA':
          novaCabeca.y -= 1;
          break;
        case 'BAIXO':
          novaCabeca.y += 1;
          break;
        case 'ESQUERDA':
          novaCabeca.x -= 1;
          break;
        case 'DIREITA':
          novaCabeca.x += 1;
          break;
      }

      // Implementar o teletransporte para o lado oposto
      if (novaCabeca.x < margem) novaCabeca.x = quantidadeCelulasHorizontal + margem - 1;
      if (novaCabeca.x >= quantidadeCelulasHorizontal + margem) novaCabeca.x = margem;
      if (novaCabeca.y < margem) novaCabeca.y = quantidadeCelulasVertical + margem - 1;
      if (novaCabeca.y >= quantidadeCelulasVertical + margem) novaCabeca.y = margem;

      // Verificar se a cobra comeu a fruta
      const cobraComeuFruta = novaCabeca.x === fruta.x && novaCabeca.y === fruta.y;
      const novaCobra = [novaCabeca, ...prevCobra];

      // Verificar colisão com a cobra
      if (novaCobra.some((parte, index) => index !== 0 && parte.x === novaCabeca.x && parte.y === novaCabeca.y)) {
        setGameOver(true);
        return prevCobra;
      }

      if (cobraComeuFruta) {
        setFruta(gerarPosicaoAleatoria(novaCobra));
        setContadorFrutas((prevContador) => {
          const novoContador = prevContador + 1;
          if (novoContador % 5 === 0) {
            setVelocidade((prevVelocidade) => Math.max(prevVelocidade - 20, 50));
          }
          return novoContador;
        });
      } else {
        novaCobra.pop(); // Remover a última parte da cobra
      }

      return novaCobra;
    });
  };

  useEffect(() => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
    }
    if (!gameOver && !inicio) {
      intervaloRef.current = setInterval(moverCobra, velocidade);
    }
    return () => clearInterval(intervaloRef.current);
  }, [direcao, fruta, velocidade, gameOver, inicio]);

  useEffect(() => {
    if (tempoRef.current) {
      clearInterval(tempoRef.current);
    }
    if (!gameOver && !inicio) {
      tempoRef.current = setInterval(() => {
        setTempoJogo((prevTempo) => prevTempo + 1);
      }, 1000);
    }
    return () => clearInterval(tempoRef.current);
  }, [gameOver, inicio]);

  const renderCobra = () => {
    return cobra.map((parte, index) => (
      <View
        key={index}
        style={[
          styles.celula,
          {
            top: parte.y * tamanhoCelula,
            left: parte.x * tamanhoCelula,
            backgroundColor: 'green',
          },
        ]}
      />
    ));
  };

  const renderFruta = () => {
    return (
      <View
        style={[
          styles.celula,
          {
            top: fruta.y * tamanhoCelula,
            left: fruta.x * tamanhoCelula,
            backgroundColor: 'red',
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.jogo}>
        {renderCobra()}
        {renderFruta()}
        <Text style={styles.contadorFrutas}>Frutas Comidas: {contadorFrutas}</Text>
      </View>
      <View style={styles.controles}>
        <View style={styles.filaControles}>
          <TouchableOpacity
            onPress={() => setDirecao('CIMA')}
            style={styles.botao}>
            <Text style={styles.textoBotao}>↑</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filaControles}>
          <TouchableOpacity
            onPress={() => setDirecao('ESQUERDA')}
            style={styles.botao}>
            <Text style={styles.textoBotao}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDirecao('BAIXO')}
            style={styles.botao}>
            <Text style={styles.textoBotao}>↓</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDirecao('DIREITA')}
            style={styles.botao}>
            <Text style={styles.textoBotao}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={gameOver}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Game Over</Text>
            <Text style={styles.modalText}>Tempo de Jogo: {tempoJogo} segundos</Text>
            <Text style={styles.modalText}>Frutas Comidas: {contadorFrutas}</Text>
            <TouchableOpacity onPress={reiniciarJogo} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Reiniciar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={inicio}
        transparent={true}
        animationType="none" // Remover a animação
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Jogo da Cobra</Text>
            <TouchableOpacity onPress={reiniciarJogo} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Jogar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  jogo: {
    position: 'relative',
    width: larguraTela * 0.9,
    height: alturaTela * 0.6,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  celula: {
    position: 'absolute',
    width: tamanhoCelula,
    height: tamanhoCelula,
  },
  controles: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  filaControles: {
    flexDirection: 'row',
  },
  botao: {
    margin: 5,
    padding: 20,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  textoBotao: {
    fontSize: 24,
    color: 'white',
  },
  contadorFrutas: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 18,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
