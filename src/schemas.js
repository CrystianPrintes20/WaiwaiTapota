import * as Yup from "yup";

const userSchema = Yup.object().shape({
  username: Yup.string().required("Este campo é obrigatorio."),
  email: Yup.string().required("Este campo é obrigatorio."),
  permission: Yup.string().required("Este campo é obrigatorio."),
/*   password: Yup.string()
  .min(6, "A senha deve conter no minino 6 caracteres")
  .required("Password is required"),
confirmPassword: Yup.string()
  .oneOf([Yup.ref("password"), null], "Passwords must match")
  .required("Confirm Password is required"), */
});

const registerWordsSchema = Yup.object().shape({
  meaningWaiwai: Yup.string().required("Este campo é obrigatorio."),
  meaningPort: Yup.string().required("Este campo é obrigatorio."),
  /* phonemicWaiwai: Yup.string().required("Este campo é obrigatorio."), */
  exampleSentence: Yup.string().required("Este campo é obrigatorio."),
  category: Yup.string().required("Este campo é obrigatorio."),
  /*   synonymPort: Yup.string().required("Este campo é obrigatorio."),
  synonymWaiwai: Yup.string().required("Este campo é obrigatorio."), */
});

export { userSchema, registerWordsSchema };
