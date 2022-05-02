import React, { useEffect, useState } from "react";
import "./assets/paper_card.css";
import { Typography } from "@mui/material";
import {
  convertUnicode,
  keywordHighlighter,
} from "../../../../Services/utils/unicodeCharacterEngine.js";
import OptionDropDown from "../../../components/OptionDropDown";
import styled from "styled-components";
import Button from "@mui/material/Button";
import RestAPI from "Services/api";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@material-ui/core";
import ExpansionPanel from "./Components/ExpansionPanel";

function ColoredBand({ interests_similarity, tags }) {
  const totalValues = Math.round(
    Object.values(interests_similarity).reduce((a, b) => a + b)
  );
  let res = [];
  for (const [int, sim] of Object.entries(interests_similarity)) {
    let height = 0;
    if (Math.round(sim) != 0) {
      height = Math.round(sim * 100) / totalValues;
      res.push(
        <Grid
          container
          className="align-items-center"
          key={int}
          style={{
            backgroundColor: tags.find((t) => t.text == int).color,
            height: height + "%",
          }}
        >
          {Math.round(sim)}%
        </Grid>
      );
      // res.push(<Row className="align-items-center" key={int} style={{  height: height + '%' }}>{Math.round(sim)}%</Row>)
    }
  }
  return (
    <Grid container className="align-items-center vline">
      {res}
    </Grid>
  );
}

function Title({ paper, similarityScore }) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
  //highlight title
  let modified_title = paper.title;
  for (let p in paper.keywords_similarity) {
    let value = paper.keywords_similarity[p];
    let regEx = new RegExp(p, "ig");
    let matches = regEx.exec(modified_title);
    if (matches === null) continue;
    let originalText = matches[0];
    modified_title = modified_title.replace(
      regEx,
      `<span title="Similarity Score:${value.max_score}" className="highlight-keyword" style="color:${value.max_interest_color};border-color:white">${originalText}</span>`
    ); /*${value.color}*/
  }

