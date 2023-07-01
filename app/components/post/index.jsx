import { formatISO9075 } from "date-fns";
import Link from "next/link";
import domain from "@/utils/config";
export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <div className="post">
      <div className="image">
        <Link href={`/post/${_id}`}>
          <img src={`${domain}${cover}`} alt="" />
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
