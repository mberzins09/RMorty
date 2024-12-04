import { Character } from "../types/types";

interface CharacterComponentProps {
  character: Character;
  onClick: () => void;
}

const CharacterCard = ({
  character,
  onClick,
}: CharacterComponentProps) => {
  return (
    <div 
      className="relative rounded-lg overflow-hidden h-full flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={character.image} 
        alt={character.name} 
        className="w-full h-50 sm:h-50 object-cover hover:scale-125 transition-transform duration-300"
      />
      <div className="p-6 flex-grow backdrop-blur-sm"> 
        <h2 className="text-2xl font-semibold mb-3 hover:text-blue-500 transition-colors duration-300">{character.name}</h2>
        <p className="text-gray-700 text-lg hover:text-blue-500 transition-colors duration-300">Status: {character.status}</p>
        <p className="text-gray-700 text-lg hover:text-blue-500 transition-colors duration-300">Species: {character.species}</p>
      </div>
    </div>
  );
};

export default CharacterCard;