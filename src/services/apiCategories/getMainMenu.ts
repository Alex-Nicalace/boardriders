import supabase from '../supabase';

export async function getMainMenu(categoryGender: string) {
  const { data, error } = await supabase.rpc('getMainMenu', { categoryGender });

  if (error) {
    console.error(error);
    throw new Error('Main menu could not be loaded');
  }

  return data;
}
