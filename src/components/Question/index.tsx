import { ReactNode } from "react";
import cx from "classnames";

import "./style.scss";

type QuestionProps = {
  content: string;
  user: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export function Question({
  content,
  user,
  children,
  isAnswered,
  isHighlighted,
}: QuestionProps) {
  return (
    <div
      className={cx(
        "question",
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={user.avatar} alt={user.name} />
          <span>{user.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
