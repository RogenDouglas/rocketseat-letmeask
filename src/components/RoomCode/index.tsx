import toast from "react-hot-toast";
import copyImg from "../../assets/images/copy.svg";

import "./style.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeClipboard() {
    navigator.clipboard.writeText(props.code);
    toast.success("Código copiado.");
  }
  return (
    <button className="room-code" onClick={copyRoomCodeClipboard}>
      <div>
        <img src={copyImg} alt="Copiar codigo" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
