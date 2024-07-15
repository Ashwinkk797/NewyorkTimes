import React, { useState, useEffect } from "react";
import axios from "../../api/config";
import "./ArticleList.css";
import Loader from "../Loader";
import CustomButton from "../CustomButton";

const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);
  const [period, setPeriod] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticlesList = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/${period}.json`);
        setArticleList(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch the articles:", error);
        setLoading(false);
      }
    };
    getArticlesList();
  }, [period]);

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <div className="article-list">
      <h1>Newyork Times Most Popular Articles</h1>
      <div className="period-buttons">
        <CustomButton
          label="1 Day"
          active={period === 1 ? "active" : ""}
          handleChange={() => handlePeriodChange(1)}
        />
        <CustomButton
          label="30 Days"
          active={period === 7 ? "active" : ""}
          handleChange={() => handlePeriodChange(7)}
        />
        <CustomButton
          label="1 Day"
          active={period === 30 ? "active" : ""}
          handleChange={() => handlePeriodChange(30)}
        />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <ul>
          {articleList.map(
            ({ id, url, title, abstract, published_date, media }) => (
              <li key={id} className="article-item">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-title"
                >
                  {title}
                </a>
                <p className="article-abstract">{abstract}</p>
                <p className="article-metadata">Published: {published_date}</p>
                {media && media.length > 0 && (
                  <div className="article-image-container">
                    <img
                      src={media[0]["media-metadata"][2].url}
                      alt={title}
                      className="article-image"
                    />
                  </div>
                )}
                <hr className="divider" />
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default ArticleList;
