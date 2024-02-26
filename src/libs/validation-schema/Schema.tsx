import * as Yup from "yup";

//const fullnameRegExp =
/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
//const phoneRegExp =
/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]*$/;
const nameRegExp =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
const numericRegex = /^[0-9]+$/;
const workEmailRegExp =
  /^(?!.*@(?:gmail\.com|yahoo\.com|hotmail\.com|aol\.com|outlook\.com|mail.\com|protonmail\.com|hotmail\.co\.uk)$).*$/;

// const alternativeWorkRegExp =
//   /^(?!.*@(?:gmail\.com|yahoo\.com|hotmail\.com|aol\.com|hotmail\.co\.uk|hotmail\.fr|msn\.com|yahoo\.fr|wanadoo\.fr|orange\.fr|comcast\.net|yahoo\.co\.uk|yahoo\.com\.br|yahoo\.co\.in|live\.com|rediffmail\.com|free\.fr|gmx\.de|web\.de|yandex\.ru|ymail\.com|libero\.it|outlook\.com|uol\.com\.br|bol\.com\.br|mail\.ru|cox\.net|hotmail\.it|sbcglobal\.net|sfr\.fr|live\.fr|verizon\.net|live\.co\.uk|googlemail\.com|yahoo\.es|ig\.com\.br|live\.nl|bigpond\.com|terra\.com\.br|yahoo\.it|neuf\.fr|yahoo\.de|alice\.it|rocketmail\.com|att\.net|laposte\.net|facebook\.com|bellsouth\.net|yahoo\.in|hotmail\.es|charter\.net|yahoo\.ca|yahoo\.com\.au|rambler\.ru|hotmail\.de|tiscali\.it|shaw\.ca|yahoo\.co\.jp|sky\.com|earthlink\.net|optonline\.net|freenet\.de|t-online\.de|aliceadsl\.fr|virgilio\.it|home\.nl|qq\.com|telenet\.be|me\.com|yahoo\.com\.ar|tiscali\.co\.uk|yahoo\.com\.mx|voila\.fr|gmx\.net|mail\.com|planet\.nl|tin\.it|live\.it|ntlworld\.com|arcor\.de|yahoo\.co\.id|frontiernet\.net|hetnet\.nl|live\.com\.au|yahoo\.com\.sg|zonnet\.nl|club-internet\.fr|juno\.com|optusnet\.com\.au|blueyonder\.co\.uk|bluewin\.ch|skynet\.be|sympatico\.ca|windstream\.net|mac\.com|centurytel\.net|chello\.nl|live\.ca|aim\.com|bigpond\.net\.au)$).*$/;

//RECRUITER SIGNUP FORM SCHEMA
export const RecruiterSignUpSchema = Yup.object().shape({
  firstname: Yup.string()
    .trim()
    .matches(nameRegExp, "Please enter valid name with letters only")
    .min(3, "First Name must be at least 3 characters")
    .max(40)
    .required("Sorry, this is required"),
  lastname: Yup.string()
    .trim()
    .matches(nameRegExp, "Please enter valid name with letters only")
    .min(3, "Last Name must be at least 3 characters")
    .max(40)
    .required("Sorry, this is required"),
  // companyName: Yup.string().required("Sorry, this is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email format must have @")
    .matches(emailRegExp, "Please enter valid email e.g example@domain.com")
    .matches(
      workEmailRegExp,
      "Please enter a work email e.g example@workplace.com"
    )
    .required("Sorry, this is required"),
  mobile: Yup.string().required("Sorry, this is required"),
  country: Yup.string().required("Sorry, this is required"),
  //address: Yup.string().trim().required("Sorry, this is required"),
  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      passwordRegExp,
      "Password must contain at least one letter and one number"
    ),
  agreeWithTerms: Yup.boolean()
    .oneOf([true], "Please accept the terms & condition to continue")
    .required("Please accept the terms & condition to continue"),
});

//SEEKER SIGNUP FORM SCHEMA
export const SeekerSignUpSchema = Yup.object().shape({
  firstname: Yup.string()
    .trim()
    .matches(nameRegExp, "Please enter valid name with letters only")
    .min(3, "First Name must be at least 3 characters")
    .max(40)
    .required("Sorry, this is required"),
  lastname: Yup.string()
    .trim()
    .matches(nameRegExp, "Please enter valid name with letters only")
    .min(3, "Last Name must be at least 3 characters")
    .max(40)
    .required("Sorry, this is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email format must have @")
    .matches(emailRegExp, "Please enter valid email e.g example@domain.com")
    .required("Sorry, this is required"),
  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      passwordRegExp,
      "Password must contain at least one letter and one number"
    ),
  agreeWithTerms: Yup.boolean()
    .oneOf([true], "Please accept the terms & condition to continue")
    .required("Please accept the terms & condition to continue"),
});

//LOGIN FORM SCHEMA
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email format must have @")
    .matches(emailRegExp, "Please enter valid email e.g example@domain.com")
    .required("Sorry, this is required"),
  password: Yup.string().trim().required("Password is required"),
});
