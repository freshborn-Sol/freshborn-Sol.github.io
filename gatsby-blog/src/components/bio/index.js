import React from 'react';
import ReactRotatingText from 'react-rotating-text';
import IconButtonBar from '../icon-button-bar';
import './style.scss';

function Bio({ author, language = 'ko', fixedDescription, thumbnail }) {
  if (!author) return null;
  const { bio, social, name } = author;
  return (
    <div className="bio">
      {language === 'ko' ? (
        <div className="introduction korean">
          <p className="title">
            안녕하세요.
            <br />
            {fixedDescription || <ReactRotatingText items={bio.description} />}
            <br />
            {bio.role} <strong>{name}</strong>입니다.
            <br />
          </p>
          <div className="social-links">
            <IconButtonBar links={social} />
          </div>
        </div>
      ) : (
        <div className="introduction english">
          <p className="title">
            Hello,
            <br />
            my name is
            <br />
            <strong>{name}</strong>
            .<br />
          </p>
          <p className="description">
            I'm a {bio.role} {fixedDescription || <ReactRotatingText items={bio.description} />}
            <br />
          </p>
          <div className="social-links">
            <IconButtonBar links={social} />
          </div>
        </div>
      )}
      <div className="thumbnail-wrapper">
        <img style={{ width: 250, height: 'auto', borderRadius: 12 }} src={thumbnail || bio.thumbnail} alt="류한솔의 소개 캐릭터" />
      </div>
    </div>
  );
}

export default Bio;
