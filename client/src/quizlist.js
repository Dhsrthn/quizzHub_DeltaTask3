import { Link } from "react-router-dom";


const QuizList = ({ Quizzes }) => {
    return (
        <div className="quiz-list">
            {
                Quizzes.map(quiz => (
                    <div className="quizpreview" key={quiz.quizid}>
                        <Link to={`/quiz/${quiz.quizid}`} style={{ textDecoration: 'none' }}>
                            <h3>{quiz.quizname}</h3>
                            <h4>by {quiz.user}</h4>
                            <p>Description: {quiz.quizdesc[0]}</p>
                        </Link>
                    </div>
                ))
            }


        </div>

    );
}

export default QuizList;