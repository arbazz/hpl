import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'react-toastify/dist/ReactToastify.css';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { TopBar } from '../../Components';
import {
    Link
} from "react-router-dom";
import { Grid } from '@material-ui/core';
import '../../App.css'
import { server, headers } from '../../Config';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/actions';
import { ToastContainer, toast } from 'react-toastify';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function Signin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const dispatch = useDispatch();

    const handleSignin = () => {
        if (username && password) {
            authenticate();
        } else {
            toast.warn("email and password are required")
        }
    }


    const authenticate = async () => {
        const data = { username, password };
        const rawResponse = await fetch(server + "/users/authenticate", {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        const content = await rawResponse.json();
        if (content.id) {
            toast.success("loged in");
            dispatch(addUser(content));
            if (remember) {
                localStorage.setItem("id", content.id);
            }
        } else {
            toast.warn("wrong username or password")
        }
        console.log(content);
    }


    return (
        <React.Fragment>
            <ToastContainer />
            <TopBar />
            <Container maxWidth="xs" style={styles.Container} className="center column"  >
                <Grid spacing={1} className="center" style={styles.gridContainer}
                    container direction="column"
                >
                    <Grid item xs>
                        <Typography variant="subtitle2" style={{ fontWeight: 'lighter', fontSize: 40 }}>
                            Login
                        </Typography>
                    </Grid>
                    <Grid item xs style={styles.textinput}>
                        <TextField onChange={e => setUsername(e.target.value)}
                            id="username" label="Username" variant="outlined" style={styles.full} />
                    </Grid>
                    <Grid item xs style={styles.textinput}>
                        <TextField onChange={e => setPassword(e.target.value)}
                       type="password"
                            id="password" label="Passwrod" variant="outlined" style={styles.full} />
                    </Grid>
                    <Grid item xs style={styles.textinput}>
                        <FormControlLabel
                            value="end"
                            control={<Checkbox
                                value={remember}
                                onChange={e => setRemember(e.target.checked)}
                                color="primary" />}
                            label="Remember me on."
                            labelPlacement="end"
                        />
                    </Grid>
                    <Grid item xs style={styles.textinput}>
                        <Button onClick={handleSignin}
                            variant="contained" color="primary" style={styles.full}>Login</Button>
                    </Grid>
                    <Grid item xs style={{ ...styles.textinput, marginTop: -30 }}>
                        <Link to="/register" className="no-underline">
                            <Button
                                variant="outlined" color="primary" style={styles.full}>Register Now</Button>
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
};

const styles = {
    Container: { height: '100vh', },
    gridContainer: {
        height: '50vh',
        marginTop: '20vh',
    },
    textinput: { width: '80%' },
    full: { width: '100%' }
}

export default Signin;