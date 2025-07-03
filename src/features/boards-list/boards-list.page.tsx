import { ROUTES } from "@/shared/model/routes";
import { href, Link } from "react-router-dom";

function BoardsListPage() {

  console.log(import.meta.env.VITE_API_BASE_URL);
  
  return (
    <div>
      <h1>Boards list</h1>

      <Link to={href(ROUTES.BOARD, {boardId: "1"})}>Board 1</Link>
    </div>
  );
}

export const Component = BoardsListPage;
