import IconButton from '../ui/IconButton';
import { SearchIcon } from '../ui/Icons';

interface ISearchProps {
  className?: string;
}

function Search({ className }: ISearchProps): JSX.Element {
  const props = {
    ...(className && { className }),
  };
  return (
    <IconButton {...props} IconComponent={SearchIcon} to="/">
      ПОИСК
    </IconButton>
  );
}

export default Search;
