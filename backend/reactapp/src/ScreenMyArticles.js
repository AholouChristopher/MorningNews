import React, { useEffect } from 'react';
import './App.css';
import { Card } from 'antd';
import { DeleteOutlined, ReadOutlined } from '@ant-design/icons';

import Nav from './Nav'
import { connect } from 'react-redux';


const { Meta } = Card;

const handleReadClick = (url) => {
  window.open(url, '_blank');
}


function ScreenMyArticles(props) {  
  const deleteArticlewishlit = async (article) => { 
    props.deleteToWishList(article.title)
    const data = await fetch('/wishlist/delArticle', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:
        `token=${props.myToken}&title=${article.title}`
    });

    const body = await data.json();
    if (body.result) {
      console.log("article delete")
    }
  } 

  return (
    <div>
      <Nav />
      <div className="Banner" />
      <div className="Card">
        {props.myArticles.map((article, i) => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              style={{
                width: 300,
                margin: '15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              cover={
                <img alt="example" src={article.urlToImage} />
              }
              actions={[
                <ReadOutlined onClick={function () { handleReadClick(article.url) }} />,
                <DeleteOutlined onClick={() => { deleteArticlewishlit(article) }} />
              ]}
            >
              <Meta title={article.title} description={article.description} />
            </Card>
          </div>
        ))};
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { myArticles: state.wishList, myToken: state.token }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteToWishList: function (article) {
      dispatch({ type: 'deleteArticle', title: article })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(ScreenMyArticles)
