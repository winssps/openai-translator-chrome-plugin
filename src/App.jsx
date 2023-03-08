import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted!", username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        label="API Key"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" type="submit">
        保存
      </Button>
    </form>
  );
}

export default LoginForm;
