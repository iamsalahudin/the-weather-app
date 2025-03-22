import { SyncLoader } from "react-spinners";

export default function WaitDisplay({ type, data }) {
  return (
    <div
      className={`flex sm:py-10 py-3 px-5 bg-black items-center justify-center w-screen h-screen overflow-hidden bg-bottom bg-cover bg-no-repeat`}
      style={{ backgroundImage: `url(/images/loaderBG.jpg)` }}
    >
      <main className="isolate px-2 py-5 w-full h-full flex flex-col items-center justify-center space-y-12 rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 text-white drop-shadow-lg">
        <h1 className="text-center sm:text-6xl text-4xl font-bold">
          Weather App
        </h1>
        {type == "fetch" && <SyncLoader color="#fff" />}
        <p className="text-center sm:text-2xl text-lg">{data}</p>
      </main>
    </div>
  );
}
