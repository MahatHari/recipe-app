
const ErrorPage = ({message}) => {
 
    return (
      <div className="error-container">
        <h2 className="error-title">Oops! Something went wrong.</h2>
        <p className="error-message">{message}</p>
        <img src="/error-image.png" alt="Error" className="error-image" />
      </div>
    );
  };
  
  export default ErrorPage;