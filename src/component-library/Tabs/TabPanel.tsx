type TabPanelProps = {
  className?: string;
  children?: React.ReactNode;
  index: number;
  value: number;
};
function TabPanel({ children, value, index, className }: TabPanelProps) {
  return (
    <div
      className={['tab-panel', className].filter(Boolean).join(' ')}
      role="tabpanel"
      hidden={value !== index}
    >
      {value === index && children}
    </div>
  );
}

export default TabPanel;
