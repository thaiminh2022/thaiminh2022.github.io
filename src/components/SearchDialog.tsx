import React, { useMemo, useState } from "react";
import Fuse from "fuse.js";

type Props = {
    searchLists: BlogDataSlug[];
};
type BlogDataSlug = {
    slug: string;
    blogData: BlogData;
};
// Configs fuse.js
// https://fusejs.io/api/options.html
const searchOptions = {
    keys: [
        "blogData.title",
        "blogData.description",
        "blogData.tags",
        "slug",
        "blogData.author",
    ],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5,
};

function SearchDialog(props: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const posts = useMemo(() => {
        const fuse = new Fuse(props.searchLists, searchOptions);
        const searchResults = fuse.search(searchQuery).map((r) => r.item);
        console.log(searchResults);

        return searchResults;
    }, [searchQuery]);

    return (
        <dialog
            className="mx-auto h-1/4 w-4/5 rounded-md border-2 border-highlight-med-light dark:border-highlight-med-dark p-3 dark:text-text-dark md:h-1/2 bg-overlay-light dark:bg-overlay-dark"
            id="searchDialog"
        >
            <div className="wrapper flex flex-col gap-y-3 ">
                <div className="flex flex-row align-middle">
                    <label htmlFor="search" className="text-2xl font-semibold">
                        What to search?
                    </label>
                    <button
                        className="ml-auto flex justify-center align-middle text-4xl"
                        id="closeSearchBtn"
                    >
                        <i className="bx bx-x text-rose-light dark:text-rose-dark"></i>
                    </button>
                </div>
                <input
                    type="search"
                    required
                    id="search"
                    min="2"
                    max="24"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                    className="w-full rounded-md border-2 p-2 text-xl border-highlight-low-light dark:border-highlight-low-dark bg-surface-light dark:bg-surface-dark"
                    placeholder="Enter your search term"
                />
                <ul className="mt-3 flex flex-col gap-y-3 divide-y-2 divide-dashed divide-highlight-low-light p-3 dark:divide-highlight-low-dark">
                    {posts &&
                        posts.map((post) => (
                            <li className="w-full" key={post.slug}>
                                <a href={`/blog/${post.slug}`}>
                                    <h2 className="font-bold underline">{post.blogData.title}</h2>
                                    <p>{post.blogData.description}</p>
                                </a>
                            </li>
                        ))}
                </ul>
            </div>
        </dialog>
    );
}

export default SearchDialog;
