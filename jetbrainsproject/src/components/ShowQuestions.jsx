import {useEffect, useState} from "react";
import QuestionCard from "./QuestionCard";

export default function ShowQuestions({ questions }) {
    const [show, setShow] = useState(false);
    const [difficulty, setDifficulty] = useState("");
    const [type, setType] = useState("");

    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };

    const filteredQuestions = questions
        .filter((q) => {
            return (
                (difficulty ? q.difficulty === difficulty : true) &&
                (type ? q.type === type : true)
            );
        })
        .sort((a, b) => {
            return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        });

    useEffect(() => {
        setType("");
        setDifficulty("");
        setShow(false);
    }, [questions]);

    return (
        <div className="space-y-4">

            <div className="flex justify-center">
                <button
                    onClick={() => setShow(!show)}
                    className="px-4 py-2 rounded-lg bg-[#3F72AF] text-white font-semibold shadow-md
                       hover:bg-[#112D4E] active:scale-95 transition "
                >
                    {show ? `Hide ${filteredQuestions.length} Questions` : `Show ${filteredQuestions.length} Questions`}
                </button>
            </div>


            {show && (
                <div>
                    <div className="flex justify-center gap-4 mb-6">
                        {/* Difficulty filter */}
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Difficulties</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>

                        {/* Type filter */}
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Types</option>
                            <option value="multiple">Multiple Choice</option>
                            <option value="boolean">Single Choice</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,0.25fr))] gap-8 p-8 justify-evenly">
                        {filteredQuestions.length > 0 &&
                            filteredQuestions.map((q, idx) => (
                                <QuestionCard key={idx} question={q} />
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
}
