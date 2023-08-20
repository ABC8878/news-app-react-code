import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0,
    };
    document.title = `${this.props.category} - NewsMonkey`;
  }

  updateNews = async () => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a02435f2f66b40489779abe3f5a27f7d&page=${this.state.page}
  &pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    console.log("this is ", data);
    this.props.setProgress(30);

    let parsedData = await data.json();
    this.props.setProgress(70);

    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults:parsedData.totalResults,
    });
    this.props.setProgress(100);
  };

  async componentDidMount() {
    this.updateNews();
  }

  

  fetchMoreData = async () => {
   
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a02435f2f66b40489779abe3f5a27f7d&page=${this.state.page+1}
  &pageSize=${this.props.pageSize}`;
  this.setState({ page: this.state.page+1 });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
     
        <h1 style={{ margin: "80px 0px" }} className="text-center">
          {`NewsMonkey-Top ${this.props.category} Headlines`}
        </h1>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >

<div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title}
                  description={element.description}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
        
      </>
    );
  }
}

export default News;
