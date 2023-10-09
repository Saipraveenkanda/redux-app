import { redirect } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Typography,
  // AppBar,
  // Card,
  // CardActions,
  // CardContent,
  CssBaseline,
  Grid,
  // Toolbar,
  Button,
  // Container,
  // ButtonGroup,
  // CardMedia,
  // Box,
  TextField,
  Paper,
  // Avatar,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CameraIcon from "@mui/icons-material/Camera";
import { useState } from "react";
import { connect } from "react-redux";
import { IncAction, DecAction } from "./actions";

// const cards = [1, 2, 3, 4];
const paperStyle = {
  padding: 20,
  height: "auto",
  width: 400,
  margin: "9% auto",
};
const App = ({ local_variable, IncAction, DecAction }) => {
  const [username, changeUserName] = useState("");
  const [password, changePassword] = useState("");
  const [showPassword, onToggleShow] = useState(false);
  const [errorMsg, changeErrorMsg] = useState("");
  const [showErrorMsg, changeShowErrorMSg] = useState(false);

  const onShowPassword = (event) => {
    onToggleShow(event.target.checked);
  };

  const onChangeUserName = (event) => {
    changeUserName(event.target.value);
  };

  const onChangePassword = (event) => {
    changePassword(event.target.value);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    // console.log(userDetails);

    const url = "http://localhost:3002/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    console.log(response);
    const output = await response.json();
    if (response.ok === true) {
      Cookies.set("jwtToken", output.jwtToken);
      return redirect("/home");
    } else {
      changeShowErrorMSg(true);
      changeErrorMsg(output.errorMsg);
    }
  };

  return (
    <>
      <CssBaseline />
      {/* <AppBar position="relative">
        <Toolbar>
          <CameraIcon />
          <Typography variant="h6">Header Bar</Typography>
        </Toolbar>
      </AppBar> */}
      <main>
        <center>
          <h1>{local_variable}</h1>
          <Button onClick={() => IncAction(5)}>Increment</Button>
          <Button onClick={() => DecAction(5)}>Decrement</Button>
        </center>
        <form onSubmit={onSubmitForm}>
          <Grid container>
            <Paper elevation={10} style={paperStyle}>
              <Grid align="center">
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                <CameraIcon sx={{ fontSize: 50 }} />
                <Typography variant="h4">Welcome User</Typography>
              </Grid>
              <TextField
                label="User name"
                placeholder="Enter user name"
                fullWidth
                required
                variant="outlined"
                margin="normal"
                onChange={onChangeUserName}
                value={username}
              />

              <TextField
                required
                label="Password"
                placeholder="Enter password"
                fullWidth
                variant="outlined"
                onChange={onChangePassword}
                value={password}
                type={showPassword ? "text" : "password"}
                error={showErrorMsg}
              />

              <FormControlLabel
                control={<Checkbox />}
                label="Show password"
                onClick={onShowPassword}
              />
              <Button
                variant="contained"
                fullWidth
                style={{ height: "44px", marginTop: "20px" }}
                type="submit"
              >
                Login
              </Button>
              {showErrorMsg && (
                <Typography variant="p" color="red">
                  {errorMsg}
                </Typography>
              )}
              <Grid item marginTop={1} textAlign="center">
                <Typography variant="p" gutterBottom>
                  Don't have an account..?
                </Typography>
                <Button variant="text">Register now!</Button>
              </Grid>
            </Paper>
          </Grid>
        </form>
      </main>
    </>
  );
};
const mapStateToProps = (state) => ({
  local_variable: state,
});
export default connect(mapStateToProps, { IncAction, DecAction })(App);
