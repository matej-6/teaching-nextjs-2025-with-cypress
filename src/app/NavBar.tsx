"use client";

import Link from "next/link";
import { useState } from "react";

export function NavBar() {
  const [searchInput, setSearchInput] = useState("");

  console.log("NavBar render searchInput:", searchInput);

  const searchLinkQuery = searchInput !== "" ? { q: searchInput } : {};

  return (
    <div data-cy="navbar" className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link data-cy="headerTitle" href="/" className="btn btn-ghost text-xl">
          Spotify
        </Link>
      </div>
      <div className="flex gap-2">
        <input
          data-cy="searchInput"
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <Link
          data-cy="searchButton"
          href={{
            pathname: "/search",
            query: searchLinkQuery,
          }}
          className="btn btn-ghost text-xl"
        >
          Search
        </Link>
      </div>
    </div>
  );
}
