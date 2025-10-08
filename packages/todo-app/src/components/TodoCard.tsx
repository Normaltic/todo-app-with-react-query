export interface TodoCardProps {
  title: string;
  description: string;
  done: boolean;
  onClick?: () => void;
}

function TodoCard({ title, description, done, onClick }: TodoCardProps) {
  return (
    <article
      className={`group relative border p-4 ${done ? "opacity-50" : ""}`}
      onClick={onClick}
    >
      <h3 className="text-xl">{title}</h3>
      <p className="text-sm">{description}</p>
    </article>
  );
}

export default TodoCard;
