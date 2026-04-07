"use client";
import { useState } from "react";
import Dado from "./Dado";

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [vez, setVez] = useState("A");
  const [dadosA, setDadosA] = useState([1, 1]);
  const [dadosB, setDadosB] = useState([1, 1]);
  const [resultado, setResultado] = useState("");
  const [placar, setPlacar] = useState({ A: 0, B: 0 });

  function rolar() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function jogar(jogador) {
    const d1 = rolar();
    const d2 = rolar();

    if (jogador === "A") {
      setDadosA([d1, d2]);
      setVez("B");
    } else {
      setDadosB([d1, d2]);

      const somaA = dadosA[0] + dadosA[1];
      const somaB = d1 + d2;

      if (somaA > somaB) {
        setResultado("Jogador A venceu");
        setPlacar((p) => ({ ...p, A: p.A + 1 }));
      } else if (somaB > somaA) {
        setResultado("Jogador B venceu");
        setPlacar((p) => ({ ...p, B: p.B + 1 }));
      } else {
        setResultado("Empate");
      }

      if (rodada < 5) {
        setRodada((r) => r + 1);
        setVez("A");
      }
    }
  }

  function resultadoFinal() {
    if (placar.A > placar.B) return "Jogador A ganhou o jogo!";
    if (placar.B > placar.A) return "Jogador B ganhou o jogo!";
    return "Empate geral!";
  }

  function reiniciar() {
    setRodada(1);
    setVez("A");
    setDadosA([1, 1]);
    setDadosB([1, 1]);
    setResultado("");
    setPlacar({ A: 0, B: 0 });
  }

  return (
    <div className="container">
      <h2>Rodada {rodada}</h2>

      <div className="players">
        <div>
          <h3>Jogador A</h3>
          <Dado valor={dadosA[0]} />
          <Dado valor={dadosA[1]} />
          <p>{resultado.includes("A") ? "Venceu" : resultado ? "Perdeu" : ""}</p>

          <button
            onClick={() => jogar("A")}
            disabled={vez !== "A" || rodada > 5}
            className={vez === "A" ? "ativo" : "desativado"}
          >
            Jogar Dado
          </button>
        </div>

        <div>
          <h3>Jogador B</h3>
          <Dado valor={dadosB[0]} />
          <Dado valor={dadosB[1]} />
          <p>{resultado.includes("B") ? "Venceu" : resultado ? "Perdeu" : ""}</p>

          <button
            onClick={() => jogar("B")}
            disabled={vez !== "B" || rodada > 5}
            className={vez === "B" ? "ativo" : "desativado"}
          >
            Jogar Dado
          </button>
        </div>
      </div>

      <h3>{resultado}</h3>

      {rodada === 5 && vez === "A" && (
        <div>
          <h2>{resultadoFinal()}</h2>
          <button onClick={reiniciar}>Jogar Novamente</button>
        </div>
      )}
    </div>
  );
}