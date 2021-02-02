import Model from '../models/model.js';

const recipeModel = new Model('recipes');

export const recipesPage = async (req, res) => {
  try {
    const data = await recipieModel.select(
      'viewable',
      'recipe_name',
      'recipe_image',
      'cuisine',
      'duration',
      'description',
      'steps'
    );
    res.status(200).json({ recipes: data.rows });
  } catch (err) {
    res.status(200).json({ recipes: err.stack });
  }
};

export const addRecipe = async (req, res) => {
  const { viewable, recipeName, recipeImage, cuisine, duration, description, steps } = req.body;
  const columns = 'private, recipe_name, recipe_image, cuisine, duration, description, steps';
  const values = `'${viewable}', '${recipeName}', '${recipeImage}', '${cuisine}', '${duration}', '${description}', ''${steps}`;
  try {
    const data = await recipeModel.insertWithReturn(columns, values);
    res.status(200).json({ recipes: data.rows });
  } catch (err) {
    res.status(200).json({ recipes: err.stack });
  }
};
