import { Type } from '../../../utils/propTypes';

const Macros = ['calories', 'protein', 'carbs', 'fat'];

const isNotMacro = (goal: Type) => Macros.findIndex(
  (macro) => macro === goal,
) === -1;

export default isNotMacro;
