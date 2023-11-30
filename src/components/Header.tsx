// interface IHeaderProps {}

import Select from './ui/Select/Select';
import Option from './ui/Option/Option';
import { useState } from 'react';

function Header(): JSX.Element {
  const [city, setCity] = useState('Москва');
  function handleChangeCity(value: string) {
    setCity(value);
  }

  return (
    <header className="header">
      <div className="header__topbar topbar-header">
        {/* <div className="topbar-header__select">
          <label htmlFor="delivery-region">
            <span>Ваш регион доставки:</span>
          </label>
          <select name="delivery-region" id="delivery-region">
            <option value="Москва">Москва</option>
            <option value="Санкт-Петербург">Санкт-Петербург</option>
          </select>
        </div> */}
        <Select
          value={city}
          onChange={handleChangeCity}
          optionsStyle={{ maxHeight: 200 }}
        >
          <Option value="Москва">
            <span>Москва</span>
          </Option>
          <Option value="Санкт-Петербург">
            <span>Санкт-Петербург</span>
          </Option>
          <Option value="Москва">
            <span>Москва</span>
          </Option>
          <Option value="Санкт-Петербург">
            <span>Санкт-Петербург</span>
          </Option>
          <Option value="Москва">
            <span>Москва</span>
          </Option>
          <Option value="Санкт-Петербург">
            <span>Санкт-Петербург</span>
          </Option>
          <Option value="Москва">
            <span>Москва</span>
          </Option>
          <Option value="Санкт-Петербург">
            <span>Санкт-Петербург</span>
          </Option>
        </Select>

        <br />
        {/* <select name="" id="">
          <option value="1">Тирасполь</option>
          <option value="2">Москва</option>
          <option value="3">Санкт-Петербург</option>
        </select> */}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </header>
  );
}

export default Header;
