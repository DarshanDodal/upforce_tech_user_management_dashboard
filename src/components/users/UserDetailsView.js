import React from "react";
import {
  Grid,
  Typography,
  Button,
  Container,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "../../api/userApi";

const UserDetailsView = () => {
  const location = useLocation();
  const userDetails = location.state.user;
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Go back to the previous page
    navigate(-1);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5, marginBottom: 5 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 10 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <Avatar
              src={`${url}${userDetails.profilePhotoUrl}`}
              alt={`${userDetails.firstName} ${userDetails.lastName}`}
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                overflow: "hidden",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" gutterBottom>
              {userDetails.firstName} {userDetails.lastName}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List sx={{ width: "100%" }}>
              <ListItem disablePadding>
                <ListItemText primary="Id" secondary={userDetails.userId} />
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemText
                  primary="Email address"
                  secondary={userDetails.email}
                />
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemText primary="Gender" secondary={userDetails.gender} />
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemText primary="Mobile" secondary={userDetails.mobile} />
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemText primary="Status" secondary={userDetails.status} />
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemText
                  primary="Location"
                  secondary={userDetails.location}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
      <Button sx={{ margin: 2 }} variant="outlined" onClick={handleGoBack}>
        Go Back
      </Button>
    </Container>
  );
};

export default UserDetailsView;
