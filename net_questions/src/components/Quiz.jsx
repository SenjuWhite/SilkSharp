import React, { useEffect, useState, useRef } from "react";
import { getQuestionLinks, getQuestions, getTimecodes, getQuestion } from "../services/api";
import loading from "../images/loading.svg";
import QuizGPT from "./QuizGPT";
import { motion, AnimatePresence } from "framer-motion";

const Quiz = () => {
  const [questionInfo, setQuestionInfo] = useState({});
  const [questionLink, setQuestionLink] = useState([]);
  const [timecode, setTimecode] = useState([]);
  const [data, setData] = useState([]);

  // Refs for accordion items and buttons
  const accordionRefs = {
    collapseOne: useRef(null),
    collapseTwo: useRef(null),
    collapseThree: useRef(null),
  };

  const buttonRefs = {
    buttonOne: useRef(null),
    buttonTwo: useRef(null),
    buttonThree: useRef(null),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getQuestions();
        const randomId = Math.ceil(Math.random() * (result.data.length - 1));
        const questionResult = await getQuestion(randomId);
        const linkResult = await getQuestionLinks(randomId);
        const timecodeResult = await getTimecodes(randomId);
        setQuestionLink(linkResult.data);
        setTimecode(timecodeResult.data);
        setData(result.data);
        setQuestionInfo(questionResult.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const changeQuestion = async () => {
    const randomId = Math.ceil(Math.random() * (data.length - 1));
    const questionResult = await getQuestion(randomId);
    const linkResult = await getQuestionLinks(randomId);
    const timecodeResult = await getTimecodes(randomId);
    setQuestionInfo(questionResult.data);
    setQuestionLink(linkResult.data);
    setTimecode(timecodeResult.data);

    // Закриття всіх відкритих accordion і зняття виділення
    Object.values(accordionRefs).forEach((ref) => {
      if (ref.current && ref.current.classList.contains("show")) {
        ref.current.classList.remove("show");
      }
    });

    // Зняття виділення з активних кнопок
    Object.values(buttonRefs).forEach((ref) => {
      if (ref.current && !ref.current.classList.contains("collapsed")) {
        ref.current.classList.add("collapsed");
      }
    });
  };

  return questionInfo.questionAnswer == null ? (
    <div className="loading-div">
      <img src={loading} className="loading" alt="Loading..." />
    </div>
  ) : (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container-fluid mt-25"
        style={{ textDecoration: "none", color: "white" }}
      >
        <div className="row center-mob">
          <div className="col-6 ml-50 mt-25 object-mob">
            <div className="p-4 title-font bold-font" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {questionInfo.questionInfo}
            </div>
            <div className="col-9 ml-25">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      ref={buttonRefs.buttonOne}
                    >
                      Натисніть, щоб побачити відповідь на питання
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    ref={accordionRefs.collapseOne}
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <strong>
                        {questionInfo.questionAnswer == "-"
                          ? "Це питання не має чіткої відповіді, оскільки є особистим для кожного кандидата."
                          : questionInfo.questionAnswer}
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                      ref={buttonRefs.buttonTwo}
                    >
                      Приклади відповідей
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    ref={accordionRefs.collapseTwo}
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <table className="table table-hover">
                        <tbody>
                          {timecode.map((tc, index) => (
                            <tr key={index} className="table-active border-top-green tr-hover">
                              <td>
                                <a
                                  className="truncated-text"
                                  href={`${tc.link}&t=${tc.timecode}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    display: "flex",
                                  }}
                                >
                                  <i className="bi bi-youtube" style={{ marginRight: "5px" }}></i>
                                  {tc.interviewName}
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                      ref={buttonRefs.buttonThree}
                    >
                      Джерела
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    ref={accordionRefs.collapseThree}
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {questionLink.length === 0 ? (
                        <strong>Для цього питання немає джерел</strong>
                      ) : (
                        <table className="table table-hover">
                          <tbody>
                            {questionLink.map((ql, index) => (
                              <tr key={index} className="table-active border-top-green tr-hover">
                                <td>
                                  <a
                                    href={ql}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                      textDecoration: "none",
                                      color: "inherit",
                                    }}
                                  >
                                    <i className="bi bi-link m-1"></i>Дізнатися більше
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-outline-success mt-25" onClick={changeQuestion}>
                Змінити питання
              </button>
            </div>
          </div>
          <div className="col-5 chat-mob vh80">
            <QuizGPT question={questionInfo.questionInfo} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Quiz;
