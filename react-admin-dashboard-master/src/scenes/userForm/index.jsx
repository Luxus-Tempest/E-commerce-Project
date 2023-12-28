import { Box, Button, TextField, Checkbox } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="CREER UN UTILISATEUR" subtitle="Créer un nouvel utilisateur" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nom d'utilisateur"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Username}
                name="Username"
                error={!!touched.Username && !!errors.Username}
                helperText={touched.Username && errors.Username}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Pays"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="Country"
                error={!!touched.Country && !!errors.Country}
                helperText={touched.Country && errors.Country}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Mot de passe"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="Description"
                error={!!touched.Description && !!errors.Description}
                helperText={touched.Description && errors.Description}
                sx={{ gridColumn: "span 4" }}
              />
              {/* Ajoutez le champ de checkbox */}
              <Checkbox
                checked={values.isSeller} // Assurez-vous d'ajouter cette variable dans vos valeurs initiales.
                onChange={handleChange}
                name="isSeller"
              />
              <label htmlFor="isSeller">Attribuer les propriétés d'un vendeur</label>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  Username: yup.string().required("required"),
  Country: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  Description: yup.string(),
  password: yup.string().required("Mot de passe requis").min(6, "Au moins 6 caractères"),
  isSeller: yup.boolean().oneOf([true], "IsSeller")
  /*address2: yup.string().required("required"),*/
});
const initialValues = {
  Username: "",
  Country: "",
  email: "",
  contact: "",
  Description: "",
  password: "",
  isSeller: false ,

};

export default Form;
