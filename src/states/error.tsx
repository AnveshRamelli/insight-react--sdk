export const ErrorState = ({ error }: { error: Error }) => (
  <div>Error: {error.message}</div>
);