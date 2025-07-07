interface Post {
  id: string;
  title: string;
  content: string;
}

// export const getStaticPaths = (async () => {
//     return {
//       paths: [
//         {
//           params: {
//             name: 'next.js',
//           },
//         }, // See the "paths" section below
//       ],
//       fallback: true, // false or "blocking"
//     }
//   }) satisfies GetStaticPaths

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const posts = [
    {
      id: "1",
      title: "test",
      content: "test",
    },
    {
      id: "2",
      title: "test",
      content: "test",
    },
  ];
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  console.log("params", await params);

  const { id } = await params;
  // 有后端接口改成接口调用
  const post: Post = {
    id,
    title: "test",
    content: "test",
  };
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}
