import React from 'react';
import './CollapsiblePanel.scss';
import Details from '../../component-library/Details';

type TCollapsiblePanelProps = {
  sammary: string;
  className?: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
};
function CollapsiblePanel({
  sammary,
  className = '',
  defaultOpen = false,
  children,
}: TCollapsiblePanelProps) {
  return (
    <Details
      defaultOpen={defaultOpen}
      className={`collapsible-panel ${className}`}
      summaryNode={
        <>
          {sammary}
          <span className="collapsible-panel__summary-marker"></span>
        </>
      }
      summaryProps={{ className: 'collapsible-panel__summary' }}
      contentNode={children}
      contentProps={{ className: 'collapsible-panel__content' }}
    />
  );
}

export default CollapsiblePanel;
