import {
  getQuestionLinks,
  getQuestions,
  getTimecodes,
  getQuestion,
} from "../services/api";
import React, { useEffect, useState } from "react";
import QuizGPT from "./QuizGPT";
import {motion, AnimatePresence, delay} from "framer-motion";
const Quiz = () => {
  const [questionInfo, setQuestionInfo] = useState({});
  const [questionLink, setQuestionLink] = useState([]);
  const [timecode, setTimecode] = useState([]);
  const [data, setData] = useState([]);
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
  };
  return (
    questionInfo.questionAnswer == null ? "" : (
      <AnimatePresence>
    <motion.div initial={{opacity:0}} animate={{opacity:1}} 
      className="container-fluid mt-25"
      style={{ textDecoration: "none", color: "white" }}
    >
      <div className="row center-mob vh80"  >
        <div className="col-6   ml-50  mt-25 object-mob">
          <div className="p-4 title-font bold-font" initial={{opacity:0}} animate={{opacity:1}} >
            {questionInfo.questionInfo}
          </div>
          <div className="col-9 ml-25">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    fdprocessedid="qiy2f"
                  >
                    Натисніть, щоб побачити відповідь на питання
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <strong>
                      {questionInfo.questionAnswer == "-"
                        ? "Це питання не має чіткої відповіді, оскільки є особистим для кожного кандидата."
                        : questionInfo.questionAnswer}
                    </strong>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                    fdprocessedid="mtw10o"
                  >
                    Приклади відповідей
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                  
                      <table className="table table-hover ">
                        <tbody>
                          {timecode.map((tc) => (
                            <tr className="table-active  border-top-green ">
                              <td>
                                <a
                                  className="truncated-text"
                                  href={`${tc.link}&t=${tc.timecode}`}
                                  target="_blank"
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    display: "flex",
                                  }}
                                >
                                  <i
                                    className="bi bi-youtube"
                                    style={{ marginRight: "5px" }}
                                  ></i>
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
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                    fdprocessedid="272t0t"
                  >
                    Джерела
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                  { questionLink.length == 0 ? (
                      <strong>Для цього питання немає джерел</strong>
                    ) : (
                    <table className="table table-hover ">
                      <tbody>
                        {questionLink.map((ql) => (
                          <tr className="table-active  border-top-green ">
                            <td>
                              <a
                                href={ql}
                                target="_blank"
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                <i class="bi bi-link m-1"></i>Дізнатися більше
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
            <button className="btn btn-outline-success mt-25" onClick={()=>{changeQuestion()}}>Змінити питання</button>
          </div>
        
        </div>
        <div className="col-5 chat-mob"><QuizGPT question={questionInfo.questionInfo}></QuizGPT></div>
      </div>
     
      </motion.div>
      </AnimatePresence>)
  );
};

export default Quiz;
