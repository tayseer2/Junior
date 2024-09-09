export default function Starting() {
  return (
    <div className="box absolute z-30 left-0 top-0 w-80  bg-blue-900 p-20 rounded-xl">
      <div className="content p-4 absolute left-0 top-0">
        <div className="flex items-center justify-between mt-3 -mr-3">
          <div className="title flex flex-col items-start">
            <h1 className="text-white text-2xl font-bold">Junior&apos;la</h1>
            <span className="text-white text-md mt-3">Sohbet et</span>
          </div>
          <img
            src="/junior-logo.jpg"
            alt="Junior Logo"
            className="rounded-full w-24 h-24"
          />
        </div>
        <p className="text-gray-200 text-xl mt-12">
          Merhaba! Herhangi bir sorunuz <br/> varsa. Yardım etmek için <br/> buradayım.
        </p>
      </div>

      <img
        src="/wave.svg"
        alt="Wavy background"
        className="wave absolute -z-10 left-0 w-full"
      />
    </div>
  );
}
