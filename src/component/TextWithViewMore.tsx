import React, { useState } from "react";

interface TextWithViewMoreProps {
  text: string;
  maxLength: number;
  reverse?: boolean
}

const TextWithViewMore: React.FC<TextWithViewMoreProps> = ({
  text,
  maxLength,
  reverse
}) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className="text-container">
      {showFullText ? (
        <p>
          {text}
          <span onClick={toggleShowFullText} className="view-more-link">
            View less
          </span>
        </p>
      ) : (
        <p>
          {reverse ? text.slice(text.length - 30, text.length)  : text.slice(0, maxLength)}
          {text.length > maxLength && "... "}
          <span onClick={toggleShowFullText} className="view-more-link">
            View more
          </span>
        </p>
      )}
    </div>
  );
};

export default TextWithViewMore;
