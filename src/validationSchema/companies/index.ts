import * as yup from 'yup';
import { shareholderValidationSchema } from 'validationSchema/shareholders';

export const companyValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  shareholder: yup.array().of(shareholderValidationSchema),
});
