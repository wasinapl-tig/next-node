import React, { ReactElement } from "react";
import loginStyle from "../styles/login.style";
import loginCSS from "../public/static/css/login.module.css";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import Router from "next/router";
import { DefaultRootState, useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";

interface Props { }

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
    },
    root: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login({ }: Props): ReactElement {
    const classes = useStyles();

    const dispatch = useDispatch();
    const loginReducer = useSelector(({ loginReducer }: any) => loginReducer);

    const showForm = ({ values, setFieldValue, isValid, dirty }) => {
        return (
            <Form>
                <Field
                    component={TextField}
                    name="username"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoComplete="email"
                    autoFocus
                />
                <Field
                    component={TextField}
                    name="password"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />

                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => {
                        dispatch(actions.login(values));
                    }}
                >
                    Sign In
        </Button>
                <Button
                    fullWidth
                    size="small"
                    color="primary"
                    onClick={() => {
                        // Router.push("/register");
                    }}
                >
                    Register
        </Button>
            </Form>
        );
    };

    return (
        <React.Fragment>
            <div className={classes.container}>
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.media}
                        image="/static/img/next_login.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Formik
                            initialValues={{ username: "", password: "" }}
                            onSubmit={(values) => {
                                dispatch(actions.login(values));

                                // alert(JSON.stringify(values));
                            }}
                        >
                            {(props) => showForm(props)}
                        </Formik>
                    </CardContent>
                </Card>

                <style jsx global>
                    {`
            body {
              min-height: 100vh;
              position: relative;
              margin: 0;
              background-size: cover;
              background-image: url("/static/img/bg4.jpg");
              text-align: center;
            }
          `}
                </style>
            </div>
        </React.Fragment>
    );
}