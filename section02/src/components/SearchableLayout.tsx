import { useRouter } from "next/router";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import style from "./SearchableLayout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const q = router.query.q as string;

  const [search, setSearch] = useState("");

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  const onSubmit = useCallback(() => {
    if (search === "") return router.push("/search");
    if (!search || q === search) return;

    router.push(`/search?q=${search}`);
  }, [search, q, router]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") return onSubmit();
    },
    [onSubmit]
  );

  useEffect(() => {
    if (!q) setSearch("");
    setSearch(q);
  }, [q]);

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          type="text"
          placeholder="검색어를 입력하세요 ..."
          value={search ?? ""}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
