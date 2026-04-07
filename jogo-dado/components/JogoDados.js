"use client";
import { useState } from "react";
import Dado from "./Dado";

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [dadosJ1, setDadosJ1] = useState([1, 1]);
  const [dadosJ2, setDadosJ2] = useState([1, 1]);
  const [vez, setVez] = useState(1);
  const [resultado, setResultado] = useState("");
  const [placar, setPlacar] = useState({ j1: 0, j2: 0 });

  function rolarDado() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function jogar(jogador) {
    const d1 = rolarDado();
    const d2 = rolarDado();

    if (jogador === 1) {
      setDadosJ1([d1, d2]);
      setVez(2);
    } else {
      setDadosJ2([d1, d2]);

      const soma1 = dadosJ1[0] + dadosJ1[1];
      const soma2 = d1 + d2;

      if (soma1 > soma2) {
        setResultado("Jogador 1 venceu a rodada!");
        setPlacar({ ...placar, j1: placar.j1 + 1 });
      } else if (soma2 > soma1) {
        setResultado("Jogador 2 venceu a rodada!");
        setPlacar({ ...placar, j2: placar.j2 + 1 });
      } else {
        setResultado("Empate!");
      }

      if (rodada < 5) {
        setRodada(rodada + 1);
        setVez(1);
      }
    }
  }

  function reiniciar() {
    setRodada(1);
    setPlacar({ j1: 0, j2: 0 });
    setResultado("");
    setVez(1);
  }

  function resultadoFinal() {
    if (placar.j1 > placar.j2) return "Jogador 1 venceu o jogo!";
    if (placar.j2 > placar.j1) return "Jogador 2 venceu o jogo!";
    return "Empate geral!";
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Jogo de Dados</h1>
      <h2>Rodada: {rodada}</h2>

      <div>
        <h3>Jogador 1</h3>
        <Dado valor={dadosJ1[0]} />
        <Dado valor={dadosJ1[1]} />
        <br />
        <button onClick={() => jogar(1)} disabled={vez !== 1}>
          Jogar J1
        </button>
      </div>

      <div>
        <h3>Jogador 2</h3>
        <Dado valor={dadosJ2[0]} />
        <Dado valor={dadosJ2[1]} />
        <br />
        <button onClick={() => jogar(2)} disabled={vez !== 2}>
          Jogar J2
        </button>
      </div>

      <h3>{resultado}</h3>

      {rodada === 5 && vez === 1 && (
        <div>
          <h2>{resultadoFinal()}</h2>
          <button onClick={reiniciar}>Jogar Novamente</button>
        </div>
      )}
    </div>
  );
}