"use client";

interface HeadersProps {
  setTab: (tab: string) => void;
  tab: string;
}

const Headers = ({ setTab, tab }: HeadersProps) => {
  return (
    <div className="">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 pb-2 gap-4 lg:pt-12">
        <h1 className="sub-title text-lg">WELCOME BACK, X</h1>
        <nav className="flex flex-wrap items-center justify-start md:justify-center gap-4 sm:gap-6 md:gap-12 text-xs">
          {["Account Info", "Chats", "Dispute"].map((label) => (
            <a
              key={label}
              onClick={() => setTab(label)}
              className={`uppercase font-normal text-[12px] cursor-pointer pb-2 ${
                tab === label ? "border-b border-black" : ""
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>
    </div>
  );
};

export default Headers;
