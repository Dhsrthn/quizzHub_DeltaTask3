import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateQuizForm = () => {
    const navigate = useNavigate()
    const [currentUser, setcurrentUser] = useState('')
    const [quizNo, setquizNo] = useState('')
    const [quizDesc, setquizDesc] = useState('')
    const [quizID, setquizID] = useState('')

    useEffect(() => {
        axios.get("http://localhost:3500/users/currentuser", { withCredentials: true }).then((res) => {
            if (res.data == 'error') {
                navigate('/')
            }
            setcurrentUser(res.data.username);
            setquizNo(res.data.noquizzes);
        })
    }, []);

    useEffect(() => {
        const currentQuiz = JSON.stringify(quizNo + 1);
        const current = currentQuiz.substring(1, currentQuiz.length - 1);
        setquizName(currentUser + "'s Quiz " + current);
        setquizID(currentUser + current);
    }, [quizNo, currentUser])

    const toSend = []
    const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], correctOption: "" }]);
    const [quizName, setquizName] = useState('')

    const handleQuestionChange = (index, event) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = event.target.value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, event) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
        setQuestions(updatedQuestions);
    };

    const handleCorrectOptionChange = (questionIndex, event) => {
        if (event.target.value == 1 || event.target.value == 2 || event.target.value == 3 || event.target.value == 4 || event.target.value == '') {
            const updatedQuestions = [...questions];
            updatedQuestions[questionIndex].correctOption = event.target.value;
            setQuestions(updatedQuestions);
        }

    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: "", options: ["", "", "", ""], correctOption: "" }]);
    };

    const handleSubmit = (event) => {
        toSend.push([quizName])
        toSend.push([quizDesc])
        toSend.push(questions)
        toSend.push(quizID)
        event.preventDefault();
        axios.post('http://localhost:3500/quiz', { toSend }, { withCredentials: true }).then(() => { navigate(`/profile/${currentUser}`) }).catch((err) => console.log(err))
    };

    const handleQuiznameChange = (event) => {
        setquizName(event.target.value);
    };

    const handleQuizDesc = (event) => {
        setquizDesc(event.target.value)
    }


    return (
        <div className="create-quiz-form">
            <Navbar />
            <div className="actuallycreate">
                <h1>Create Quiz</h1>
                <h2> user {currentUser}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="quizdeets">
                        <div className="quizname">
                            <label > Quizname:  </label>
                            <input type="text" value={quizName} onChange={(event) => handleQuiznameChange(event)} />
                        </div>
                        <div className="quizdesc">
                            <label> Quiz Description:  </label>
                            <input type="text" onChange={(event) => handleQuizDesc(event)} />
                        </div>
                    </div>

                    {questions.map((question, questionIndex) => (
                        <div className="actualquest" key={questionIndex}>
                            <label>Question {questionIndex + 1}:</label>
                            <input
                                type="text"
                                value={question.question}
                                onChange={(event) => handleQuestionChange(questionIndex, event)}
                                style={{ width: '69vw' }}
                                required
                            />
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex}>
                                    <label>Option {optionIndex + 1}:</label>
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(event) => handleOptionChange(questionIndex, optionIndex, event)}
                                        required
                                    />
                                </div>
                            ))}
                            <label>Correct Option:(enter option number 1/2/3/4)</label>
                            <input
                                type="text"
                                value={question.correctOption}
                                onChange={(event) => handleCorrectOptionChange(questionIndex, event)} style={{ width: '12vw' }}
                                required
                            />
                        </div>
                    ))}
                    <button id='addquestion' type="button" onClick={handleAddQuestion}>
                        Add Question
                    </button>
                    <button id='submitquestion' type="submit">Submit Quiz</button>
                </form>
            </div>
        </div>
    );
};

export default CreateQuizForm;
