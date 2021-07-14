import Button from "../../components/Button";

import logoImg from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";
import checkImg from "../../assets/images/check.svg";
import answerImg from "../../assets/images/answer.svg";
import emptyQuestionsImg from "../../assets/images/empty-questions.svg";

import "../../styles/room.scss";
import { RoomCode } from "../../components/RoomCode";
import { useHistory, useParams } from "react-router";
import { database } from "../../services/firebase";
import { Question } from "../../components/Question";
import { useRoom } from "../../hooks/useRoom";
import Modal from "../../components/Modal";
import { useState } from "react";
import toast from "react-hot-toast";

type RoomParams = {
  id: string;
};

export default function AdminRoom() {
  const params = useParams<RoomParams>();

  const roomId = params.id;

  const history = useHistory();
  const [showModalEndRoom, setShowModalEndRoom] = useState(false);
  const [showModalDeleteQuestion, setShowModalDeleteQuestion] = useState(false);
  const [questionSelected, setQuestionSelected] = useState<string>();

  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    try {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      });

      setShowModalEndRoom(false);

      history.push("/");
      toast.success("Sala encerrada com sucesso.");
    } catch (error) {
      toast.error("Ocorreu um erro ao encerrar a sala.");
    }
  }

  async function handleCheckQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleAnswerQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleDeleteQuestion() {
    try {
      await database
        .ref(`rooms/${roomId}/questions/${questionSelected}`)
        .remove();

      setQuestionSelected("");
      setShowModalDeleteQuestion(false);
      toast.success("Pergunta removida com sucesso.");
    } catch (error) {
      toast.error("Ocorreu um remover a pergunta.");
    }
  }

  return (
    <div className="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutline onClick={() => setShowModalEndRoom(true)}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>

        <div className="question-list">
          {questions.length > 0 ? (
            questions.map((question) => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  user={question.user}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleAnswerQuestion(question.id)}
                      >
                        <img src={checkImg} alt="Marcar com respondida" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCheckQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Marcar pergunta" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setQuestionSelected(question.id);
                      setShowModalDeleteQuestion(true);
                    }}
                  >
                    <img src={deleteImg} alt="Excluir pergunta" />
                  </button>
                </Question>
              );
            })
          ) : (
            <div className="empty">
              <img
                src={emptyQuestionsImg}
                alt="Nenhuma pergunta na nessa sala."
              />
              <h2>Nenhuma pergunta por aqui...</h2>
              <p>
                Envie o código desta sala para seus amigos e comece a responder
                perguntas!
              </p>
            </div>
          )}
        </div>
      </main>
      <Modal
        title="Encerrar sala"
        subTitle="Deseja realmente remover a sala?"
        isOpen={showModalEndRoom}
        onConfirm={handleEndRoom}
        onCancel={() => {
          setShowModalEndRoom(false);
        }}
      />
      <Modal
        title="Remover pergunta"
        subTitle="Deseja realmente remover a pergunta?"
        isOpen={showModalDeleteQuestion}
        onConfirm={handleDeleteQuestion}
        onCancel={() => {
          setQuestionSelected("");
          setShowModalDeleteQuestion(false);
        }}
      />
    </div>
  );
}
