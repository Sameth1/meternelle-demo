export default function SectionDivider() {
  return (
    <div
      className="flex w-full items-center justify-center gap-4 py-8"
      aria-hidden
    >
      <span className="h-px max-w-[120px] flex-1 bg-[var(--stone)] sm:max-w-[200px]" />
      <span className="text-[0.6rem] text-[var(--stone)]">✦</span>
      <span className="h-px max-w-[120px] flex-1 bg-[var(--stone)] sm:max-w-[200px]" />
    </div>
  );
}
