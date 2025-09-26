import { useEffect, useState } from "react";
import Example from "./Example.jsx";
import he from "he";
import Header from "./Header.jsx";
import QuestionCard from "./QuestionCard.jsx";
import MyPieChart from "./MyPieChard.jsx";
import ShowQuestions from "./ShowQuestions.jsx";


//See the distribution of questions by category
function setDataCategory(data){
    const map = new Map();
    for (let i=0;i<data.length;i++){
        const category = data[i].category;
        if (map.has(category)) map.set(category, map.get(category) + 1);
        else map.set(category, 1);
    }


    const ans = [];
    for (const [category, count] of map.entries()) {
        ans.push({
            name: he.decode(category),
            value: count
        });
    }

    return ans;
}
//See the distribution of questions by difficulty
function setDataDifficulty(data){
    const map = new Map();
    for (let i=0;i<data.length;i++){
        const difficulty = data[i].difficulty;
        if (map.has(difficulty)) map.set(difficulty, map.get(difficulty) + 1);
        else map.set(difficulty, 1);
    }


    const ans = [];
    for (const [difficulty, count] of map.entries()) {
        ans.push({
            name: difficulty,
            value: count
        });
    }

    return ans;
}

function setDataQuestionType(data){
    const map = new Map();
    for (let i=0;i<data.length;i++){
        const type = data[i].type;
        if (map.has(type)) map.set(type, map.get(type) + 1);
        else map.set(type, 1);
    }


    const ans = [];
    for (const [type, count] of map.entries()) {
        ans.push({
            name: (type === "multiple" ? "Multiple" : "Single"),
            value: count
        });
    }

    return ans;
}

function getAllCategories(data) {
    const cat = new Set();
    for (let i=0;i<data.length;i++){
        const category = data[i].category;
        cat.add(he.decode(category));
    }

    return [...cat].sort();
}

function TriviaStats() {
    const [data, setData] = useState([]);
    const [stats, setStats] = useState(null);
    const [targetCategory, setTargetCategory] = useState([]);

    function onSelect(targetCategoryName){
        const ans = [];
        for (let i=0;i<data.length;i++){
            let category = he.decode(data[i].category);
            if (category === he.decode(targetCategoryName)){
                ans.push(data[i]);
            }
        }
        console.log(ans);
        setTargetCategory(ans);
    }

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch("https://opentdb.com/api.php?amount=50");
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const d = await res.json();
                setData((prev) => [...d.results]);
                console.log(d.results);
            } catch (err) {

            } finally {

            }
        };
        fetchQuestions();
    }, []);


    return (<>
            <Header categories={getAllCategories(data)} onSelect={onSelect} />
            {targetCategory.length <= 0 ?
                (
                <div className="flex p-3">
                    <Example data={setDataCategory(data)} />
                    <div className="w-[60%]"><MyPieChart data={setDataDifficulty(data)} /></div>
                </div>
                )
                    :
                (
                <div className="">
                    <div className="flex p-3">
                        <MyPieChart data={setDataQuestionType(targetCategory)} />
                        <MyPieChart data={setDataDifficulty(targetCategory)} />
                    </div>

                    <ShowQuestions questions={targetCategory}/>

                </div>
            )}

        </>
    );
}

export default TriviaStats;