const Options = ({ options, setOption, handleClose }) => {
  return (
    <div className="border border-primary">
      <div>
        {options.map((option) => (
          <div onClick={() => setOption(option)}>This is a option</div>
        ))}
      </div>

      <button role="button" onClick={handleClose}>
        DONE
      </button>
    </div>
  );
};

export default Options;
