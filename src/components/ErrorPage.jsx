import errorimg from '../assets/error.png'
const ErrorPage = ({message}) => {
 
    return (
      <div className="error-container">
        <h2 className="error-title">Oops! Something went wrong.</h2>
        <p className="error-message">{message}</p>
        <img src={errorimg} alt="Error" className="error-image" />
      </div>
    );
  };
  
  export default ErrorPage;