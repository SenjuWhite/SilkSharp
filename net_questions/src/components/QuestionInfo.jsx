import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/styles.css";
import { getQuestionLinks, getQuestion, getTimecodes } from "../services/api";
import loading from '../images/loading.svg';
const QuestionInfo = () => {
  const { id } = useParams();
  const [questionInfo, setQuestionInfo] = useState([]);
  const [questionLink, setQuestionLink] = useState([]);
  const [timecode, setTimecode] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionResult = await getQuestion(id);
        const linkResult = await getQuestionLinks(id);
        const timecodeResult = await getTimecodes(id);
        setQuestionInfo(questionResult.data);
        setQuestionLink(linkResult.data);
        setTimecode(timecodeResult.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
    console.log(timecode);
  }, []);
  return (
    questionInfo.questionAnswer == null ? <div className="loading-div"> <img src={loading} className="loading"></img></div> : (
    <div   
      className="container-fluid mt-25"
      style={{ textDecoration: "none", color: "white" }}
    >
      <div className="row center-mob">
        <div className="col-6 ml-75 object-mob">
    
          <div className="p-4 title-font bold-font">
            {questionInfo.questionInfo}
          </div>
          <div
            className=" card  border-success p-3 table-font"
            style={{
              borderRadius: "15px",
              textDecoration: "none",
              color: "inherit",
              textAlign: "justify",
              backgroundColor: "#10a37f",
              
              
              
            
            }}
          >
            <h5 style={{color:"black"}}>{questionInfo.questionAnswer == "-" ? "Це питання не має чіткої відповіді, оскільки є особистим для кожного кандидата." : questionInfo.questionAnswer}</h5>
          </div>
          {questionInfo.questionAnswer != "-" &&(
          <div className="mt-25 col-8 object-mob">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{ fontSize: "1.3rem" }}
                    className="p-3 th-border"
                  >
                    Тут ви можете знайти більш детальну інформацію:
                  </th>
                </tr>
              </thead>
              <tbody>
                {questionLink.map((ql) => (
                  <tr className="table-active  border-top-green ">
                    <td>
                      <a
                        href={ql}
                        target="_blank"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <i class="bi bi-link m-1"></i>Дізнатися більше
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )
}
        </div>
        <div className="col-5 p4 ml-25  truncated-text m2 q-example-mob">
          <table className="table table-hover ">
            <thead>
              <tr>
                <th scope="col" className="p-3 th-border" style={{ fontSize: "1.3rem"}}>
                  Приклади відповідей
                </th>
              </tr>
            </thead>
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
    )
  );
};
export default QuestionInfo;
