import { useRef, useEffect, useState } from "react";
import { Container, Unstable_Grid2 as Grid, Typography } from "@mui/material"
import axios from "../Api/axios";
import Assignment from "./Assignment";

const Dashboard = () => {
  const apiToken = localStorage.getItem("apiToken");
  const school = localStorage.getItem('school');
  const effectRan = useRef(false);
  const [assignments, setAssignments] = useState([]);

  const getAssignments = async () => {
    let res;

    try {
      res = await axios.post("/items", { api_key: JSON.parse(apiToken), base_url: JSON.parse(school) });
    } catch (err) {}

    setAssignments(res.data.items)
  };

  useEffect(() => {
    if (effectRan.current === true) {
      getAssignments();
    }

    return () => {
      effectRan.current = true;
    };

    //eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={5} justifyContent="center" align="center" justify="center" alignItems="center" mt={3} pt={4} pb={8} disableEqualOverflow>
        {assignments.length > 0 ? assignments.map((assignment, i) => (
          <Grid xs={12} sm={6} md={4} key={i}>
            <Assignment assignment={assignment} />
          </Grid>
        )) : <Typography sx={{ mt: 5 }} variant="h5">No assignment found</Typography>}
      </Grid>
    </Container>
  )
}

export default Dashboard