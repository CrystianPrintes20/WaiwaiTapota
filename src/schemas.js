import * as Yup from "yup";

const userSchema = Yup.object().shape({
  username: Yup.string().required("Este campo é obrigatorio."),
  email: Yup.string().required("Este campo é obrigatorio."),
});

export { userSchema };
