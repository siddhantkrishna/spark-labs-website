import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import type { AdmissionPayload, SubmissionStatus } from "@/types";
import { submitAdmission } from "@/services/admissions";
import {
  BATCHES,
  CLASS_OPTIONS,
  CONTACT_TIMES,
  EXPERIENCE_LEVELS,
  PROGRAM,
  SITE,
} from "@/constants/site";
import { trackEvent } from "@/services/analytics";

const EMPTY: AdmissionPayload = {
  studentName: "",
  parentName: "",
  email: "",
  phone: "",
  age: "",
  school: "",
  studentClass: "",
  city: "",
  state: "Chhattisgarh",
  experience: EXPERIENCE_LEVELS[0],
  motivation: "",
  preferredBatch: BATCHES[0].name,
  preferredContactTime: CONTACT_TIMES[0],
  consent: false,
  company: "",
};

type Errors = Partial<Record<keyof AdmissionPayload, string>>;

function validate(v: AdmissionPayload): Errors {
  const e: Errors = {};
  if (v.studentName.trim().length < 2) e.studentName = "Please enter the student's full name.";
  if (v.parentName.trim().length < 2) e.parentName = "Please enter the parent's / guardian's name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (!/^[6-9]\d{9}$/.test(v.phone.trim())) e.phone = "Enter a valid 10-digit Indian mobile number.";
  const age = Number(v.age);
  if (!v.age || Number.isNaN(age) || age < PROGRAM.ageMin || age > PROGRAM.ageMax)
    e.age = `Age must be between ${PROGRAM.ageMin} and ${PROGRAM.ageMax}.`;
  if (v.city.trim().length < 2) e.city = "Please enter your city.";
  if (v.state.trim().length < 2) e.state = "Please enter your state.";
  if (v.motivation.trim().length < 10) e.motivation = "Tell us a little more (at least 10 characters).";
  if (!v.consent) e.consent = "Please confirm consent to be contacted.";
  return e;
}

