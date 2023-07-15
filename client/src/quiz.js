import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";

const QuizDisplay = () => {
    const navigate = useNavigate()
    const [quizData, setQuizData] = useState([]);
    const [owner, setOwner] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [chosenOptions, setChosenOptions] = useState([]);
    const { quizid } = useParams();
    const [submitted, setsubmitted] = useState(false)
    const [Score, setScore] = useState(0);
    const [numberaken, setnumbertaken] = useState()
    const [thakenBy, settakenBy] = useState([])
    const [currquizName, setcurrquizName] = useState('')
    const [currquizdesc, setcurrquizdesc] = useState('')
    const [quizBy, setquizBy] = useState('')

    let temp
    useEffect(() => {
        axios
            .get(`http://localhost:3500/quiz/${quizid}`, { withCredentials: true })
            .then((res) => {
                if (res.data == 'error') {
                    navigate('/')
                }

                const { quizname, quiz, quizdesc, quizid, userid, numberoftimestaken, takenby } = res.data[1];
                setQuizData(quiz);
                setLoaded(true);
                setcurrquizName(quizname)
                setcurrquizdesc(quizdesc)
                setquizBy(res.data[2])
                if (res.data[0] == eval(userid)) {
                    setnumbertaken(numberoftimestaken)
                    settakenBy(takenby)
                    setOwner(true)
                } else {
                    setOwner(false)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [quizid]);

    const handleOptionChange = (questionIndex, event, optionIndex) => {
        const updatedOptions = [...chosenOptions];
        updatedOptions[questionIndex] = optionIndex + 1;
        setChosenOptions(updatedOptions);

    };

    const handleSubmit = async () => {
        if (!submitted) {
            temp = 0
            for (let i = 0; i < chosenOptions.length; i++) {
                if (chosenOptions[i] == parseInt(quizData[i].correctOption)) {
                    temp++
                }
            }
            await axios.patch(`http://localhost:3500/quiz/${quizid}`, { score: temp, total: quizData.length }, { withCredentials: true }).then((res) => console.log(res))
            setsubmitted(true)
            setScore(temp)
        } else {
            console.log('already submitted')
        }

    };

    return (
        <div >
            <Navbar />
            <div className="quizpage">

                {owner && <div className="historyofquiz">
                    <h2>History of <br /> {currquizName}</h2>
                    <h4>by {quizBy}</h4>
                    <hr />
                    <h3>Number of times taken {numberaken}</h3>

                    {(numberaken > 0) &&

                        thakenBy.map((taken, takenIndex) => (
                            <div className='takenby' key={takenIndex}>
                                <label>{taken[0]} with score {taken[1]} out of {quizData.length}</label>
                            </div>

                        ))}


                </div>}
                {submitted && <h2>Submitted, You scored {Score} out of {quizData.length} </h2>}
                {!owner && loaded && !submitted && (
                    <div className="quiz">
                        <h2>{currquizName} <br /> by {quizBy}</h2>
                        <h3>{currquizdesc}</h3>
                        {quizData.map((questionData, questionIndex) => (
                            <div className='takingQuiz' key={questionIndex}>
                                <h2> {questionIndex + 1} {questionData.question}</h2>
                                <ul>
                                    {questionData.options.map((option, optionIndex) => (
                                        <div className="radios" key={optionIndex}>
                                            <input
                                                type="radio"
                                                id={`question${questionIndex}-option${optionIndex}`}
                                                name={`question${questionIndex}`}
                                                value={option}
                                                checked={chosenOptions[questionIndex] === optionIndex + 1}
                                                onChange={(event) => handleOptionChange(questionIndex, event, optionIndex)}
                                            />
                                            <label htmlFor={`question${questionIndex}-option${optionIndex}`} style={{ fontSize: '2vmin' }} className="quizRadio">
                                                {optionIndex + 1} {option}
                                            </label>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <button type="button" id='submitquiz' onClick={handleSubmit}>
                            Submit Quiz
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizDisplay;
