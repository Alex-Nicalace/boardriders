import supabase from '../supabase';

export async function getMainMenu(categoryGender: string) {
  const { data, error } = await supabase.rpc('getMainMenu', { categoryGender });

  if (error) {
    console.error(error);
    throw new Error('Main menu could not be loaded');
  }

  const mainMenuFlattened = data.flatMap(
    ({ id, name, displayName, subMenu }) => [
      { id, name, displayName },
      ...(subMenu ?? []).map(({ id, name, displayName }) => ({
        id,
        name,
        displayName,
      })),
    ]
  );

  return { mainMenu: data, mainMenuFlattened };
}
