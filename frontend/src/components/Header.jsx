import { faBookReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <h1 className="text-4xl font-bold p-8 flex gap-4 items-center bg-sky-100 w-screen justify-center">
      <FontAwesomeIcon icon={faBookReader} />
      StoryBook
    </h1>
  );
}