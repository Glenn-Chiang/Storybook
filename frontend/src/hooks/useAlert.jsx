const [successMessage, setSuccessMessage] = useState(null);
const [errorMessage, setErrorMessage] = useState(null);

const flashAlert = (message, status) => {
  if (status === "success") {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 2000);
  } else {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 2000); // TODO: Instead of timing out, error alert shoudl remain displayed until the user chooses to close it
  }
};
