import he from "he"; // decode HTML entities like &amp;, &quot;

function QuestionCard({ question }) {
    const { type, difficulty, category, question: q, correct_answer, incorrect_answers } = question;

    // Decode text to handle HTML entities
    const decodedQuestion = he.decode(q);
    const decodedCorrect = he.decode(correct_answer);
    const decodedIncorrect = incorrect_answers.map((ans) => he.decode(ans));

    return (
        <div className="bg-blue-300/15 rounded-xl shadow-md hover:shadow-2xl p-4 space-y-3 border border-gray-200">
            {/* Category + Difficulty */}
            <div className="flex justify-between items-center text-sm text-gray-600 ">
                <span className="font-semibold">{he.decode(category)}</span>
                <span className="capitalize px-2 py-0.5 rounded-full bg-blue-300/25">
          {difficulty}
        </span>
            </div>

            <p className="font-medium text-gray-800">{decodedQuestion}</p>
            <p className="text-xs text-gray-500 italic">Type: {type === "boolean" ? "single" : type}</p>

            <div className="mt-2">
                <p className="text-sm font-semibold text-green-600">
                    ✅ Correct Answer:
                </p>
                <p className="text-gray-700">{decodedCorrect}</p>
            </div>


            <div>
                <p className="text-sm font-semibold text-red-600">❌ Incorrect Answers:</p>
                <ul className="list-disc list-inside text-gray-700">
                    {decodedIncorrect.map((ans, i) => (
                        <li key={i}>{ans}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default QuestionCard;