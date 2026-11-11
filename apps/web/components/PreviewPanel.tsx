import type { PropertyPreview } from "@pls/types";
import { formatLastTouch } from "../lib/format";

export function PreviewPanel({ preview }: { preview: PropertyPreview }) {
  const p = preview.property;
  return (
    <aside className="preview">
      <strong>{p.address}</strong>
      <div className="muted">{p.city} {p.zip} · APN {p.apn}</div>
      <div className="muted">Owner: {p.ownerName ?? "—"}</div>

      <h3>Touches, last 90 days</h3>
      {preview.touches.length === 0 ? (
        <p className="muted">No touches in the last 90 days.</p>
      ) : (
        <ul>
          {preview.touches.map((t) => (
            <li key={t.id}>
              {formatLastTouch(t.happenedAt)} · {t.kind}: {t.summary}
            </li>
          ))}
        </ul>
      )}

      <h3>Campaign history</h3>
      {preview.campaigns.length === 0 ? (
        <p className="muted">Not in any campaign yet.</p>
      ) : (
        <ul>
          {preview.campaigns.map((c) => (
            <li key={c.campaignId + c.addedAt}>
              {c.name} · added {formatLastTouch(c.addedAt)}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
