import * as Yup from "yup";

const userSchema = Yup.object().shape({
  username: Yup.string().required("Este campo é obrigatorio."),
  email: Yup.string().required("Este campo é obrigatorio."),
  permission: Yup.string().required("Este campo é obrigatorio."),
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
