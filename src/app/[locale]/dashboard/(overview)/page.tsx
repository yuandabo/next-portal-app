import { auth } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";

export default async function Page() {
  const session = await auth(); // 获取当前用户信息
  if (!session) return <p>未登录</p>;
  // Connect to the Neon database
  const sql = neon(`${process.env.DATABASE_URL}`);
  // 查询所有评论
  const comments = await sql`SELECT * FROM comments`;
  console.log(comments, "comments");

  return (
    <div>
      <h2>Comments:</h2>
      <ul>
        {comments.map((row: Record<string, string>, idx: number) => (
          <li key={row.id ?? idx}>{row.comment}</li>
        ))}
      </ul>
    </div>
  );
}
