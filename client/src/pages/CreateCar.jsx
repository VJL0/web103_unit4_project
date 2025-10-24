import { useEffect, useMemo, useState } from "react";

const CreateCar = ({ title }) => {
  // set title as a side effect
  useEffect(() => {
    document.title = title;
  }, [title]);

  const [isConvertible, setIsConvertible] = useState(false);
  const [carName, setCarName] = useState("");

  // make these arrays so map() is safe before fetch returns
  const [exterior, setExterior] = useState([]);
  const [interior, setInterior] = useState([]);
  const [roof, setRoof] = useState([]);
  const [wheels, setWheels] = useState([]);

  const [selectedExterior, setSelectedExterior] = useState(null);
  const [selectedInterior, setSelectedInterior] = useState(null);
  const [selectedRoof, setSelectedRoof] = useState(null);
  const [selectedWheels, setSelectedWheels] = useState(null);

  const [total, setTotal] = useState(65000);

  const [error, setError] = useState(false);

  useEffect(() => {
    const base = 65000;
    const sum =
      base +
      (Number(selectedExterior?.price) || 0) +
      (Number(selectedInterior?.price) || 0) +
      (Number(selectedRoof?.price) || 0) +
      (Number(selectedWheels?.price) || 0);
    setTotal(sum);
  }, [selectedExterior, selectedInterior, selectedRoof, selectedWheels]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [exteriors, interiors, roofs, wheels] = await Promise.all([
          fetch("/api/exterior").then((res) => res.json()),
          fetch("/api/interior").then((res) => res.json()),
          fetch("/api/roof").then((res) => res.json()),
          fetch("/api/wheels").then((res) => res.json()),
        ]);
        setExterior(exteriors || []);
        setInterior(interiors || []);
        setRoof(roofs || []);
        setWheels(wheels || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchAllData();
  }, []);

  // Tab state is just the label
  const [activeTab, setActiveTab] = useState(null);

  // Build items from current state; memoize so references are stable
  const items = useMemo(
    () => ({
      Exterior: {
        data: exterior,
        setter: setSelectedExterior,
        selected: selectedExterior,
      },
      Interior: {
        data: interior,
        setter: setSelectedInterior,
        selected: selectedInterior,
      },
      Roof: { data: roof, setter: setSelectedRoof, selected: selectedRoof },
      Wheels: {
        data: wheels,
        setter: setSelectedWheels,
        selected: selectedWheels,
      },
    }),
    [
      exterior,
      interior,
      roof,
      wheels,
      selectedExterior,
      selectedInterior,
      selectedRoof,
      selectedWheels,
    ]
  );

  const active = activeTab ? items[activeTab] : null;

  const handleSend = () => {
    // TODO: send create payload
    // e.g., { name: carName, isConvertible, selectedExterior, selectedInterior, selectedRoof, selectedWheels, total }
  };

  // helper: normalize whatever the API sends
  const optionRequiresConvertible = (opt) =>
    Boolean(opt?.isConvertible ?? opt?.isconvertible ?? opt?.convertible);

  // clear error when the switch changes
  useEffect(() => {
    setError(false);
  }, [isConvertible]);

  return (
    <div className="relative">
      <div className="bg-[rgba(0,0,0,0.8)] flex justify-between px-2">
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={isConvertible}
              onChange={() => setIsConvertible((v) => !v)}
            />
            Convertible
          </label>

          {Object.keys(items).map((label) => (
            <button
              key={label}
              role="button"
              onClick={() => setActiveTab(label)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-baseline gap-2">
          <input
            id="name"
            name="name"
            placeholder="My new car"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
            className="px-2 py-1"
          />
          <button role="button" onClick={handleSend} className="px-3 py-1">
            create
          </button>
        </div>
      </div>


      {error && (
        <div className="text-red-500 m-2">
          Error: Selected option is not compatible with current car type.
        </div>
      )}
      {active && (
        <div className="p-2 pb-0">
          {/* This was the crash: use active.data?.map, not selected.map */}
          <div className="border border-primary p-2">
            <div className="flex gap-2 flex-wrap">
              {active.data.map((opt) => (
                <button
                  key={opt.id}
                  className={`text-left px-2 py-1 border w-5 ${
                    active?.selected?.id == opt.id ? "bg-green-900!" : ""
                  }`}
                  onClick={() => {
                    const requiresConv = optionRequiresConvertible(opt);

                    // Block only when the option requires convertible but the switch is OFF
                    if (requiresConv && !isConvertible) {
                      setError(true);
                      return;
                    }

                    setError(false);
                    active.setter(opt);
                    setActiveTab(null);
                  }}
                >
                  <img className="w-5 h-5" src={opt.image} alt="" />
                  <div>{opt.name}</div>
                  <div>${opt.price}</div>
                </button>
              ))}
              {active.data.length === 0 && (
                <div className="opacity-70">No options loaded yet…</div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex m-2">
        <h2 className="  bg-primary px-3 py-0.5">TOTAL💰: ${total}</h2>
      </div>
    </div>
  );
};

export default CreateCar;
