import { useHistory } from "react-router-dom";

import toast from "react-hot-toast";

import Button from "../../components/Button";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import googleIconImg from "../../assets/images/google-icon.svg";

import { FiLogIn } from "react-icons/fi";

import "../../styles/auth.scss";

import { useAuth } from "../../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../../services/firebase";

export default function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();

    if (roomCode.trim() === "") {
      toast.error("Informe um código de sala.");
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error("Código de sala inválido.");
      return;
    }

    if (roomRef.val().endedAt) {
      toast("Sala já foi encerrada.");
      return;
    }

    history.push(`rooms/${roomCode}`);
  }

  return (
    <div className="page-auth">
      <aside>
        <img src={illustrationImg} alt="LetMeAsk" />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilha conhecimento com outras pessoas</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk" />
          <Button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com o Google
          </Button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              <FiLogIn size={24} />
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
