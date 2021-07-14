import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";

import "../../styles/auth.scss";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import toast from "react-hot-toast";

export default function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (newRoom.trim() === "") {
      toast.error("Informe um nome para sala.");
      return;
    }

    try {
      const roomRef = database.ref("rooms");

      const firebaseRoom = await roomRef.push({
        title: newRoom,
        userId: user?.id,
      });

      toast.success("Sala criada com sucesso.");
      history.push(`/admin/rooms/${firebaseRoom.key}`);
    } catch (error) {
      toast.error("Ocorreu um erro ao criar a sala.");
    }
  }

  return (
    <div className="page-auth">
      <aside>
        <img src={illustrationImg} alt="LetMeAsk" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Digite o nome da sala"
              onChange={(e) => setNewRoom(e.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
