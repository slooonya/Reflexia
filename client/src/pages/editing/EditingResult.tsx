import './EditingResult.css';

export function EditingResult({ fixes, resultImage, onRetry, onAccept }) {
  return (
     <div className="editing-result-container">
        <h1 className="result-heading">Result</h1>

        <div className="result-image-container">
          {resultImage ? (
            <img src={resultImage} alt="Regenerated result" />
          ) : (
            <div className="result-image-placeholder">
              Generating image...
            </div>
          )}
        </div>

        <h2 className="result-subheading">Fixes:</h2>
        <hr />
        <p className="result-fixes">{fixes}</p>

        <div className="editing-actions">
          <button onClick={onRetry}>Retry</button>
          <button onClick={onAccept}>Accept</button>
        </div>
      </div>
  );
}