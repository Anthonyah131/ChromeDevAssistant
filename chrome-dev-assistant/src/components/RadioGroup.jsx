function RadioGroup({ title, options, name, selectedValue, onChange }) {
  return (
    <div className="w-full p-2 text-center">
      <p className="font-bold">{title}</p>
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center mr-4">
          <input
            type="radio"
            name={name}
            value={option.value}
            className="text-blue-500"
            onChange={() => onChange(option.value)}
            checked={selectedValue === option.value}
          />
          <span className="font-semibold ml-2">{option.label}</span>
        </label>
      ))}
    </div>
  );
}

export default RadioGroup;
