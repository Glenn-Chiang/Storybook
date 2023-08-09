/* eslint-disable react/prop-types */

export default function Dropdown({ label, options, setOption }) {
  const handleChange = event => {
    setOption(event.target.value)
  }
  return (
    <div className="flex gap-2 items-center">
      <label htmlFor={label}>{label}</label>
      <select onChange={handleChange} id={label} className="capitalize rounded-xl p-2 shadow">
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}