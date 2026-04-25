import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createUser,
  cleanCreateUserStatus,
  fetchUsers,
  setUsersDisplayPage,
  getCreateUserStatus,
} from "../../features/usersManagementSlice";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Icon,
  Grid,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextFieldsGenerator from "../utils/TextFieldsGenerator";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createUserStatus = useSelector(getCreateUserStatus);

  useEffect(() => {
    if (createUserStatus?.message) {
      dispatch(cleanCreateUserStatus());
      const users = {
        firstItem: 0,
        lastItem: 12,
      };
      dispatch(setUsersDisplayPage(1));
      dispatch(fetchUsers(users));
      navigate("/");
    }
  }, [createUserStatus]);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    role: "student",
    confirmationPassword: "",
    open: false,
    error: "",
  });

  const handleChange = (name) => (event) => {
    let course = {};

    course = {
      [name]: event.target.value,
    };

    setValues({
      ...values,
      ...course,
    });
  };

  const formatUserData = (str) => {
    return (
      str.charAt(0).toUpperCase() + str.substr(1, str.length).toLowerCase()
    );
  };

  const clickSubmit = () => {
    const user = {
      firstName: formatUserData(values.firstName) || undefined,
      lastName: formatUserData(values.lastName) || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      role: values.role,
    };

    if (!values.confirmationPassword || values.confirmationPassword === "") {
      setValues({ ...values, error: "Please repeat your password" });
      return;
    } else if (values.password !== values.confirmationPassword) {
      setValues({ ...values, error: "Password do not match" });
      return;
    } else {
      setValues({ ...values, error: "" });
    }

    dispatch(createUser(user));
  };

  const signupData = [
    "firstName",
    "lastName",
    "email",
    "password",
    "confirmationPassword",
  ];

  const labels = [
    "Firstname",
    "Lastname",
    "Email",
    "Password",
    "Confirmation Password",
  ];

  const types = ["text", "text", "text", "password", "password"];

  const navigateToDashboard = () => {
    setValues({
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      role: "student",
      confirmationPassword: "",
      open: false,
      error: "",
    });
    navigate("/");
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        textAlign: "center",
        margin: "0 auto",
        mt: 5,
        pb: 2,
        px: { xs: 2, md: 0 },
      }}
    >
      <div style={{ textAlign: "right" }}>
        <Tooltip title="Close window">
          <CloseIcon
            fontSize="small"
            onClick={navigateToDashboard}
            style={{
              fontSize: "30px",
              color: "red",
              marginLeft: "auto",
              marginTop: "10px",
              marginRight: "10px",
            }}
          />
        </Tooltip>
      </div>

      <Grid container justifyContent="center">
        <CardContent>
          <h1>Create User</h1>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <TextFieldsGenerator
              array={signupData}
              handleChange={handleChange}
              values={values}
              value={signupData}
              labels={labels}
              sx={{ minWidth: "320px" }}
              types={types}
            />

            {values.error ? (
              <Typography component="p" color="error">
                <Icon
                  color="error"
                  sx={{ verticalAlign: "middle", fontSize: "18px" }}
                ></Icon>
                {values.error}
              </Typography>
            ) : (
              createUserStatus?.error && (
                <Typography component="p" color="error">
                  <Icon
                    color="error"
                    sx={{ verticalAlign: "middle", fontSize: "18px" }}
                  ></Icon>
                  {createUserStatus.error}
                </Typography>
              )
            )}
          </Grid>
        </CardContent>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={clickSubmit}
              sx={{ margin: "auto", mb: 2 }}
            >
              Submit
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CreateUser;
