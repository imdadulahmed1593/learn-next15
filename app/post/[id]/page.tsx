import { prisma } from "@/app/utils/db";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(id: string) {
  const data = await prisma.blogPost.findUnique({
    where: {
      id: id,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

// this is a dynamic route, but to make it a static page, we can use generateStaticParams
// this will generate the static params for the page, i.e. the id of the post
// this is useful for SEO and performance, as it will generate the page at build time and not at runtime
// this will also make the page a static page, not a dynamically rendered one
// export async function generateStaticParams() {
//   const posts = await prisma.blogPost.findMany({
//     select: {
//       id: true,
//     },
//   });

//   return posts.map((post) => ({
//     id: post.id,
//   }));
// }

type Params = Promise<{ id: string }>;
const SinglePostPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const data = await getData(id);
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link className={buttonVariants({ variant: "secondary" })} href="/">
        Back to Posts
      </Link>

      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative size-10 overflow-hidden rounded-full">
              <Image
                src={data.authorImage}
                alt={data.authorName}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-medium">{data.authorName}</p>
          </div>
          <p className="text-gray-500 text-sm">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(data.createdAt)}
          </p>
        </div>
      </div>

      <div className="relative w-full mb-8 overflow-hidden rounded-lg h-[400px]">
        <Image
          priority
          src={data.imageUrl}
          alt={data.title}
          fill
          className="object-cover"
        />
      </div>

      <Card>
        <CardContent>
          <p className="text-gray-700">{data.content}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SinglePostPage;
