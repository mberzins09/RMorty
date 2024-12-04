import { Character } from "../types/types";


interface ModalProps {
  character: Character;
  onClose: () => void;
}

const Modal = ({ character, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-start p-4">
      <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-xl p-6 w-auto h-fit relative shadow-xl mt-20">
        <button 
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition-colors text-xl font-bold bg-white/50 hover:bg-white/80 rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          X
        </button>
        <img 
          src={character.image} 
          alt={character.name} 
          className="w-full h-auto rounded-lg mb-4 shadow-md"
        />
        <h2 className="text-2xl font-bold mb-4 text-indigo-900">{character.name}</h2>
        <p className="text-indigo-800 mb-2">Status: {character.status}</p>
        <p className="text-indigo-800 mb-2">Species: {character.species}</p>
        <p className="text-indigo-800 mb-2">Gender: {character.gender}</p>
        <p className="text-indigo-800 mb-2">Origin: {character.origin.name}</p>
        <p className="text-indigo-800 mb-2">Location: {character.location.name}</p>
      </div>
    </div>
  );
};

export default Modal;