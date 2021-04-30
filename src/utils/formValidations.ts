type TranslateFunction = (key: string) => string;

export const requiredValidation = (translate: TranslateFunction) => ({
  required: translate('common:requiredField')
});
