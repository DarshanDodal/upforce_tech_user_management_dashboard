import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  FormGroup,
  Input,
  InputLabel,
  Avatar,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import { useFormik } from "formik";
import * as Yup from "yup";
import { url } from "../../api/userApi";
import { editUser, createUser } from "../../actions/userActions";

const RegForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = location.state && location.state.user;
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: Yup.string().required("Mobile is required"),
    gender: Yup.string().required("Gender is required"),
    status: Yup.string().required("Status is required"),
    location: Yup.string().required("Location is required"),
    profilePhoto: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: user || {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      gender: "F",
      profilePhoto: null,
      location: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (user) {
          await dispatch(editUser(user.userId, values));
        } else {
          await dispatch(createUser(values));
        }
        // Reset the form to its default values
        resetForm();
        // Navigate back
        navigate(-1);
      } catch (error) {
        console.error("Error:", error);
        // Handle error if needed
      }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    // Go back to the previous page
    navigate(-1);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: 5, marginBottom: 5 }}>
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} display="flex" justifyContent="center">
                {user && user.profilePhotoUrl ? (
                  <Avatar
                    sx={{ width: 80, height: 80 }}
                    src={`${url}${user.profilePhotoUrl}`}
                  />
                ) : (
                  <Avatar src="/profile.png" sx={{ width: 80, height: 80 }} />
                )}
              </Grid>
              {/* Name */}
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="firstName" sx={{ textAlign: "left" }}>
                  First Name
                </InputLabel>
                <TextField
                  id="firstName"
                  variant="outlined"
                  fullWidth
                  {...formik.getFieldProps("firstName")}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="lastName" sx={{ textAlign: "left" }}>
                  Last Name
                </InputLabel>
                <TextField
                  id="lastName"
                  variant="outlined"
                  fullWidth
                  {...formik.getFieldProps("lastName")}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              {/* Email */}
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="email" sx={{ textAlign: "left" }}>
                  Email Address
                </InputLabel>
                <TextField
                  id="email"
                  variant="outlined"
                  fullWidth
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              {/* Mobile */}
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="mobile" sx={{ textAlign: "left" }}>
                  Mobile
                </InputLabel>
                <TextField
                  id="mobile"
                  variant="outlined"
                  fullWidth
                  {...formik.getFieldProps("mobile")}
                  error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                  helperText={formik.touched.mobile && formik.errors.mobile}
                />
              </Grid>
              {/* Gender */}
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="gender" sx={{ textAlign: "left" }}>
                  Select Your Gender
                </InputLabel>
                <FormGroup>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="F"
                    name="gender"
                    {...formik.getFieldProps("gender")}
                  >
                    <FormControlLabel
                      value="F"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="M"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                  {formik.touched.gender && formik.errors.gender && (
                    <div style={{ color: "red" }}>{formik.errors.gender}</div>
                  )}
                </FormGroup>
              </Grid>
              {/* Status */}
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="status" sx={{ textAlign: "left" }}>
                  Select Your Status
                </InputLabel>
                <Select
                  fullWidth
                  variant="outlined"
                  defaultValue=""
                  id="status"
                  {...formik.getFieldProps("status")}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                >
                  <MenuItem value="">Select...</MenuItem>
                  <MenuItem value="active">active</MenuItem>
                  <MenuItem value="inactive">inactive</MenuItem>
                </Select>
                {formik.touched.status && formik.errors.status && (
                  <div style={{ color: "red" }}>{formik.errors.status}</div>
                )}
              </Grid>
              {/* File Upload */}
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="file-upload" sx={{ textAlign: "left" }}>
                  Select your Profile
                </InputLabel>
                <Input
                  accept="image/*"
                  id="file-upload"
                  sx={{ display: "none" }}
                  type="file"
                  onChange={(event) => {
                    formik.setFieldValue("profilePhoto", event.target.files[0]);
                  }}
                />
                <div
                  style={{
                    outline: "#CCCCCC solid 1px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "1px",
                    borderRadius: "5px",
                  }}
                >
                  <Button
                    variant="outlined"
                    component="span"
                    sx={{
                      backgroundColor: "#E9ECEF",
                      color: "gray",
                      padding: "10px",
                      border: "#CCCCCC solid 1px",
                      marginRight: "5px",
                    }}
                    disabled
                  >
                    Choose file
                  </Button>
                  <label htmlFor="file-upload">
                    {formik.values.profilePhoto
                      ? formik.values.profilePhoto.name
                      : "No file chosen"}
                  </label>
                </div>
                {formik.touched.profilePhoto && formik.errors.profilePhoto && (
                  <div style={{ color: "red" }}>
                    {formik.errors.profilePhoto}
                  </div>
                )}
              </Grid>
              {/* Location */}
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="location" sx={{ textAlign: "left" }}>
                  Enter Your Location
                </InputLabel>
                <TextField
                  id="location"
                  variant="outlined"
                  fullWidth
                  {...formik.getFieldProps("location")}
                  error={
                    formik.touched.location && Boolean(formik.errors.location)
                  }
                  helperText={formik.touched.location && formik.errors.location}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Button sx={{ margin: 2 }} variant="outlined" onClick={handleGoBack}>
          Go Back
        </Button>
      </Container>
    </>
  );
};

export default RegForm;
