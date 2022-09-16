import { CloseCircleFilled } from "@ant-design/icons";
import { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Container } from "../../components/ui";
import { Attacks, Pokemon, Resistances, Weaknesses } from "../../components/ui/Card/Card";
import './PokemonDetail.scss';

export default function PokemonDetail() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedAttack, setSelectedAttack] = useState<Attacks>();
  const pokemon: any = useLoaderData();

  const data: Pokemon = pokemon.data;

  const modal = useRef<HTMLDivElement>(null);

  console.log(data)

  function handleModal() {
    setIsOpen(!isOpen);
    if(modal.current)
      modal.current.style.display = isOpen ? "grid" : "none"
  }

  return(
    <Container>
      <div className="pokemondetail-root">
        {isOpen && <div id="attack-modal" className="pokemondetail-root__modal">
          <div ref={modal} className="pokemondetail-root__modal__content">
            <h2>{selectedAttack?.name}</h2>
            <hr />
            <span>Cost: {selectedAttack?.cost}</span>
            <span>Damage: {selectedAttack?.damage}</span>
            <span>Converted Energy Cost: {selectedAttack?.convertedEnergyCost}</span>
            <h4><u>Description</u></h4>
            <span>{selectedAttack?.text}</span>
            <CloseCircleFilled onClick={() => handleModal()} style={{fontSize: "24px", color:"#cd282f"}} />
          </div>
        </div>}
        <div className="pokemondetail-root__container">
          <div className="pokemondetail-root__img-container">
            <img src={data.images.large} width="50%" alt="large-pokemon-img" />
          </div>
          <div className="pokemondetail-root__details">
            <h1>{data.name}</h1>
            <span className="pokemondetail-root__details__id-tag">{data.id}</span>
            {/* Types */}
            <h2>Types</h2>
            {data.types.map((type: string) => type)}
            {/* Resistences */}
            {data.resistances && <h2>Resistences</h2>}
            {data.resistances?.map((resistances: Resistances) => (
              <span key={data.id}>{resistances.type}: {resistances.value}</span>
            ))}
            {/* Weaknesses */}
            {data.weaknesses && <h2>Weaknesses</h2>}
            {data.weaknesses?.map((weaknesses: Weaknesses) => (
              <span key={data.id}>{weaknesses.type}: {weaknesses.value}</span>
            ))}
            {/* Attacks */}
            {data.attacks && <h2>Attacks</h2>}
            {data.attacks?.map((attack: Attacks) => (
              <span onClick={() => {handleModal(); setSelectedAttack(attack)}} key={attack.name}>{attack.name}</span>
            ))}
          </div>
        </div>
      </div>
    </Container>
  ); 
}
