import { useEffect, useState } from "react";

export function useSqlTranspiler({
  defaultRead,
  defaultWrite,
}: {
  defaultRead?: string;
  defaultWrite?: string;
} = {}) {
  const [sql, setSql] = useState("");
  const [read, setRead] = useState(defaultRead || "");
  const [write, setWrite] = useState(defaultWrite || "");
  const [transpiledSql, setTranspiledSql] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!sql.trim()) {
        setTranspiledSql("");
        setError("");
      }

      if (!sql.trim() || !read || !write) {
        return;
      }

      const request = new Request(
        `${import.meta.env.VITE_API_URL}/api/sql/transpile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sql, read, write }),
        }
      );

      try {
        const response = await fetch(request);

        if (!response.ok) {
          const data = await response.json();
          setError(data.errors[0].description);
          return;
        }

        setError("");
        const data = await response.json();

        setTranspiledSql(data.results[0]);
      } catch (e) {
        console.error(e);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [sql, read, write]);

  return {
    sql,
    setSql,
    read,
    setRead,
    write,
    setWrite,
    transpiledSql,
    error,
  };
}
