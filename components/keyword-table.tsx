"use client";

import { useMemo, useState } from "react";
import { KeywordRow } from "@/types";

export function KeywordTable({ rows }: { rows: KeywordRow[] }) {
  const [filter, setFilter] = useState("");

  const data = useMemo(
    () => rows.filter((item) => item.keyword.toLowerCase().includes(filter.toLowerCase())),
    [rows, filter]
  );

  return (
    <div className="space-y-3">
      <input
        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2"
        placeholder="Filter keyword"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="overflow-x-auto rounded border border-slate-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-900">
            <tr>
              <th className="p-2">Keyword</th><th className="p-2">Niche</th><th className="p-2">Source</th>
              <th className="p-2">Priority</th><th className="p-2">Status</th><th className="p-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-t border-slate-800">
                <td className="p-2">{row.keyword}</td>
                <td className="p-2">{row.niche}</td>
                <td className="p-2">{row.source}</td>
                <td className="p-2">{row.priority_score}</td>
                <td className="p-2">{row.status}</td>
                <td className="p-2">{new Date(row.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
