import { useState } from "react";

export default function Header({ categories, onSelect }) {
    const [selected, setSelected] = useState("All");

    const handleChange = (e) => {
        const value = e.target.value;
        setSelected(value);
        onSelect(value);
    };

    return (
        <header className="w-full bg-white shadow-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
                Survey Visualizer integration
            </h1>

            <div className="flex items-center gap-2">
                <label
                    htmlFor="category-select"
                    className="text-sm font-medium text-gray-600"
                >
                    Category:
                </label>
                <select
                    id="category-select"
                    value={selected}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="All">All</option>
                    {categories.map((cat, i) => (
                        <option key={i} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>
        </header>
    );
}
