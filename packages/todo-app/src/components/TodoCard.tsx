export interface TodoCardProps {
  className?: string;
  title: string;
  description: string;
  done: boolean;
}

function TodoCard({ className = "", title, description, done }: TodoCardProps) {
  return (
    <article
      className={`group relative border p-4 ${
        done ? "opacity-50" : ""
      } ${className}`}
    >
      <h3 className="text-xl">{title}</h3>
      <p className="text-sm">{description}</p>
    </article>
  );
}

export default TodoCard;
