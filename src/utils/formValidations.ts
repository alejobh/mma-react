import { TFunction } from 'react-i18next';

export const requiredValidation = (translate: TFunction) => ({
  required: translate('common:requiredField')
});
