import Spinner from '../components/Spinner';

type TDataProviderProps<T> = {
  useCallbackData: () => {
    data: T;
    isLoading: boolean;
    error: Error | null;
  };
  children: (data: T) => JSX.Element;
};
function DataProvider<T>({
  useCallbackData,
  children,
}: TDataProviderProps<T>): JSX.Element {
  const { data, isLoading } = useCallbackData();

  if (isLoading) {
    return <Spinner />;
  }

  return <>{children(data)}</>;
}

export default DataProvider;
