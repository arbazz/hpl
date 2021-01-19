import React, { useState } from 'react';
import 'date-fns';
import Button from '@material-ui/core/Button';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { TopBar } from '../../Components';
import DateFnsUtils from '@date-io/date-fns';
import {
    Link
} from "react-router-dom";
import { Grid } from '@material-ui/core';
import '../../App.css'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { server } from '../../Config';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/actions';
import { ToastContainer, toast } from 'react-toastify';

export default function Register() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [userName, setUserName] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPasswod] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));


    const handleSignin = async () => {
        console.log("signing in");

        if (validatePassword(password, 'alphanumeric')) {
            if (password === confirmPassword) {
                const data = { username: userName, password, firstName, lastName }
                const rawResponse = await fetch(server + "/users/register", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const content = await rawResponse.json();

                console.log(content);
                authenticate();
            } else {
                alert("password does not match")
            }
        }

    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const authenticate = async () => {
        const data = { username: userName, password };
        const rawResponse = await fetch(server + "/users/authenticate", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const content = await rawResponse.json();
        if (content.id) {
            toast.success("account created");
            dispatch(addUser(content));

        }
        console.log(content);
    }

    const validatePassword = (password, complexity) => {
        const regx1 = /^([a-zA-Z0-9@*#]{8,15})$/
        const regx2 = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
        if (complexity == 'any') {
            var passwordValid = password.length >= 1;
            if (!passwordValid) {

                toast.warn("password cannot be empty")
            }
        }
        else if (complexity == 'alphanumeric') {
            var passwordValid = regx1.test(password);
            if (!passwordValid) {
                toast.warn("password must include alphanumeric letters")

            }
        }
        else if (complexity == 'complex') {
            var passwordValid = regx2.test(password);
            if (!passwordValid) {
                toast.warn("invalid password")
            } else {
                toast.warn("something went wrong");
            }
        }
        return passwordValid
    }

    return (
        <React.Fragment>
            <TopBar />
            <ToastContainer />
            <Container maxWidth="xs" style={styles.Container} className="center column"  >
                <Grid spacing={1} className="center" style={styles.gridContainer}
                    container direction="column"
                >
                    <Grid item xs>
                        <Typography variant="h5">
                            Employee sign up form
                    </Typography>
                    </Grid>
                    <Grid item xs style={styles.textinput}>
                        <TextField
                            onChange={e => setFirstName(e.target.value)}
                            id="firstName"
                            label="First Name"
                            variant="outlined"
                            style={styles.full} />
                    </Grid>

                    <Grid item xs style={styles.textinput}>
                        <TextField
                            onChange={e => setLastName(e.target.value)}
                            id="lastname"
                            label="Last Name"
                            variant="outlined"
                            style={styles.full} />                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item xs style={styles.textinput}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date of birth"
                                value={selectedDate}
                                onChange={handleDateChange}
                                style={styles.full}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid item xs style={styles.textinput}>
                        <TextField
                            onChange={e => setPhone(e.target.value)}
                            id="phone"
                            label="Phone"
                            variant="outlined"
                            style={styles.full} />
                    </Grid>
                    <Grid item xs style={styles.textinput}>
                        <TextField onChange={e => setUserName(e.target.value)}
                            id="username" label="Username" variant="outlined" style={styles.full} />
                    </Grid>
                    <Grid item xs style={styles.textinput}>
                        <TextField onChange={e => setAddress(e.target.value)}
                            id="address" label="Address" variant="outlined" style={styles.full} />
                    </Grid>
                    <Grid item xs style={styles.textinput}>
                        <TextField onChange={e => setPasswod(e.target.value)}
                            type="password"
                            id="password" label="Passowrd" variant="outlined" style={styles.full} />
                    </Grid>
                    <Grid item xs style={styles.textinput}>
                        <TextField onChange={e => setConfirmPassword(e.target.value)}
                            type="password"
                            id="confirmPasswrod" label="Confirm passowrd" variant="outlined" style={styles.full} />
                    </Grid>
                    <Grid item xs style={styles.textinput}>
                        <Button onClick={handleSignin}
                            variant="contained" color="primary" style={styles.full}>Register now</Button>
                    </Grid>
                    <Grid item xs style={{ ...styles.textinput, marginTop: -30 }}>
                        <Link to="/signin" className="no-underline">
                            <Button
                                variant="outlined" color="primary" style={styles.full}>Login</Button>
                        </Link>
                    </Grid>
                    <Grid>
                        <Typography >
                            Forgot username or password?
                    </Typography>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>

    )
}


const styles = {
    Container: { height: '100vh', },
    gridContainer: {
        height: '90vh',
        marginTop: '20vh',
    },
    textinput: { width: '80%' },
    full: { width: '100%' }
}
