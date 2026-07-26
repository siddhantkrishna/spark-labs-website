import { useCallback, useEffect, useRef, useState } from "react";
import { Copy, Loader2, Trash2, Upload, Check } from "lucide-react";
import { deleteMedia, listAll, updateRow, uploadMedia, type MediaRow } from "@/services/content";
import { AdminCard, AdminSection, EmptyState, LoadingState } from "@/components/admin/AdminUI";

export default function AdminMedia() {
  const [rows, setRows] = useState<MediaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const refresh = async () => {
    setLoading(true);
    const data = await listAll<MediaRow>("media", { orderBy: "created_at", ascending: false });
    setRows(data);
    setLoading(false);
  };
  useEffect(() => { refresh(); }, []);

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    setUploading(true); setError(null);
    try {
      const uploaded: MediaRow[] = [];
      for (const file of Array.from(files)) {
        const row = await uploadMedia(file);
        uploaded.push(row);
      }
      setRows((prev) => [...uploaded, ...prev]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally { setUploading(false); }
  }, []);

  const remove = async (row: MediaRow) => {
    if (!confirm("Delete this file? Any pages referencing its URL will break.")) return;
    await deleteMedia(row);
    setRows((prev) => prev.filter((r) => r.id !== row.id));
  };

  const copy = async (row: MediaRow) => {
    await navigator.clipboard.writeText(row.url);
    setCopied(row.id);
    setTimeout(() => setCopied(null), 1500);
  };

  const updateAlt = async (row: MediaRow, alt: string) => {
    const updated = await updateRow("media", row.id, { alt });
    setRows((prev) => prev.map((r) => (r.id === row.id ? (updated as MediaRow) : r)));
  };

  return (
    <AdminSection
      title="Media library"
      description="Upload once, reuse anywhere. Copy the URL and paste it into a blog cover image, project screenshot, or testimonial photo."
    >
      {/* Uploader */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files); }}
        className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
          dragOver ? "border-accent bg-accent-tint/50" : "border-line-2 bg-paper"
        }`}
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-accent-tint text-accent">
          {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
        </span>
        <p className="mt-4 font-display text-[15px] font-bold text-ink">Drop files here or</p>
        <button
          onClick={() => fileInput.current?.click()}
          className="mt-2 rounded-full bg-accent px-5 py-2 text-[13.5px] font-semibold text-white transition hover:bg-accent-deep"
        >
          Choose files
        </button>
        <input
          ref={fileInput}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && uploadFiles(e.target.files)}
          className="hidden"
        />
        <p className="mt-3 font-mono text-[11px] tracking-wide text-faint">
          Images only · optimised by Supabase Storage
        </p>
        {error && <p className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-[13px] text-red-700 dark:border-red-400/40 dark:bg-red-500/10">{error}</p>}
      </div>

      {/* Grid */}
      {loading ? (
        <LoadingState />
      ) : rows.length === 0 ? (
        <EmptyState title="No media yet" description="Uploaded images appear here with their public URLs." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <AdminCard key={row.id} className="overflow-hidden">
              <div className="aspect-video overflow-hidden bg-line">
                <img src={row.url} alt={row.alt ?? ""} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="space-y-3 p-4">
                <input
                  defaultValue={row.alt ?? ""}
                  placeholder="Alt text (for accessibility)"
                  onBlur={(e) => e.target.value !== (row.alt ?? "") && updateAlt(row, e.target.value)}
                  className="w-full rounded-lg border border-line-2 bg-paper px-3 py-2 text-[13px] text-ink placeholder:text-faint outline-none focus:border-accent"
                />
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => copy(row)}
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-mute hover:text-accent"
                  >
                    {copied === row.id ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy URL</>}
                  </button>
                  <button onClick={() => remove(row)} className="rounded-full p-1.5 text-mute hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10" aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </AdminSection>
  );
}
