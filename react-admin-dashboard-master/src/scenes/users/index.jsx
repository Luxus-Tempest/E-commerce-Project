import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";


const Users = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await mockDataTeam(); // Execute la fonction pour obtenir les données
      setData(usersData);
    };

    fetchData();
  }, []);

   const getRowId = (row) => row._id;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "_id", headerName: "ID", flex: .5, },
    {
      field: "username",
      headerName: "Nom et Prenom",
      flex: .5,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Contact",
      flex: .5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: .5,
    },
    {
      field: "country",
      headerName: "Pays",
      flex: 0.5,
    },
    {
      field: "accessLevel",
      headerName: "Niveau d'accès",
      flex: .5,
      renderCell: ({ row: { isSeller } }) => {
        const accessLevel = isSeller ? "Seller" : "User";
  
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              isSeller
                ? colors.greenAccent[700] // Mettez la couleur pour les vendeurs
                : colors.greenAccent[600] // Mettez la couleur pour les utilisateurs
            }
            borderRadius="4px"
          >
            {isSeller && <SecurityOutlinedIcon />}
            {!isSeller && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {accessLevel}
            </Typography>
          </Box>
        );
      },
    },
  ];



console.log(data);
  return (
      <Box m="20px">
        <Header
          title="UTILISATEURS"
          subtitle="Consulter les membres du site"
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
          }}
        >
          
          <DataGrid 
          checkboxSelection
          rows={data}
          columns={columns}
          getRowId={getRowId} />
        </Box>
      </Box>

  );
};

export default Users;