>>>>>>> 4c195edf06d381dea52cafb22dc4165c9ad481f9
  return (
    <Grid container className="d-flex justify-content-between">
      <Grid item md={10}>
        <Grid className="paper-title">{paper.title}</Grid>
        <Grid className="paper-subtitle">
          <Authors authorsList={paper.authors} />
        </Grid>
      </Grid>
      <Grid item md={2} style={{ justifyContent: "flex-end" }}>
        <span className="paper-badge">
          Similarity Score: {similarityScore} %
        </span>
      </Grid>
<<<<<<< HEAD
    </Grid>
=======
=======
//---------------Hoda Start-----------------
function  highlighter(paperId,keyword,max_score,max_interest_color,originalText)
{
    let lookupkey=btoa(unescape(encodeURIComponent(keyword)));
    return `<a data-tip="${lookupkey}" data-for="${paperId}" data-event="click" title="Similarity Score: ${Math.round(max_score*100)/100}" className="highlight-keyword" style="color:${max_interest_color}">${originalText}</a>`    
}
function KeywordSimObjToArray(keywords_similarity)
{
    let items=[]
    let i=0;
    for(let p2 in keywords_similarity)
    {
      
      let value=keywords_similarity[p2];
      items.push({
                    keyword:p2,
                    max_score:value.max_score,
                    max_interest_color:value.max_interest_color,
                    numberOfWord:p2.split(" ").length
                });
    }
    return items.sort((a,b)=>a.numberOfWord<b.numberOfWord?1:a.numberOfWord==b.numberOfWord?0:-1);
}
function  HighlightText(paperId,keywords_similarity,text)
{
    keywords_similarity=KeywordSimObjToArray(keywords_similarity)
    let modified_text = text;
    for(let index in keywords_similarity)
    {
        let value=keywords_similarity[index];
        let regEx = new RegExp(value.keyword, "ig");
        let matches=regEx.exec(modified_text)
        if (matches ===null) continue; 
        let originalText=matches[0].split(" ").map(x=>"<x>"+x[0]+"</x>"+x.substring(1)).join("&nbsp;");

        modified_text=modified_text.replace(regEx,highlighter(paperId,value.keyword,value.max_score,value.max_interest_color,originalText));
    }
    return modified_text;
}


function Title({ paper, similarityScore }) {
    //highlight title
    let modified_title =HighlightText(paper.paperId,paper.keywords_similarity, paper.title);
    //---------------Hoda end-----------------
=======
>>>>>>> parent of 6de9c3f (Highlighting abstract)
    return <div className="d-flex justify-content-between">
        <Col md={10}>
            <div className="paper-title">
                {paper.title}
            </div>
            <div className="paper-subtitle"><Authors authorsList={paper.authors} /></div>
        </Col>
        <Col md={{ justifyContent: 'flex-end' }}>
            <span className="paper-badge">
                Similarity Score: {similarityScore} %
            </span>
        </Col>
>>>>>>> origin/dev-h
    </div>
>>>>>>> 4c195edf06d381dea52cafb22dc4165c9ad481f9
  );
}
function Authors({ authorsList }) {
  const res = [];
  authorsList.forEach((element) => {
    res.push(element.name);
  });
  return <span>{res.join(" , ")}</span>;
}
function PaperContent({ text }) {
  return <span dangerouslySetInnerHTML={{ __html: text }} />;
}
export default function PaperCard(props) {
  const [state, setState] = useState({
    timer: null,
    interests: props.interests,
    // mainKewords: props.paper_keywords,
    paper: props.paper,
    index: props.index,
    paperModiText: "",
    done: false,
  });
  // Modified text changed by Yasmin, calculatingSimilarity for one related Keyword added by yasmin
  const [error, setError] = useState("");
  useEffect(() => {
    // calculateSimilarity();
    // let modified_text = convertUnicode(text);
    let modified_text = state.paper.abstract;
    let merged = [];
    // for (const item of state.seriesData) {
    //     if (item.name == paper.related_interest) {
    //         for (const data of item.data) {
    //             if (data.y > 40) {
    //                 if (data.x.indexOf(" ") >= 0) {
    //                     merged.push({
    //                         name: data.x,
    //                         percentage: data.y,
    //                         compare: item.name,
    //                     });
    //                 } else {
    //                     merged.unshift({
    //                         name: data.x,
    //                         percentage: data.y,
    //                         compare: item.name,
    //                     });
    //                 }
<<<<<<< HEAD
=======
=======
        // seriesData: props.keyword_tags,
        mainKewords: props.paper_keywords,
        paper: props.paper,
        paperModiText: "",
        done: false,
    });
<<<<<<< HEAD
    //---------------Hoda Start-----------------
    for(let p1 in props.paper.keywords_similarity)
    {
        let interests=props.paper.keywords_similarity[p1];
        let max_score=0
        let max_interest=""
        let max_interest_color=""
        for(let p2 in interests)
        {
            if(p2.toLowerCase().indexOf("max_")>=0)
            {
                continue;
            }
            let value=interests[p2];
            interests[p2]={
                ...value,color:value.color||props.keyword_tags.find(x=> x.text.toLowerCase()===p2.toLowerCase()).color
                };   
            if(max_score<value.score)
            {
                max_score=value.score
                max_interest_color=value.color
                max_interest=p2
            }
        }
        if(max_score>0)
        {
            props.paper.keywords_similarity[p1]={...interests,max_score,max_interest,max_interest_color}
        }
    }
    //---------------Hoda end-----------------
=======
>>>>>>> parent of 6de9c3f (Highlighting abstract)
    const [hide, setHide] = useState(false);
    // Modified text changed by Yasmin, calculatingSimilarity for one related Keyword added by yasmin
    const [error, setError] = useState("");
    useEffect(() => {
        // calculateSimilarity();
        // let modified_text = convertUnicode(text);
<<<<<<< HEAD
        //---------------Hoda Start-----------------
        //highlight abstract
        let modified_text = HighlightText(state.paper.paperId,state.paper.keywords_similarity,state.paper.abstract);
        //---------------Hoda end-----------------

=======
        let modified_text = state.paper.abstract;
        let merged = [];
>>>>>>> parent of 6de9c3f (Highlighting abstract)
        // for (const item of state.seriesData) {
        //     if (item.name == paper.related_interest) {
        //         for (const data of item.data) {
        //             if (data.y > 40) {
        //                 if (data.x.indexOf(" ") >= 0) {
        //                     merged.push({
        //                         name: data.x,
        //                         percentage: data.y,
        //                         compare: item.name,
        //                     });
        //                 } else {
        //                     merged.unshift({
        //                         name: data.x,
        //                         percentage: data.y,
        //                         compare: item.name,
        //                     });
        //                 }
        //             }
        //         }
        //         if (item.name.indexOf(" ") >= 0) {
        //             merged.push({
        //                 name: item.name,
        //                 percentage: 100,
        //                 compare: item.name,
        //             });
        //         } else {
        //             merged.unshift({
        //                 name: item.name,
        //                 percentage: 100,
        //                 compare: item.name,
        //             });
        //         }
        //     }
        // }
        ////similarity of each keyword
        // state.mainKewords.forEach((keyword) => {
        //     merged.push({
        //         name: keyword,
        //         percentage: 1,
        //         compare: state.relatedInterest,
        //     });
        // })
        // merged.forEach((element) => {
        //     modified_text = keywordHighlighter(
        //         element.name,
        //         modified_text,
        //         element.percentage,
        //         element.compare
        //     );
        // });

        setState((prevState) => ({
            ...prevState,
            paperModiText: modified_text,
            done: true,
        }));
    }, [state.done]);

    const setSeriesData = (data) => {
        setState((prevState) => ({
            ...prevState,
            seriesData: [...data],
            done: true,
        }));
    };

    //Added by Yasmin for this component
    //   To highlight the similar exteracted keywords
    // const calculateSimilarity = async () => {
    // const keyword_tags = this.keyword_tags.filter((i) => i.text == props.paper.abstract);
    // const data = {
    //     text: paper.abstrcat.trim(),
    //     algorithm: "Yake",
    // };
    // const keywordArray = [];
    // try {
    //     let response = await RestAPI.interestExtract(data);
    //     const keys = Object.keys(response.data);
    //     const value = Object.values(response.data);

    //     for (let i = 0; i < keys.length; i++) {
    //         keywordArray.push({
    //             text: keys[i],
    //             value: value[i],
    //         });
    //     }
    // } catch (error) {
    //     setError("Loading error, close and try again.");
    //     console.log(error);
    // }
    // let seriesData = [];
    // if (keywordArray.length !== 0) {
    //     for (const userInterest of keyword_tags1) {
    //         let data = [];
    //         for (const tweetKeyword of keywordArray) {
    //             let requestData = {
    //                 keywords_1: [userInterest.text],
    //                 keywords_2: [tweetKeyword.text],
    //                 algorithm: "WordEmbedding",
    //             };
    //             try {
    //                 let response = await RestAPI.computeSimilarity(requestData);
    //                 data.push({
    //                     x: tweetKeyword.text,
    //                     y: response.data.score,
    //                 });
    //             } catch (e) {
    //                 setError("Loading error, close and try again.");
    //                 console.log(error);
>>>>>>> origin/dev-h
>>>>>>> 4c195edf06d381dea52cafb22dc4165c9ad481f9
    //             }
    //         }
    //         if (item.name.indexOf(" ") >= 0) {
    //             merged.push({
    //                 name: item.name,
    //                 percentage: 100,
    //                 compare: item.name,
    //             });
    //         } else {
    //             merged.unshift({
    //                 name: item.name,
    //                 percentage: 100,
    //                 compare: item.name,
    //             });
    //         }
    //     }
    // }
    ////similarity of each keyword
    // state.mainKewords.forEach((keyword) => {
    //     merged.push({
    //         name: keyword,
    //         percentage: 1,
    //         compare: state.relatedInterest,
    //     });
    // })
    // merged.forEach((element) => {
    //     modified_text = keywordHighlighter(
    //         element.name,
    //         modified_text,
    //         element.percentage,
    //         element.compare
    //     );
    // });

    setState(() => ({
      ...state,
      paperModiText: modified_text,
      done: true,
    }));
  }, [state.done]);

