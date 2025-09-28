import { useEffect, useState } from "react";
import MyBarChart from "../components/MyBarChart.jsx";
import he from "he";
import Header from "../components/Header.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import MyPieChart from "../components/MyPieChard.jsx";
import ShowQuestions from "../components/ShowQuestions.jsx";
import Footer from "../components/Footer.jsx";

function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

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
            name: capitalize(he.decode(category)),
            value: count
        });
    }

    return ans;
}

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
            name: capitalize(difficulty),
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
    const [selected, setSelected] = useState("All");

    function onSelect(targetCategoryName){
        const ans = [];
        for (let i=0;i<data.length;i++){
            let category = he.decode(data[i].category);
            if (category === he.decode(targetCategoryName)){
                ans.push(data[i]);
            }
        }
        // console.log(ans);
        setTargetCategory(ans);
        setSelected(targetCategoryName);
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
                // console.log(d.results);
            } catch (err) {

            } finally {

            }
        };
        fetchQuestions();
    }, []);


    return (<div className="flex flex-col min-h-screen">
            <Header categories={getAllCategories(data)} onSelect={onSelect} setSelected={setSelected} selected={selected} />
            {targetCategory.length <= 0 ?
                (
                    <div className="flex-grow ">
                        <p className="bg-blue-300/25 pb-2 text-center text-3xl text-[#374151] font-semibold pt-5 font-sans">Distribution of {data.length} questions by category and difficulty</p>
                        <div className="flex flex-col sm:pt-0 pt-13 md:flex-row items-center justify-center px-5 gap-6 bg-blue-200/15 shadow-mg rounded-lg mb-5">
                            <div className="flex flex-col w-full h-full">
                                <MyBarChart data={setDataCategory(data)} onSelect={onSelect} />
                            </div>
                            <div className="w-[60%]">
                                <MyPieChart data={setDataDifficulty(data)} />
                            </div>
                        </div>
                        <ShowQuestions questions={data}/>
                    </div>
                )
                    :
                (
                <div className="flex-grow">
                    <p className="bg-blue-300/25 pb-2 text-center text-3xl text-[#374151] font-semibold pt-5 font-sans">Distribution of type and difficulty for category {he.decode(targetCategory[0].category)}</p>
                    <div className="flex p-3 flex-col sm:flex-row">
                        <MyPieChart data={setDataQuestionType(targetCategory)} />
                        <MyPieChart data={setDataDifficulty(targetCategory)} />
                    </div>

                    <ShowQuestions questions={targetCategory}/>

                </div>
            )}
        <Footer/>
        </div>
    );
}

export default TriviaStats;