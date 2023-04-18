import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Nav from './Nav'

import { Card, Modal } from 'antd';
import { HeartOutlined, ReadOutlined } from '@ant-design/icons';


const { Meta } = Card;

function ScreenArticlesBySource(props) {
  //console.log(props.match.params.id);

  var { id } = useParams()

  const [articlesList, setArticlesList] = useState([]);

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedLang, setSelectedLang] = useState(props.mySelectedLang)

  useEffect(() => {
    //console.log(`langue = ${x}`);
    const apiResultsLoading = async () => {

      const rawResponse = await fetch(`https://newsapi.org/v2/top-headlines?sources=${id}&language=${selectedLang}&apiKey=8c6be6446dd7443ba29e1ef0cd4aa1ca`);
      const response = await rawResponse.json();
      setArticlesList(response.articles);
    }
    //console.log(articlesList);
    apiResultsLoading();

  }, [selectedLang]);

  var showModal = (title, content) => {
    setVisible(true)
    setTitle(title)
    setContent(content)
  }

  var handleOk = e => {
    console.log(e)
    setVisible(false)
  }

  var handleCancel = e => {
    console.log(e)
    setVisible(false)
  }

  const handleReadClick = (url) => {
    window.open(url, '_blank');
  }

  var handleSubmitWishlist = async (article) => {
    props.addToWishList(article)
    const data = await fetch('/SubmitArticleLiked', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:
        `&token=${props.myToken}&title=${article.title}&description=${article.description}&urlToImage=${article.urlToImage}&url=${article.url}`
    });
    const res = await data.json();
    if (res.result === true) {
      console.log("article save")
    } 
  }

  if (props.myToken == '') {
    return <Redirect to='/' />
   }

  return (
    <div>
      <Nav />
      <div className="Banner" />
      <div className="Card">
        {articlesList.map((article, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              style={{
                width: 300,
                margin: '15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              cover={
                <img alt="example" src={article.urlToImage}
                />
              }
              actions={[
                <ReadOutlined onClick={function () {
                  showModal(article.title, article.content)
                  handleReadClick(article.url)
                }} />,
                <HeartOutlined onClick={() => handleSubmitWishlist(article)} />
              ]}
            >
              <Meta
                title={article.title}
                description={article.description}
              />
            </Card>
          </div>
        ))};
        <Modal
          title={title}
          open={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{content}</p>
          Vous pouvez enregistré l'article avec en cliquant sur <HeartOutlined  style={{ fontSize: '24px' }}  /> de l'article
        </Modal>
      </div>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function (article) {
      dispatch({ type: 'addArticle', articleLiked: article });
    }
  }
}

function mapStateToProps(state) {
  return {
    mySelectedLang: state.selectLang,
    myToken : state.token
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenArticlesBySource);
