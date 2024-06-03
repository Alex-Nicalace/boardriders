import React from 'react';

import './Title.scss';

type TTitleProps = {
  children: React.ReactNode;
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  kind?: 'h1-32-h2-21' | 'subtitle-1-21-medium' | 'h1-32-16';
  className?: string;
  supNode?: React.ReactNode;
  color?: 'white' | 'black';
};
function Title({
  as = 'h2',
  kind = 'h1-32-h2-21',
  supNode,
  className = '',
  children,
  color = 'black',
}: TTitleProps): JSX.Element {
  const classSummary = `${className} title title_${kind} ${
    color !== 'black' ? `title_${color}` : ''
  }`;

  const childrenElement = supNode ? (
    <>
      <span>{children}</span>
      <sup className="title-sup">{supNode}</sup>
    </>
  ) : (
    <>{children}</>
  );
  return (
    <>
      {as === 'h1' && <h1 className={classSummary}>{childrenElement}</h1>}
      {as === 'h2' && <h2 className={classSummary}>{childrenElement}</h2>}
      {as === 'h3' && <h3 className={classSummary}>{childrenElement}</h3>}
      {as === 'h4' && <h4 className={classSummary}>{childrenElement}</h4>}
      {as === 'h5' && <h5 className={classSummary}>{childrenElement}</h5>}
      {as === 'h6' && <h6 className={classSummary}>{childrenElement}</h6>}
    </>
  );
}

export default Title;
