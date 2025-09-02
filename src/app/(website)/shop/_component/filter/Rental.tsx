"use client";

const Rental = () => {
  const labels = [
    {
      id: 1,
      label: "Available Near Me",
    },
    {
      id: 2,
      label: "4-Day Rental",
    },
    {
      id: 3,
      label: "8-DAY RENTAL",
    },
  ];

  return (
    <div className="space-y-4">
      {labels.map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          <input className="h-4 w-4" type="checkbox" id="XXS" />
          <label
            htmlFor="XXS"
            className="font-avenir tracking-[0.2rem] opacity-75 uppercase"
          >
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Rental;
