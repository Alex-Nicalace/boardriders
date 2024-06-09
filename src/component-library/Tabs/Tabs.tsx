import {
  ButtonHTMLAttributes,
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  useState,
} from 'react';
import './Tabs.scss';
import { omit } from '../../utils/omit';

type TTabsProps = {
  children: ReactElement<TTabProps> | ReactElement<TTabProps>[];
  onChange?: (value: any, event?: React.SyntheticEvent) => void;
  value?: any;
  defaultValue?: any;
};
function Tabs({
  children,
  value,
  onChange,
  defaultValue,
}: TTabsProps): JSX.Element {
  // Проверка типа детей. Если не Tab - выбрасываем ошибку. Не факт, что это нужно, но решил так сделать.
  Children.forEach(children, (child) => {
    if (child.type !== Tab) {
      throw new Error('Tabs component only accepts Tab as children.');
    }
  });
  const [selected, setSelected] = useState(defaultValue);
  const isUseInnerSrtate = value === undefined;
  const currentValue = isUseInnerSrtate ? selected : value;

  function setCurrentValue(value: any, event: React.SyntheticEvent) {
    if (isUseInnerSrtate) {
      setSelected(value);
    }
    if (onChange) {
      onChange(value, event);
    }
  }

  return (
    <div className="tabs" role="tablist">
      {Children.map(children, (child, index) => {
        const tabValue =
          child.props.value === undefined ? index : child.props.value;
        const isSelected = tabValue === currentValue;

        return cloneElement(child, {
          className: `${isSelected ? 'tabs__item_active' : ''}`,
          onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            child.props.onClick?.(e); // соббытие, которое явно было установлено в JSX
            setCurrentValue(tabValue, e);
          },
          tabIndex: isSelected ? 0 : -1,
          'aria-selected': isSelected,
        });
      })}
    </div>
  );
}

type TTabProps = {
  label: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;
function Tab({ label, ...props }: TTabProps): JSX.Element {
  return (
    <button
      {...omit(props, 'value')}
      className={['tabs__item', props.className].filter(Boolean).join(' ')}
      role="tab"
    >
      {label}
    </button>
  );
}

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

Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

export default Tabs;
