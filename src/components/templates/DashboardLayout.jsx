import React from "react";
import { Grid } from "@mui/material";
import Cards from "../molecules/Cards";
import ChartPS from "../molecules/ChartCO";
import ChartSales from "../molecules/ChartSales";
import ChartTT from "../molecules/ChartTT";
import ChartST from "../molecules/ChartST";

const Dashboard = ({ data }) => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} marginTop="1em" width="95%">
        <Cards />
      </Grid>
      <Grid item xs={6.5} marginTop="1em" paddingRight=".5em">
        <ChartSales style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={5.5} marginTop="1em" paddingLeft=".5em">
        <ChartPS style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={7.1} marginTop="1em">
        <ChartST style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={4.9} marginTop="1em">
        <ChartTT style={{ width: "100%" }} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;



// Dashboard con efecto 

// import React, { useState, useEffect } from "react";
// import { Grid, LinearProgress, Box } from "@mui/material";
// import Cards from "../molecules/Cards";
// import ChartPS from "../molecules/ChartCO";
// import ChartSales from "../molecules/ChartSales";
// import ChartTT from "../molecules/ChartTT";
// import ChartST from "../molecules/ChartST";

// const Dashboard = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 800);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <Box sx={{ width: "100%" }}>
//       {isLoading ? (
//         <LinearProgress />
//       ) : (
//         <Grid container justifyContent="center">
//           <Grid item xs={12} marginTop="1em" width="95%">
//             <Cards />
//           </Grid>
//           <Grid item xs={6.5} marginTop="1.2em" paddingRight=".5em">
//             <ChartSales style={{ width: "100%" }} />
//           </Grid>
//           <Grid item xs={5.5} marginTop="1.2em" paddingLeft=".5em">
//             <ChartPS style={{ width: "100%" }} />
//           </Grid>
//           <Grid item xs={7.1} marginTop="1em">
//             <ChartST style={{ width: "100%" }} />
//           </Grid>
//           <Grid item xs={4.9} marginTop="1em">
//             <ChartTT style={{ width: "100%" }} />
//           </Grid>
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default Dashboard;