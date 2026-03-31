import Dado from "@/components/Dados";

export default function Home() {
  return (
    <div>
      <h1>Jogo de Dados</h1>
      <Dado valor={3} />
    </div>
  );
}