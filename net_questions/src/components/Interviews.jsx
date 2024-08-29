
import React, { useEffect, useState } from "react";
import { getInterviews, getQuestions } from "../services/api";
import "../styles/styles.css";
import { Link } from "react-router-dom";
import {motion, AnimatePresence, delay} from "framer-motion";
const Interviews = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getInterviews();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <AnimatePresence>
    <motion.div  initial={{opacity:0}} animate={{opacity:1}} className="container-fluid mt-25">
      <div className="row">
        <div className="col-2-5">
        </div>
        <div className="col-8 col-7-5 col-sm-12 mt-25">
         
          <table className="table table-hover  ">
            <thead>
              <tr className="th-border">
                <th scope="col">Співбесіди</th>
                <th scope="col">Рівень</th>
              </tr>
            </thead>
            <tbody>
              {data.sort((a,b) => a.interviewLevel - b.interviewLevel).map(
                (interview) => (
                  
                  (
                    <tr
                      className="table-active  border-top-green"
                      key={interview.interviewId}
                    >
                      
                      <td>
                        <a  target="_blank"
                          href={interview.interviewLink}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                          }}
                        >  <i
                        className="bi bi-youtube"
                        style={{ marginRight: "5px" }}
                      ></i>
                          {interview.interviewName}
                        </a>
                      </td>

                      <td className="">
                        <a target="_blank"
                          href={interview.interviewLink}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                          }}
                        >
                          {interview.interviewLevel == 1 ? "Junior" : ""}
                          {interview.interviewLevel == 2 ? "Middle" : ""}
                          {interview.interviewLevel == 3 ? "Senior" : ""}
                        </a>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
         
        </div>
       
      </div>
    </motion.div >
    </AnimatePresence>
  );
};

export default Interviews;
