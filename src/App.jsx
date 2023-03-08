import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function LoginForm() {
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted!", password);


    browser.storage.sync.set


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