<<<<<<< HEAD
  const setSeriesData = (data) => {
    setState(() => ({
      ...state,
      seriesData: [...data],
      done: true,
    }));
  };
=======
    const { paper, keyword_tags } = props;
    const paperDetails = paper;
    const text = paper.title + ' ' + paper.abstrcat;
    // const tweet_url = `https://twitter.com/${screenName}/status/${id_str}`;
>>>>>>> parent of 6de9c3f (Highlighting abstract)

  //Added by Yasmin for this component
  //   To highlight the similar exteracted keywords
  // const calculateSimilarity = async () => {
  // const interests = this.interests.filter((i) => i.text == props.paper.abstract);
  // const data = {
  //     text: paper.abstrcat.trim(),
  //     algorithm: "Yake",
  // };
  // const keywordArray = [];
  // try {
  //     let response = await RestAPI.interestExtract(data);
  //     const keys = Object.keys(response.data);
  //     const value = Object.values(response.data);

  //     for (let i = 0; i < keys.length; i++) {
  //         keywordArray.push({
  //             text: keys[i],
  //             value: value[i],
  //         });
  //     }
  // } catch (error) {
  //     setError("Loading error, close and try again.");
  //     console.log(error);
  // }
  // let seriesData = [];
  // if (keywordArray.length !== 0) {
  //     for (const userInterest of interests1) {
  //         let data = [];
  //         for (const tweetKeyword of keywordArray) {
  //             let requestData = {
  //                 keywords_1: [userInterest.text],
  //                 keywords_2: [tweetKeyword.text],
  //                 algorithm: "WordEmbedding",
  //             };
  //             try {
  //                 let response = await RestAPI.computeSimilarity(requestData);
  //                 data.push({
  //                     x: tweetKeyword.text,
  //                     y: response.data.score,
  //                 });
  //             } catch (e) {
  //                 setError("Loading error, close and try again.");
  //                 console.log(error);
  //             }
  //         }
  //         seriesData.push({
  //             name: userInterest.text,
  //             weight: userInterest.weight,
  //             data: data,
  //         });
  //     }
  //     setSeriesData(seriesData);
  // }
  // setSeriesData([{ name: "learning", weight: 5, data: [{ x: "Day", y: 27.33 }] }]);

  // };

  const { paper } = props;
  const paperDetails = paper;
  const text = paper.title + " " + paper.abstrcat;
  // const tweet_url = `https://twitter.com/${screenName}/status/${id_str}`;

  return (
    <Grid
      container
      className="card mt-4"
      style={{ position: "relative", border: "1px solid" }}
    >
      {state.done ? (
        <>
          <ColoredBand
            interests_similarity={paper.interests_similarity}
            tags={state.interests}
          />
          <Grid container className="card-body">
            <Title paper={paperDetails} similarityScore={paper.score} />

            <Grid item md={12} sx={{ padding: "10px", textAlign: "justify" }}>
              {/* <a
                href="PAPER_URL"
                target="_blank"
                style={{ textDecoration: "none", color: "inherit" }}
                rel="noopener noreferrer"
              > */}
              <Typography align="justify" sx={{ padding: "0px 15px" }}>
                <PaperContent text={state.paperModiText} />
              </Typography>

              {/* </a> */}
            </Grid>
            <ExpansionPanel
              paper={paper}
              interests={state.interests}
              index={state.index}
            />
          </Grid>
        </>
      ) : (
        <Button
          disabled
          style={{
            fontWeight: "bold",
            textTransform: "none",
            marginLeft: "5px",
            fontSize: "16px",
          }}
        >
          <CircularProgress
            style={{
              marginRight: "5px",
            }}
          />
          Calculating similarity...
        </Button>
      )}
    </Grid>
  );
}
