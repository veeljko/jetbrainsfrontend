import { useState } from "react";
import logo from "../assets/logo.svg";

export default function Header({ categories, onSelect }) {
    const [selected, setSelected] = useState("All");

    const handleChange = (e) => {
        const value = e.target.value;
        setSelected(value);
        onSelect(value);
    };

    return (
        <header className="w-full bg-[#DBE2EF] shadow-md p-5 flex flex-col justify-center md:flex-row md:items-center md:justify-between">
            <div className="max-w-[500px]">
                <a href="#">
                    <img src={logo} className="w-90 h-auto hidden md:block" />
                </a>
            </div>



            <div className="flex flex-col md:flex-row items-center gap-2 overflow-clip">
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
                    className="border border-gray-500 bg-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
