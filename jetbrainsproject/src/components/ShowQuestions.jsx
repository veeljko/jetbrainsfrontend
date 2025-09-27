import { useState } from "react";
import QuestionCard from "./QuestionCard";

export default function ShowQuestions({ questions }) {
    const [show, setShow] = useState(false);

    return (
        <div className="space-y-4">

            <div className="flex justify-center">
                <button
                    onClick={() => setShow(!show)}
                    className="px-4 py-2 rounded-lg bg-[#3F72AF] text-white font-semibold shadow-md
                       hover:bg-[#112D4E] active:scale-95 transition "
                >
                    {show ? `Hide ${questions.length} Questions` : `Show ${questions.length} Questions`}
                </button>
            </div>


            {show && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,0.25fr))] gap-8 p-8 justify-evenly">
                    {questions.map((category, index) => (
                        <QuestionCard key={index} question={category} />
                    ))}
                </div>
            )}
        </div>
    );
}
