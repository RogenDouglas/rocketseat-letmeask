import { FiXCircle } from "react-icons/fi";

import "./style.scss";

type ModalProps = {
  title: string;
  subTitle: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function Modal({
  title,
  subTitle,
  isOpen,
  onConfirm,
  onCancel,
}: ModalProps) {
  return (
    <div
      className="modal"
      style={{ visibility: isOpen ? "visible" : "hidden" }}
    >
      <div className="content">
        <FiXCircle size={52} color="#d73754" />
        <h1>{title}</h1>
        <p>{subTitle}</p>

        <div className="buttons">
          <button className="cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="confirm" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
