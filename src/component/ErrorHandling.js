export default function ErrorHandling({ message }) {
  return (
    <div className="err-container">
      <p className="error">
        <span>⛔</span>
        <span>{message}</span>
      </p>
    </div>
  );
}
