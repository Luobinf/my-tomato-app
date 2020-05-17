import React from 'react';
import tomato from '../../icons/tomato.svg';
console.log(tomato);

interface Props {
  name: string
}

const Icon = (props: Props) => {
  return (
    <svg className="icon">
      <use xlinkHref={`#${props.name}`}/>
    </svg>
  );
};

export default Icon;


