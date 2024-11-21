import React, { useEffect, useState } from 'react';
import './Marquee.css';

const Marquee = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchMarqueeContent = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/marquee/getContent');
        const data = await response.json();
        setContent(data.content);
      } catch (error) {
        console.error('Ошибка при получении контента бегущей строки:', error);
      }
    };

    fetchMarqueeContent();
  }, []);

  return (
    <>
    <div class="items-wrap">
    <div class="items marquee">
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    </div>
    <div aria-hidden="true" class="items marquee">
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    </div>
  </div>
  
  </>
  );
};

export default Marquee;
