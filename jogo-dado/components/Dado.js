export default function Dado({ valor }) {
  return (
    <img
      src={`/dados/dado${valor}.png`}
      alt="dado"
      width={70}
    />
  );
}