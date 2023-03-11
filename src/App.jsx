import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import browser from "webextension-polyfill";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function LoginForm() {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    (async () => {
      const result = await browser.storage.sync.get("apiKey");

      setApiKey(result?.apiKey);
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const apiKey = data.get("APIKey");
      await browser.storage.sync.set({ apiKey });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        设置API Key
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="APIKey"
          label="API Key"
          type="password"
          id="APIKey"
          value={apiKey}
          onChange={(event) => {
            setApiKey(event.target.value);
          }}
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          保存
        </Button>
      </Box>
    </Container>
  );
}

export default LoginForm;
