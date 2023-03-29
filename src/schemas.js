import * as Yup from "yup";

const userSchema = Yup.object().shape({
  username: Yup.string().required("Este campo é obrigatorio."),
  email: Yup.string().required("Este campo é obrigatorio."),
});
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const registerSchema = Yup.object().shape({
  username: Yup.string().required("insira seu nome de usuário"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  acceptTerms: Yup.bool().oneOf(
    [true],
    "Accept Terms & Conditions is required"
  ),
});
const registerWordSchema = Yup.object().shape({
  meaningWaiwai: Yup.string().required("Este campo é obrigatorio."),
  meaningPort: Yup.string().required("Este campo é obrigatorio."),
  exampleSentence: Yup.string().required("Este campo é obrigatorio."),
  category: Yup.string().required("Este campo é obrigatorio."),
});

export { userSchema, loginSchema, registerSchema, registerWordSchema };
