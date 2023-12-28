import { Box, Button, Input, Select, MenuItem, FormControl, InputLabel, Typography, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const GigForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
    // Ajoutez le traitement pour les fichiers si nécessaire
  };

  return (
    <Box m="20px">
      <Header title="CREER UN ARTICLE" subtitle="Créer un nouvel article" />

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
                label="Nom du produit"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />

              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Courte description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shortDesc}
                name="shortDesc"
                error={!!touched.shortDesc && !!errors.shortDesc}
                helperText={touched.shortDesc && errors.shortDesc}
                sx={{ gridColumn: "span 2" }}
              />

              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                <InputLabel id="category-label">Categorie</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  label="Categorie"
                  name="category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  error={!!touched.category && !!errors.category}
                >
                  <MenuItem value="Chaussure pour femme">Chaussure pour femme</MenuItem>
                  <MenuItem value="Chaussure pour homme">Chaussure pour homme</MenuItem>
                  <MenuItem value="Vêtement pour femme">Vêtement pour femme</MenuItem>
                  <MenuItem value="Vêtement pour homme">Vêtement pour homme</MenuItem>
                  <MenuItem value="Electroménager">Electroménager</MenuItem>
                  <MenuItem value="Cosmétique">Cosmétique</MenuItem>
                  <MenuItem value="Immobilier">Immobilier</MenuItem>
                  <MenuItem value="Montre">Montre</MenuItem>
                  <MenuItem value="Outil informatique">Outil informatique</MenuItem>
                  <MenuItem value="Jeux">Jeux</MenuItem>
                  <MenuItem value="Livre">Livre</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="body2">Image de couverture</Typography>
              <Input
                type="file"
                id="coverImage"
                onChange={(e) => {
                  handleChange("coverImage")(e);
                  // Gérez le fichier comme nécessaire
                }}
                sx={{ gridColumn: "span 4" }}
              />

              <Typography variant="body2">Prix</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
              />

              <Typography variant="body2">Description</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Créer le produit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  category: yup.string().required("required"),
  shortDesc: yup.string().required("required"),
  coverImage: yup.mixed().required("required"),
  price: yup.number().required("required"),
  description: yup.string().required("required"),
});

const initialValues = {
  name: "",
  category: "",
  price: "",
  shortDesc: "",
  coverImage: null, // Utilisez null pour le champ de fichier
  description: "",
};

export default GigForm;
