export async function GET() {
  const categories = [
    { slug: "clothes" },
    { slug: "shoes" },
    { slug: "electronics" },
  ];

  return Response.json(categories);
}
