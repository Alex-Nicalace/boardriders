import { User } from '@supabase/supabase-js';
import { MutateOptions } from '@tanstack/react-query';
import { TUpdateCurrentUserArgs } from '../../services/apiAuth';

export type TAccounPersonalData = {
  fullName: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  sex?: string;
  phone?: string;
  email?: string;
  dateBirth?: Date | null;
};

export type TKeysAccounPersonalData = keyof TAccounPersonalData;

export type TMutateDataArgs = [
  Omit<TAccounPersonalData, 'fullName'>,
  (
    | MutateOptions<
        {
          user: User;
        },
        Error,
        TUpdateCurrentUserArgs,
        unknown
      >
    | undefined
  )
];
