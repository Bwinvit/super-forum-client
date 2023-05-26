import "./FallbackBoundary.css"

interface FallbackRenderProps {
  error: Error
}

const FallbackRender: React.FC<FallbackRenderProps> = ({ error }) => {
  return (
    <div role="alert">
      <div className="error-container">
        <h2 style={{ padding: "2rem 2rem 0 2rem" }}>
          Something has gone wrong. Please reload your screen.
        </h2>
        <pre className="error-message" style={{ color: "red" }}>{error.message}</pre>
      </div>
    </div>
  );
};

export default FallbackRender;
