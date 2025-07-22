function Page({ comments }: { comments: Record<string, string>[] }) {
  return (
    <ul>
      {comments.map((row: Record<string, string>, idx: number) => (
        <li key={row.id ?? idx}>{row.comment}</li>
      ))}
    </ul>
  );
}

export default Page;
