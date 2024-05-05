import * as React from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Grid,
  TextField,
  Button,
  Container,
  Box,
  Select,
  MenuItem,
  Avatar,
  ListItemText,
  Menu,
  ListItemIcon,
  FormControl,
  Pagination,
} from "@mui/material";
import { Add, Delete, Visibility, BorderColor } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import theme from "../../theme/index";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  editUser,
  searchUsers,
  exportUsersToCSV,
  deleteUser,
} from "../../actions/userActions";
import { url } from "../../api/userApi";

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage] = React.useState(5);

  const users = useSelector((state) => state.users);
  const totalPages = Math.ceil(users.length / rowsPerPage);

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const [anchorElMap, setAnchorElMap] = React.useState({});
  const open = Boolean(anchorElMap);

  // Function to handle opening menu for a specific row
  const handleClick = (event, userId) => {
    setAnchorElMap((prevAnchorElMap) => ({
      ...prevAnchorElMap,
      [userId]: event.currentTarget,
    }));
  };

  // Function to handle closing menu for a specific row
  const handleClose = (userId) => {
    setAnchorElMap((prevAnchorElMap) => ({
      ...prevAnchorElMap,
      [userId]: null,
    }));
  };

  const handleView = (user) => {
    navigate("/details", { state: { user } });
  };

  const handleEdit = (user) => {
    navigate(`/edit/${user.userId}`, { state: { user } });
  };

  const handleAddUser = () => {
    navigate("/new");
  };

  const handleUserStatusChange = (userId, data) => {
    dispatch(editUser(userId, data));
  };

  const handleSearch = () => {
    dispatch(searchUsers(searchQuery));
  };

  const handleExportCsv = () => {
    dispatch(exportUsersToCSV());
  };

  const handleDelete = (userId) => {
    handleClose();
    dispatch(deleteUser(userId))
      .then(() => {
        // Reload table data after successful deletion
        dispatch(fetchAllUsers());
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        // Handle error if needed
      });
  };

  React.useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const paginatedUsers = users
    .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
    .map((user) => {
      return user;
    });
  return (
    <>
      <Container maxWidth="xl">
        <Box
          flexDirection={"row"}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid container sx={{ marginTop: 5, marginBottom: 5 }}>
            <Grid
              item
              xs={12}
              sm={6}
              md={8}
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <TextField
                id="search-textbox"
                label="Search"
                variant="outlined"
                size="small"
                style={{ marginRight: 10 }}
                onChange={(event) => {
                  if (!event.target.value) {
                    dispatch(fetchAllUsers());
                    return;
                  }
                  setSearchQuery(event.target.value);
                }}
              />
              <Button variant="contained" onClick={handleSearch}>
                Search
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                variant="contained"
                size="small"
                onClick={handleAddUser}
                startIcon={<Add />}
              >
                Add User
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleExportCsv}
                disabled={users.length < 1 ? true : false}
              >
                Export to CSV
              </Button>
            </Grid>
          </Grid>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              style={{ backgroundColor: theme.palette.secondary.main }}
            >
              <TableRow>
                <TableCell style={{ color: "white" }}>Id</TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  FullName
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  Email
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  Gender
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  Status
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  Profile
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell component="th" scope="row">
                    {user.userId}
                  </TableCell>
                  <TableCell align="center">
                    {`${user.firstName} ${user.lastName}`}
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.gender}</TableCell>
                  <TableCell align="center">
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      {/* <InputLabel id="demo-select-small-label">Age</InputLabel> */}
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="Status"
                        value={user.status}
                        onChange={(event) =>
                          handleUserStatusChange(user.userId, {
                            status: event.target.value,
                          })
                        }
                        IconComponent={ExpandMoreIcon}
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          color: "#FFFF",
                          "& .MuiSelect-icon": {
                            color: "#FFFF", // Change icon color to white
                          },
                        }}
                      >
                        <MenuItem value={"active"}>Active</MenuItem>
                        <MenuItem value={"inactive"}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="center">
                    <Box display={"flex"} justifyContent={"center"}>
                      {user.profilePhotoUrl ? (
                        <Avatar src={`${url}${user.profilePhotoUrl}`} />
                      ) : (
                        <Avatar src="/profile.png" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      id={`basic-button-${user.userId}`} // Unique id for each button
                      aria-controls={`basic-menu-${user.userId}`} // Unique id for each menu
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(event) => handleClick(event, user.userId)} // Pass userId to handleClick
                    >
                      <MoreVertIcon />
                    </Button>

                    <Menu
                      id={`basic-menu-${user.userId}`} // Unique id for each menu
                      anchorEl={anchorElMap[user.userId]} // Use anchorElMap for each row
                      open={Boolean(anchorElMap[user.userId])} // Check if menu should be open for this row
                      onClose={() => handleClose(user.userId)} // Pass userId to handleClose
                      MenuListProps={{
                        "aria-labelledby": `basic-button-${user.userId}`, // Use unique id for each button
                      }}
                    >
                      <MenuItem onClick={() => handleView(user)}>
                        <ListItemIcon>
                          <Visibility
                            style={{ color: "#3cb371" }}
                            fontSize="small"
                          />
                        </ListItemIcon>
                        <ListItemText>View</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => handleEdit(user)}>
                        <ListItemIcon>
                          <BorderColor
                            style={{ color: "#0000ff" }}
                            fontSize="small"
                          />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(user.userId)}>
                        <ListItemIcon>
                          <Delete
                            style={{ color: "#ff0000" }}
                            fontSize="small"
                          />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {users.length < 1 && (
            <div style={{ color: theme.palette.primary.main }}>
              No users found
            </div>
          )}
          <Box
            display="flex"
            justifyContent="flex-end"
            mb={2}
            mr={5}
            sx={{
              "@media (max-width: 600px)": {
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 999,
                backgroundColor: "white",
              },
            }}
          >
            <Box mt={2} border={1} borderColor="#ECEEF0" borderRadius={1}>
              <Pagination
                count={totalPages}
                color="primary"
                shape="rounded"
                page={page}
                defaultPage={1}
                onChange={handleChangePage}
                sx={{
                  "& .MuiPaginationItem-root": {
                    // Customize pagination item styling
                    borderRadius: 0,
                    minWidth: "auto",
                    minHeight: "auto",
                    margin: 0,
                    padding: "12px", // Adjust spacing between pagination items
                  },
                  "& .MuiPaginationItem-page": {
                    // Customize pagination number styling
                    color: "primary.main",
                    "&.Mui-selected": {
                      color: "white",
                      backgroundColor: "primary.main",
                    },
                  },
                  "& .MuiPaginationItem-ellipsis": {
                    // Customize ellipsis styling
                    color: "primary.main",
                  },
                  "& .MuiPaginationItem-icon": {
                    // Customize icon styling
                    color: "primary.main",
                    fontSize: 18,
                    padding: "5px",
                  },
                }}
              />
            </Box>
          </Box>
        </TableContainer>
      </Container>
    </>
  );
};

export default UserList;
