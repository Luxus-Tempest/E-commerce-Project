import React from "react";
import {
  Box,
  useTheme,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Page des questions fréquemment posées" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Comment passer une commande sur Manzo ?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Pour passer une commande sur Manzo, parcourez simplement nos
            produits, sélectionnez les articles que vous souhaitez et ajoutez-les
            à votre panier. Procédez au paiement pour finaliser votre achat.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Quels sont les modes de paiement acceptés sur Manzo ?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Manzo accepte plusieurs modes de paiement, y compris les cartes de
            crédit, les cartes de débit et les passerelles de paiement en ligne
            sécurisées. Vous pouvez choisir le mode de paiement qui vous convient
            le mieux lors du processus de paiement.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Comment puis-je suivre ma commande sur Manzo ?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Une fois votre commande expédiée, Manzo vous fournira un numéro de
            suivi. Vous pouvez utiliser ce numéro de suivi pour surveiller
            l'état et la localisation de votre colis jusqu'à ce qu'il atteigne
            votre porte.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Ajoutez plus de questions fréquemment posées au besoin */}
    </Box>
  );
};

export default FAQ;
