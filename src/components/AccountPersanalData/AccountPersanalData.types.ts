import { TPersanalDataInputs } from '../FormPersanalData';

export type TAccountPersanalDataProps = {
  className?: string;
  data: TPersanalDataInputs & { fullName?: string };
};
