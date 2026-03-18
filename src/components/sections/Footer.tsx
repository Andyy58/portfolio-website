export default function Footer() {
  return (
    <section id="footer" className="w-full pb-12 flex flex-col items-center">
      <div className="text-xs font-mono text-text-muted/40 tracking-widest uppercase text-center w-full">
        © {new Date().getFullYear()} ANDY YANG. ALL RIGHTS RESERVED.
      </div>
    </section>
  );
}