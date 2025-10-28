import { getDb } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const db = getDb();

  const albums = await db
    .selectFrom("albums")
    .innerJoin("authors", "albums.author_id", "authors.id")
    .select([
      "albums.id",
      "albums.name",
      "albums.release_date",
      "authors.name as author_name",
      "authors.id as author_id",
    ])
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p data-cy="title" className="text-4xl font-bold">
          Spotify
        </p>
        <div data-cy="albumCardGrid" className="grid grid-cols-2 gap-4">
          {albums.map((album) => (
            <div
              data-cy="albumCard"
              key={album.id}
              className="card w-64 bg-base-100 shadow-sm"
            >
              <div className="card-body">
                <span className="badge badge-xs badge-warning">Pop</span>
                <h2 data-cy="albumTitle" className="text-3xl font-bold">
                  {album.name}
                </h2>

                <p>
                  ID: <span data-cy="albumId">{album.id}</span>
                </p>
                <p>
                  Author:{" "}
                  <Link href={`/author/${album.author_id}`}>
                    {album.author_name}
                  </Link>
                </p>
                <p>
                  Release Date: {new Date(album.release_date).toDateString()}
                </p>
                <div className="mt-6">
                  <Link
                    data-cy="detailButton"
                    className="btn btn-primary btn-block"
                    href={`/album/${album.id}`}
                  >
                    Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer
        data-cy="footer"
        className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"
      >
        <p>Footer</p>
      </footer>
    </div>
  );
}