export function AdmissionForm() {
  const [form, setForm] = useState<AdmissionPayload>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const update =
    (k: keyof AdmissionPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value =
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value;
      setForm((f) => ({ ...f, [k]: value }));
      if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`field-${firstKey}`)?.focus();
      return;
    }
    setStatus("submitting");
    setServerError("");
    trackEvent("admission_submit_attempt", { batch: form.preferredBatch });

    const result = await submitAdmission(form, "admissions");
    if (result.ok) {
      setStatus("success");
      navigate("/application-submitted", { state: { name: form.studentName } });
    } else {
      setStatus("error");
      setServerError(result.message);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" aria-label="Admissions application form">
      {/* Honeypot — visually hidden, off-screen; bots fill it, humans don't. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="field-company">Company (leave blank)</label>
        <input
          id="field-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={update("company")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="studentName" label="Student's full name" value={form.studentName} onChange={update("studentName")} error={errors.studentName} autoComplete="name" required />
        <TextField id="parentName" label="Parent / guardian name" value={form.parentName} onChange={update("parentName")} error={errors.parentName} required />
        <TextField id="email" label="Email address" type="email" value={form.email} onChange={update("email")} error={errors.email} autoComplete="email" required />
        <TextField id="phone" label="Parent's mobile (10 digits)" type="tel" value={form.phone} onChange={update("phone")} error={errors.phone} inputMode="numeric" required />
        <TextField id="age" label="Student's age" value={form.age} onChange={update("age")} error={errors.age} inputMode="numeric" placeholder={`${PROGRAM.ageMin} – ${PROGRAM.ageMax}`} required />
        <SelectField id="studentClass" label="Class / grade" value={form.studentClass} onChange={update("studentClass")} error={errors.studentClass} options={["Select…", ...CLASS_OPTIONS]} />
        <TextField id="school" label="School name" value={form.school} onChange={update("school")} error={errors.school} />
        <TextField id="city" label="City" value={form.city} onChange={update("city")} error={errors.city} required />
        <TextField id="state" label="State" value={form.state} onChange={update("state")} error={errors.state} required />
        <SelectField id="experience" label="Previous coding experience" value={form.experience} onChange={update("experience")} options={[...EXPERIENCE_LEVELS]} />
        <SelectField id="preferredBatch" label="Preferred batch" value={form.preferredBatch} onChange={update("preferredBatch")} options={BATCHES.map((b) => `${b.name} · ${b.time}`)} valueOptions={BATCHES.map((b) => b.name)} />
        <SelectField id="preferredContactTime" label="Best time to contact you" value={form.preferredContactTime} onChange={update("preferredContactTime")} options={[...CONTACT_TIMES]} />
      </div>

      <div>
        <FieldLabel htmlFor="field-motivation">Why do you want to join Spark Labs? *</FieldLabel>
        <textarea
          id="field-motivation"
          value={form.motivation}
          onChange={update("motivation")}
          rows={4}
          className={fieldCls(!!errors.motivation)}
          placeholder="What's your child curious about? Any ideas they'd love to build?"
          aria-invalid={!!errors.motivation}
          aria-describedby={errors.motivation ? "err-motivation" : undefined}
        />
        {errors.motivation && <ErrorText id="err-motivation">{errors.motivation}</ErrorText>}
      </div>

      <label className="flex items-start gap-3">
        <input
          id="field-consent"
          type="checkbox"
          checked={form.consent}
          onChange={update("consent")}
          className="mt-1 h-4 w-4 shrink-0 rounded border-line-2 text-accent focus:ring-accent"
          aria-invalid={!!errors.consent}
        />
        <span className="text-[13.5px] leading-relaxed text-mute">
          I consent to Spark Labs ({SITE.legalName}) contacting me about admissions via phone, email
          or WhatsApp, and I agree to the{" "}
          <a href="/privacy" className="font-semibold text-accent underline">
            Privacy Policy
          </a>
          . *
        </span>
      </label>
      {errors.consent && <ErrorText id="err-consent">{errors.consent}</ErrorText>}

      {status === "error" && serverError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-[14px] text-red-700"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-[15px] font-semibold text-white shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
            </>
          ) : (
            <>
              Apply Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
        <p className="font-mono text-[11px] tracking-wide text-faint">
          Max {PROGRAM.batchSize} seats per batch · We reply within 24 hours
        </p>
      </div>
    </form>
  );
}

/* ---------------- field primitives ---------------- */

const fieldCls = (err: boolean) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-faint outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15 ${
    err ? "border-red-400" : "border-line-2"
  }`;

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block font-mono text-[11px] font-medium tracking-[0.12em] text-mute uppercase">
      {children}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1 text-[12.5px] text-red-500">
      {children}
    </p>
  );
}

interface TextFieldProps {
  id: keyof AdmissionPayload;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "numeric" | "tel" | "text";
}

function TextField({ id, label, value, onChange, error, type = "text", placeholder, required, autoComplete, inputMode }: TextFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={`field-${id}`}>
        {label} {required && "*"}
      </FieldLabel>
      <input
        id={`field-${id}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={fieldCls(!!error)}
        aria-invalid={!!error}
        aria-describedby={error ? `err-${id}` : undefined}
      />
      {error && <ErrorText id={`err-${id}`}>{error}</ErrorText>}
    </div>
  );
}

interface SelectFieldProps {
  id: keyof AdmissionPayload;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  valueOptions?: string[];
  error?: string;
}

function SelectField({ id, label, value, onChange, options, valueOptions, error }: SelectFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={`field-${id}`}>{label}</FieldLabel>
      <select
        id={`field-${id}`}
        value={value}
        onChange={onChange}
        className={fieldCls(!!error)}
        aria-invalid={!!error}
      >
        {options.map((opt, i) => (
          <option key={opt} value={valueOptions ? valueOptions[i] : opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <ErrorText id={`err-${id}`}>{error}</ErrorText>}
    </div>
  );
}
