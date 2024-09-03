import supabase from '../supabase';
import { TMainMenuFlattened } from './apiCategories.types';

export async function getMainMenu(categoryGender: string) {
  const { data, error } = await supabase.rpc('getMainMenu', { categoryGender });

  if (error) {
    console.error(error);
    throw new Error('Main menu could not be loaded');
  }

  const mainMenuFlattened: TMainMenuFlattened[] = data.flatMap(
    ({ id, name, displayName, subMenu }) => [
      { id, name, displayName, parentId: null },
      ...(subMenu ?? []).map(({ id: childId, name, displayName }) => ({
        id: childId,
        name,
        displayName,
        parentId: id,
      })),
    ]
  );

  return { mainMenu: data, mainMenuFlattened };
}
