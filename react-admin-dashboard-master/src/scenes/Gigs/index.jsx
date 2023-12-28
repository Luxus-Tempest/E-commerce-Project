import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const Gigs = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await mockDataContacts(); // Execute la fonction pour obtenir les données
      setData(usersData);
    };

    fetchData();
  }, []);

   const getRowId = (row) => row._id;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Produit" , flex: 0.5 },
    {
      field: "category",
      headerName: "Categorie",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "price",
      headerName: "Prix",
      type: "number",
      headerAlign: "left",
      flex: 0.5,
      align: "left",
    },

    {
      field: "sellerName",
      headerName: "Nom du vendeur",
      flex: 0.5,
    },
    
  ];
  console.log(data)

  return (
    <Box m="20px">
      <Header
        title="PRODUITS"
        subtitle="La liste des produits référencés"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection
          rows={data}
          getRowId={getRowId} 
        />
      </Box>
    </Box>
  );
};

export default Gigs;
