import domain from "@/src/utils/config";
import { formatISO9075 } from "date-fns";
import Link from "next/link";
import Image from "next/image";
export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  const imageStyle = {
    objectFit: "cover",
    objectPosition: "center center",
    width: "100%",
  };
  return (
    <div className="post">
      <div className="image">
        <Link href={`/post/${_id}`}>
          <Image src={cover} width={300} height={300} style={imageStyle} />
        </Link>
      </div>
      <div className="texts">
        <Link href={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
