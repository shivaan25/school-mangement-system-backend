import app from "./app";

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log("Server os running on a Port: ", PORT);
});
