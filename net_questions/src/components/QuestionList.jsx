import React, { useEffect, useState } from "react";
import { getQuestions } from "../services/api";
import "../styles/styles.css";
import { Link } from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";
import loading from '../images/loading.svg'
const QuestionList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState(0);
  const [searchData, setSearchData] = useState("");
  const filteredData =
    selectedOption == 0
      ? data.filter((obj) =>
          obj.questionInfo.toLowerCase().includes(searchData)
        )
      : data
          .filter((obj) => obj.interviewLevel.includes(String(selectedOption)))
          .filter((obj) => obj.questionInfo.toLowerCase().includes(searchData));
  const recordsPerPage = 20;
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredData.slice(firstIndex, lastIndex);
  let levelArray = [];
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;
    if (startPage <= 1) {
      startPage = 2;
      endPage = 6;
    }
    if (endPage >= totalPages) {
      endPage = totalPages - 1;
      startPage = totalPages - 5;
      if (startPage < 2) startPage = 2;
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getQuestions();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    data.length == 0 ? <div className="loading-div"> <img src={loading} className="loading"></img></div> : (
    <AnimatePresence>  
    <motion.div  initial={{opacity:0}} animate={{opacity:1}}  className="container-fluid ">
      <div className="row">
        <div className=" col-5 col-2-5">
        <div className=" mt-75  ">
          <span className="" style={{ fontWeight: "bold", color: "white" }}>
            Фільтр
          </span>
         
          <select
            className="form-select mt-2 "
            onChange={(e) => {
              setSelectedOption(e.target.value);
              paginate(1);
            }}
          >
            <option value={0}>Всі</option>
            <option value={1}>Junior</option>
            <option value={2}>Middle</option>
            <option value={3}>Senior</option>
          </select>
        </div>
        </div>
        <div className="col-7 col-7-5 col-sm-12 mt-25">
          <form action="">
          <i class="bi bi-search"></i>
            <input
              type="search"
              placeholder="Пошук питання"
              onChange={(e) => {
                setSearchData(e.target.value.toLowerCase());
                paginate(1);
              }}
            ></input>
           
           
          </form>

          <table className="table table-hover  ">
            <thead>
              <tr className="th-border">
                <th scope="col">Шанс</th>
                <th scope="col">Питання</th>
                <th scope="col">Рівень</th>
              </tr>
            </thead>
            <tbody>
              
              {records.map(
                (question,index) => (
                  (levelArray = []),
                  (
                    <tr
                   
                      className="table-active  border-top-green tr-hover"
                      key={question.questionId}
                    >
                      <td className="text-center">
                        <Link
                          to={`/questionInfo/${question.questionId}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                          }}
                        >
                          {question.frequency}%
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/questionInfo/${question.questionId}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                          }}
                        >
                          {question.questionInfo}
                        </Link>
                      </td>

                      <td className="">
                        <Link
                          to={`/questionInfo/${question.questionId}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                          }}
                        >
                          {(() => {
                            const levelArray = [];
                            if (question.interviewLevel.includes("1"))
                              levelArray.push("Junior");
                            if (question.interviewLevel.includes("2"))
                              levelArray.push("Middle");
                            if (question.interviewLevel.includes("3"))
                              levelArray.push("Senior");
                            return <span>{levelArray.join(",")}</span>;
                          })()}
                        </Link>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
          <div className=" text-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-success m-1"
            >
              <i className="bi bi-caret-left-fill"></i>
            </button>

            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => paginate(page)}
                className={`btn m-1 ${
                  currentPage === page ? "btn-success" : "btn-outline-success"
                }`}
              >
                {currentPage >= 4 && currentPage <= totalPages-3 ? page == currentPage - 2  || page == currentPage + 2 ? <i className="bi bi-three-dots" style={{}}></i> : page : page}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-success m-1"
            >
              <i className="bi bi-caret-right-fill"></i>
            </button>
          </div>
        </div>
        {/* <div className="col-2 mt-75 ml-25 ">
          <span className="" style={{ fontWeight: "bold", color: "white" }}>
            Фільтр
          </span>
          <select
            className="form-select mt-2 "
            onChange={(e) => {
              setSelectedOption(e.target.value);
              paginate(1);
            }}
          >
            <option value={0}>Всі</option>
            <option value={1}>Junior</option>
            <option value={2}>Middle</option>
            <option value={3}>Senior</option>
          </select>
        </div> */}
      </div>
    </motion.div>
    </AnimatePresence>
    )
  );
};

export default QuestionList;
