export default function PageBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="animate-blob absolute -top-32 left-1/4 w-[34rem] h-[34rem] bg-violet-600/[0.07] dark:bg-violet-600/[0.14] rounded-full blur-[130px]" />
      <div className="animate-blob-slow absolute top-[38%] -right-32 w-[30rem] h-[30rem] bg-indigo-600/[0.06] dark:bg-indigo-600/[0.12] rounded-full blur-[130px]" />
      <div className="animate-blob absolute bottom-0 -left-24 w-[28rem] h-[28rem] bg-fuchsia-600/[0.04] dark:bg-fuchsia-600/[0.08] rounded-full blur-[130px]" />
      <div className="absolute inset-x-0 top-0 h-[560px] bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_70%_100%_at_50%_0%,black,transparent)]" />
    </div>
  );
}
