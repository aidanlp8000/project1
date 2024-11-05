import React, { useState, useEffect, useCallback } from 'react';

const Typewriter = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  const addNextChar = useCallback(() => {
    if (index < text.length) {
      setDisplayText((current) => current + text[index]);
      setIndex((current) => current + 1);
    }
  }, [index, text]);

  useEffect(() => {
    const timer = setTimeout(addNextChar, speed);
    return () => clearTimeout(timer);
  }, [addNextChar, speed]);

  return <span>{displayText}</span>;
};

export default Typewriter;