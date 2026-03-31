export default function Dado({valor}){
    const imagens = {
        1: "/dados/dado1.png",
        2: "/dados/dado2.png",
        3: "/dados/dado3.png",
        4: "/dados/dado4.png",
        5: "/dados/dado5.png",
        6: "/dados/dado6.png",
    };

    return(
        <div> 
            <img src={imagens[valor]} alt={`Dado ${valor}`} width={100}/>
        </div>
    );
}