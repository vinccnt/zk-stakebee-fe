export default function Footer() {
  return (
    <div className="relative block w-full flex-grow-0 rounded-t-3xl bg-secondary px-4 py-2 md:hidden">
      <div className="mx-auto flex w-[80%] flex-wrap">
        <div className="my-1 flex w-1/2 flex-col gap-y-1">
          <h2 className="text-xs">Total Value Restaked</h2>
          <span className=" text-xl">$12,123</span>
        </div>
        <div className="my-1 flex w-1/2 flex-col gap-y-1">
          <h2 className="text-xs">APR</h2>
          <span className=" text-xl">12%</span>
        </div>
        <div className="my-1 flex w-1/2 flex-col gap-y-1">
          <h2 className="text-xs">EigenLayer Points</h2>
          <span className=" text-xl">2.23B</span>
        </div>
        <div className="my-1 flex w-1/2 flex-col gap-y-1">
          <h2 className="text-xs">Stakebee Points</h2>
          <span className=" text-xl">1.13B</span>
        </div>
      </div>
    </div>
  );
}
