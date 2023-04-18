import React, { useState, useEffect } from 'react';
import './App.css';

import { List, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import Nav from './Nav'
import { connect } from 'react-redux';


function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([]);
  const [useSelectLang, setUseSelectLang] = useState(props.mySelectedLang)

  useEffect(() => {
    const apiResultsLoading = async () => {     
      if ( useSelectLang == 'en' ) {
        var langue = 'en';
        var country = 'us'
      }else{
        var langue = 'fr';
        var country = 'fr'
      }

      const rawResponse = await fetch(`https://newsapi.org/v2/sources?apiKey=8c6be6446dd7443ba29e1ef0cd4aa1ca&country=${country}&language=${langue}`);
      const response = await rawResponse.json();
      setSourceList(response.sources);
      props.changeLang(useSelectLang);

    }
    apiResultsLoading();

  }, [useSelectLang]);

  useEffect (() => {
   const getWishlist = async () => {
      const data = await fetch(`/wishlist/${props.myToken}`);
      let body = await data.json()
      console.log(body.articles)

      if( body.result && body.articles ){
        props.importArticles(body.articles)

      }
    }
    getWishlist();
  },[])

  return (
    <div>
      <p> utilisateur : {props.myToken}</p>
      <Nav />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="Banner">
        <img onClick={() => setUseSelectLang('fr')} style={{ width: '50px', margin: '10px', cursor: 'pointer' }} src='./images/fr.jpg' />
        <img onClick={() => setUseSelectLang('en')} style={{ width: '50px', margin: '10px', cursor: 'pointer' }} src='./images/en.jpg' />
      </div>
      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={(source, i) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`/images/${source.category}.png`} />}
                title={<Link to={`/screenarticlesbysource/${source.id}`} key={i}><h3>{source.name}</h3></Link>}
                description={source.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state)
  return {
    myToken: state.token,
    mySelectedLang: state.selectLang
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeLang: function (selectLang) {
      dispatch({ type: 'changeLang', selectedLang: selectLang })
    },
    importArticles : function(articles){
      dispatch({type:"importArticles", articles})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenSource);
//export default ScreenSource;
