import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { authService, storageService, windowService } from '@services';

/**
 * FIXME: export const 로하면 anonymous function으로 나온다. react dev tool
 */
const Login = () => {
  const [values, setValues] = React.useState({
    username: 'john',
    password: 'changeme',
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmitClick = (event: React.FormEvent) => {
    // FIXME: hooks에서 처리해야함.
    authService.login({ ...values }).subscribe((token) => {
      storageService.saveToken({ token });
      windowService.location.reload();
    });
    event.preventDefault();
  };

  return (
    <Grid container justify="center" alignItems="center">
      <form noValidate autoComplete="off" onSubmit={handleSubmitClick}>
        <Grid item>
          <TextField
            id="standard-name"
            label="ID"
            value={values.username}
            onChange={handleChange('username')}
            margin="normal"
          />
        </Grid>
        <Grid item>
          <TextField
            type="password"
            id="standard-name"
            label="Password"
            value={values.password}
            onChange={handleChange('password')}
            margin="normal"
          />
        </Grid>
        <Button type="submit">login</Button>
      </form>
    </Grid>
  );
};

export { Login };
