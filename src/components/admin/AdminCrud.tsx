import { useEffect, useState, type ReactNode } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { deleteRow, insertRow, listAll, updateRow, type TableName } from "@/services/content";
import {
  AdminButton,
  AdminCard,
  AdminField,
  AdminModal,
  AdminSection,
  Checkbox,
  EmptyState,
  LoadingState,
  Select,
  TextArea,
  TextInput,
} from "./AdminUI";

/** Field definition — powers both the list columns and the editor form. */
export interface CrudField<T> {
  key: keyof T & string;
  label: string;
  type: "text" | "textarea" | "url" | "number" | "checkbox" | "select" | "tags";
  options?: string[];
  hint?: string;
  showInList?: boolean;
  /** Optional formatter for list display. */
  format?: (v: unknown, row: T) => ReactNode;
}

interface AdminCrudProps<T extends { id: string }> {
  title: string;
  description?: string;
  table: TableName;
  fields: CrudField<T>[];
  orderBy?: string;
  ascending?: boolean;
  /** Default values for the "new" form. */
  defaults: Partial<T>;
  /** Optional label transforms for a row's title in the list. */
  rowTitle: (row: T) => string;
}

export function AdminCrud<T extends { id: string }>({
  title,
  description,
  table,
  fields,
  orderBy,
  ascending,
  defaults,
  rowTitle,
}: AdminCrudProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<T | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await listAll<T>(table, { orderBy, ascending });
      setRows(data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, [table]);

  const openNew = () => {
    setEditing({ ...(defaults as T), id: "" });
    setError(null);
    setModalOpen(true);
  };
  const openEdit = (row: T) => { setEditing({ ...row }); setError(null); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditing(null); };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      const { id, ...rest } = editing as unknown as { id: string } & Record<string, unknown>;
      const clean = normalize(rest as Partial<T>, fields);
      if (id) await updateRow(table, id, clean);
      else await insertRow(table, clean);
      await refresh();
      closeModal();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row: T) => {
    if (!confirm(`Delete "${rowTitle(row)}"? This can't be undone.`)) return;
    await deleteRow(table, row.id);
    setRows((prev) => prev.filter((r) => r.id !== row.id));
  };

  const listCols = fields.filter((f) => f.showInList);

  return (
    <AdminSection
      title={title}
      description={description}
      actions={
        <AdminButton onClick={openNew}>
          <Plus className="h-4 w-4" /> New
        </AdminButton>
      }
    >
      <AdminCard className="overflow-hidden">
        {loading ? (
          <LoadingState />
        ) : rows.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            description="Create your first entry — it'll appear on the public site immediately."
            action={<AdminButton onClick={openNew}><Plus className="h-4 w-4" /> Create the first one</AdminButton>}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-line bg-paper text-[11px] font-semibold tracking-[0.14em] text-faint uppercase">
                <tr>
                  <th className="px-5 py-3">Title</th>
                  {listCols.map((c) => (
                    <th key={c.key} className="hidden px-5 py-3 md:table-cell">{c.label}</th>
                  ))}
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-[14px]">
                {rows.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-accent-tint/30">
                    <td className="px-5 py-3 font-semibold text-ink">{rowTitle(row)}</td>
                    {listCols.map((c) => (
                      <td key={c.key} className="hidden px-5 py-3 text-mute md:table-cell">
                        {c.format ? c.format((row as Record<string, unknown>)[c.key], row) : String((row as Record<string, unknown>)[c.key] ?? "")}
                      </td>
                    ))}
                    <td className="px-5 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <button onClick={() => openEdit(row)} className="rounded-full p-2 text-mute hover:bg-accent-tint hover:text-accent" aria-label="Edit">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => remove(row)} className="rounded-full p-2 text-mute hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10" aria-label="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>

      <AdminModal open={modalOpen} onClose={closeModal} title={editing?.id ? "Edit entry" : "New entry"} wide>
        {editing && (
          <div className="space-y-4">
            {fields.map((f) => (
              <FieldEditor
                key={f.key}
                field={f}
                value={(editing as Record<string, unknown>)[f.key]}
                onChange={(v) => setEditing({ ...(editing as T), [f.key]: v } as T)}
              />
            ))}
            {error && (
              <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-2.5 text-[13px] text-red-700 dark:border-red-400/40 dark:bg-red-500/10">{error}</p>
            )}
            <div className="flex items-center justify-end gap-3 border-t border-line pt-4">
              <AdminButton variant="ghost" onClick={closeModal}>Cancel</AdminButton>
              <AdminButton onClick={save} loading={saving}>Save</AdminButton>
            </div>
          </div>
        )}
      </AdminModal>
    </AdminSection>
  );
}

/* ---------- Field editor ---------- */

function FieldEditor<T>({ field, value, onChange }: { field: CrudField<T>; value: unknown; onChange: (v: unknown) => void }) {
  switch (field.type) {
    case "textarea":
      return (
        <AdminField label={field.label} hint={field.hint}>
          <TextArea value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} rows={6} />
        </AdminField>
      );
    case "checkbox":
      return (
        <div className="pt-1">
          <Checkbox label={field.label} checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
          {field.hint && <p className="mt-1 text-[12px] text-faint">{field.hint}</p>}
        </div>
      );
    case "number":
      return (
        <AdminField label={field.label} hint={field.hint}>
          <TextInput type="number" value={value == null ? "" : String(value)} onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))} />
        </AdminField>
      );
    case "select":
      return (
        <AdminField label={field.label} hint={field.hint}>
          <Select value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)}>
            {(field.options ?? []).map((o) => <option key={o} value={o}>{o}</option>)}
          </Select>
        </AdminField>
      );
    case "tags":
      return (
        <AdminField label={field.label} hint={field.hint ?? "Comma-separated"}>
          <TextInput value={Array.isArray(value) ? (value as string[]).join(", ") : ""} onChange={(e) => onChange(e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} />
        </AdminField>
      );
    default:
      return (
        <AdminField label={field.label} hint={field.hint}>
          <TextInput value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />
        </AdminField>
      );
  }
}

/** Coerce values into Supabase-safe primitives. */
function normalize<T>(row: Partial<T>, fields: CrudField<T>[]): Record<string, unknown> {
  const out: Record<string, unknown> = { ...(row as Record<string, unknown>) };
  for (const f of fields) {
    const v = out[f.key];
    if (f.type === "number") out[f.key] = v === "" || v == null ? null : Number(v);
    if (f.type === "checkbox") out[f.key] = Boolean(v);
    if (f.type === "tags" && typeof v === "string") out[f.key] = (v as string).split(",").map((t) => t.trim()).filter(Boolean);
  }
  return out;
}
