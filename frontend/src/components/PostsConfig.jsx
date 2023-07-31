/* eslint-disable react/prop-types */
import Dropdown from "./Dropdown";

const sortFields = [
  { value: "datePosted", label: "Date posted" },
  { value: "lastUpdated", label: "Last updated" },
];

const sortOrders = [
  { value: "desc", label: "newest" },
  { value: "asc", label: "oldest" },
];

const filterFields = [
  { label: "Title", value: "title" },
  { label: "Content", value: "content" },
];

export default function PostsConfig({
  setSortBy,
  setSortOrder,
  setFilterBy,
  handleFilterChange,
}) {
  return (
    <>
      <div className="flex gap-4 p-4 flex-col sm:flex-row">
        <Dropdown
          label={"Sort by"}
          options={sortFields}
          setOption={(option) => setSortBy(option)}
        />
        <Dropdown
          label={"Sort order"}
          options={sortOrders}
          setOption={(option) => setSortOrder(option)}
        />
      </div>
      <div className="flex flex-col items-center sm:flex-row gap-4 p-4">
        <Dropdown
          label={"Filter by"}
          options={filterFields}
          setOption={(option) => setFilterBy(option)}
        />
        <Filterbar handleChange={handleFilterChange} />
      </div>
    </>
  );
}

function Filterbar({ handleChange }) {
  return (
    <div className="">
      <input
        onChange={handleChange}
        className="rounded-xl p-2 shadow w-80 sm:w-96 text-slate-500"
      />
    </div>
  );
}
