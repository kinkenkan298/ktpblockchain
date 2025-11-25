import {
  ErrorComponent,
  type ErrorComponentProps,
} from "@tanstack/react-router";

export function DefaultCatchBoundry({ error }: ErrorComponentProps) {
  console.error("DefaultCatchBoundary Error:", error);
  return (
    <div>
      <ErrorComponent error={error} />
      <button>Try Again!</button>
    </div>
  );
}
