import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

export default function ShowQuestions({ questions }) {
    const [show, setShow] = useState(false);
    const [difficulty, setDifficulty] = useState("");
    const [type, setType] = useState("");
    const [sortBy, setSortBy] = useState("difficulty"); // default sort option
    const [page, setPage] = useState(1);
    const pageSize = 6;

    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };

    const filteredQuestions = questions
        .filter((q) => {
            return (
                (difficulty ? q.difficulty === difficulty : true) &&
                (type ? q.type === type : true)
            );
        })
        .sort((a, b) => {
            if (sortBy === "difficulty") {
                return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
            } else if (sortBy === "type") {
                return a.type.localeCompare(b.type);
            }
            return 0;
        });

    // Pagination logic
    const totalPages = Math.ceil(filteredQuestions.length / pageSize);
    const start = (page - 1) * pageSize;
    const currentPageQuestions = filteredQuestions.slice(start, start + pageSize);

    useEffect(() => {
        setType("");
        setDifficulty("");
        setSortBy("difficulty");
        setShow(false);
        setPage(1);
    }, [questions]);

    return (
        <div className="space-y-4">
            <div className="flex justify-center">
                <button
                    onClick={() => setShow(!show)}
                    className="px-4 py-2 rounded-lg bg-[#3F72AF] text-white font-semibold shadow-md
                       hover:bg-[#112D4E] active:scale-95 transition mb-5"
                >
                    {show
                        ? `Hide ${filteredQuestions.length} Questions`
                        : `Show ${filteredQuestions.length} Questions`}
                </button>
            </div>

            {show && (
                <div className=" pt-3">
                    {/* Filters */}
                    <div className="flex justify-center flex-wrap gap-4 mb-6">
                        <select
                            value={difficulty}
                            onChange={(e) => {
                                setDifficulty(e.target.value);
                                setPage(1);
                            }}
                            className="px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Difficulties</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>

                        <select
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value);
                                setPage(1);
                            }}
                            className="px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Types</option>
                            <option value="multiple">Multiple Choice</option>
                            <option value="boolean">Single Choice</option>
                        </select>

                        {/* Sort By */}
                        <select
                            value={sortBy}
                            onChange={(e) => {
                                setSortBy(e.target.value);
                                setPage(1);
                            }}
                            className="px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="difficulty">Sort by Difficulty</option>
                            <option value="type">Sort by Type</option>
                        </select>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,0.25fr))] gap-8 p-8 justify-evenly">
                        {currentPageQuestions.length > 0 ? (
                            currentPageQuestions.map((q, idx) => (
                                <QuestionCard key={idx} question={q} />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center">
                                No questions found.
                            </p>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-6 pb-5 ">
                            <button
                                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                disabled={page === 1}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Prev
                            </button>
                            <span>
                Page {page} of {totalPages}
              </span>
                            <button
                                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                                disabled={page === totalPages}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
