import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imageurl,newsurl,date,author} =this.props
    return (
      <div className='my-3'>
        <div className="card" >
  <img src={!imageurl?"https://media.istockphoto.com/id/1182477852/photo/breaking-news-world-news-with-map-backgorund.jpg?s=612x612&w=0&k=20&c=SQfmzF39HZJ_AqFGosVGKT9iGOdtS7ddhfj0EUl0Tkc=" : imageurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {!author?'unknown':author} On {new Date(date).toGMTString()}</small></p>

    <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
