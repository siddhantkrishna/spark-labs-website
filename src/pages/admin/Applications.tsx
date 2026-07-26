import { useEffect, useMemo, useState } from "react";
import { Download, Search, StickyNote, Trash2 } from "lucide-react";
import {
  AdminButton,
  AdminCard,
  AdminField,
  AdminModal,
  AdminSection,
  LoadingState,
  EmptyState,
  Select,
  StatusPill,
  TextArea,
  TextInput,
} from "@/components/admin/AdminUI";
import { deleteRow, listAll, updateRow, type ApplicationRow } from "@/services/content";

const STATUSES: ApplicationRow["status"][] = ["new", "contacted", "enrolled", "rejected"];

export default function AdminApplications() {
  const [rows, setRows] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | ApplicationRow["status"]>("all");
  const [selected, setSelected] = useState<ApplicationRow | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    setLoading(true);
    const data = await listAll<ApplicationRow>("applications", { orderBy: "created_at", ascending: false });
    setRows(data);
    setLoading(false);
  };
  useEffect(() => { refresh(); }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (status !== "all" && r.status !== status) return false;
      if (!q) return true;
      return [r.student_name, r.parent_name, r.email, r.phone, r.city].some((v) => (v ?? "").toLowerCase().includes(q));
    });
  }, [rows, query, status]);

  const open = (row: ApplicationRow) => { setSelected(row); setNotes(row.notes ?? ""); };
  const close = () => setSelected(null);

  const updateStatus = async (row: ApplicationRow, next: ApplicationRow["status"]) => {
    const updated = await updateRow("applications", row.id, { status: next });
    setRows((prev) => prev.map((r) => (r.id === row.id ? (updated as ApplicationRow) : r)));
    if (selected?.id === row.id) setSelected(updated as ApplicationRow);
  };

  const saveNotes = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const updated = await updateRow("applications", selected.id, { notes });
      setRows((prev) => prev.map((r) => (r.id === selected.id ? (updated as ApplicationRow) : r)));
      setSelected(updated as ApplicationRow);
    } finally { setSaving(false); }
  };

  const remove = async (row: ApplicationRow) => {
    if (!confirm(`Delete application from ${row.student_name}?`)) return;
    await deleteRow("applications", row.id);
    setRows((prev) => prev.filter((r) => r.id !== row.id));
    if (selected?.id === row.id) close();
  };

  const exportCsv = () => {
    const headers = ["Created", "Student", "Parent", "Email", "Phone", "Age", "City", "State", "Batch", "Status"];
    const csv = [
      headers.join(","),
      ...filtered.map((r) => [
        new Date(r.created_at).toISOString(),
        r.student_name, r.parent_name, r.email, r.phone, r.age, r.city, r.state, r.preferred_batch, r.status,
      ].map(csvCell).join(",")),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url; a.download = `spark-applications-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminSection
      title="Applications"
      description="Every admission enquiry, in one place. Search, update status, take notes, and export to CSV."
      actions={
        <AdminButton variant="ghost" onClick={exportCsv} disabled={filtered.length === 0}>
          <Download className="h-4 w-4" /> Export CSV
        </AdminButton>
      }
    >
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <TextInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, phone or city…"
            className="pl-11"
          />
        </div>
        <div className="w-full sm:w-56">
          <Select value={status} onChange={(e) => setStatus(e.target.value as "all" | ApplicationRow["status"])}>
            <option value="all">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
        </div>
      </div>

      <AdminCard className="overflow-hidden">
        {loading ? (
          <LoadingState />
        ) : filtered.length === 0 ? (
          <EmptyState title="No applications match" description="Try a different search or clear the filters." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-line bg-paper text-[11px] font-semibold tracking-[0.14em] text-faint uppercase">
                <tr>
                  <th className="px-5 py-3">Student</th>
                  <th className="hidden px-5 py-3 md:table-cell">Contact</th>
                  <th className="hidden px-5 py-3 md:table-cell">Batch</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-[13.5px]">
                {filtered.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-accent-tint/30">
                    <td className="px-5 py-3">
                      <p className="font-semibold text-ink">{r.student_name}</p>
                      <p className="font-mono text-[11px] text-faint">Age {r.age} · {r.city}</p>
                    </td>
                    <td className="hidden px-5 py-3 md:table-cell">
                      <p className="text-ink">{r.email}</p>
                      <p className="font-mono text-[11px] text-faint">{r.phone}</p>
                    </td>
                    <td className="hidden px-5 py-3 text-mute md:table-cell">{r.preferred_batch}</td>
                    <td className="px-5 py-3">
                      <StatusPill status={r.status} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <button onClick={() => open(r)} className="rounded-full p-2 text-mute hover:bg-accent-tint hover:text-accent" aria-label="View & notes">
                          <StickyNote className="h-4 w-4" />
                        </button>
                        <button onClick={() => remove(r)} className="rounded-full p-2 text-mute hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10" aria-label="Delete">
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

      {/* Details modal */}
      <AdminModal open={!!selected} onClose={close} title="Application details" wide>
        {selected && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field k="Student">{selected.student_name}</Field>
              <Field k="Parent">{selected.parent_name}</Field>
              <Field k="Email"><a className="text-accent" href={`mailto:${selected.email}`}>{selected.email}</a></Field>
              <Field k="Phone"><a className="text-accent" href={`tel:${selected.phone}`}>{selected.phone}</a></Field>
              <Field k="Age">{selected.age}</Field>
              <Field k="Class / School">{selected.student_class ?? "—"} · {selected.school ?? "—"}</Field>
              <Field k="Location">{selected.city}, {selected.state}</Field>
              <Field k="Experience">{selected.experience}</Field>
              <Field k="Preferred batch">{selected.preferred_batch}</Field>
              <Field k="Contact time">{selected.preferred_contact_time}</Field>
              <Field k="Source">{selected.source}</Field>
              <Field k="Submitted">{new Date(selected.created_at).toLocaleString()}</Field>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-[11px] tracking-[0.12em] text-mute uppercase">Motivation</p>
              <p className="rounded-xl border border-line-2 bg-paper p-4 text-[14px] leading-relaxed text-ink">{selected.motivation}</p>
            </div>

            <AdminField label="Status">
              <Select value={selected.status} onChange={(e) => updateStatus(selected, e.target.value as ApplicationRow["status"])}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </Select>
            </AdminField>

            <AdminField label="Internal notes" hint="Visible only to admins.">
              <TextArea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Called on 12 Jan, will attend counseling Saturday…" />
            </AdminField>

            <div className="flex items-center justify-end gap-3 border-t border-line pt-4">
              <AdminButton variant="ghost" onClick={close}>Close</AdminButton>
              <AdminButton onClick={saveNotes} loading={saving}>Save notes</AdminButton>
            </div>
          </div>
        )}
      </AdminModal>
    </AdminSection>
  );
}

function Field({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">{k}</p>
      <p className="mt-0.5 text-[14px] text-ink">{children}</p>
    </div>
  );
}

function csvCell(v: unknown) {
  const s = String(v ?? "");
  if (/[,"\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}
