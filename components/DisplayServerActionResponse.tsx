// This React component handles the display of server responses
// like success messages, server errors, and validation errors.
// Let's break it down step by step:
// ////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
// Props defines the structure of the result object that the
// DisplayServerActionResponse component will receive.
//
// data: Optional, may contain a message (like a success message).
// serverError: Optional, holds a string error from the server.
// validationErrors: Optional, holds key-value pairs where the
// key is the field name and the value is an array of error messages (or undefined).

type Props = {
  result: {
    data?: {
      message?: string;
    };
    serverError?: string;
    validationErrors?: Record<string, string[] | undefined>;
  };
};

//////////////////////////////////////////////////////////////////////////////////////
// Purpose: Displays a message with different styles based on the type (success or error).
// Props:
// type: Determines the style and icon ("🎉" for success, "🚨" for error).
// content: The message to display (can be a string, JSX, etc.).
// Tailwind Classes:
// bg-accent, px-4, py-2, rounded-lg → Styles for padding, background, and rounded corners.
// text-red-500 is conditionally added if type is "error".
const MessageBox = ({
  type,
  content,
}: {
  type: "success" | "error";
  content: React.ReactNode;
}) => {
  return (
    <div
      className={`bg-accent px-4 py-2 my-2 rounded-lg ${
        type === "error" ? "text-red-500" : ""
      }`}
    >
      {type === "success" ? "🎉" : "🚨"} {content}
    </div>
  );
};

export function DisplayServerActionResponse({ result }: Props) {
  const { data, serverError, validationErrors } = result;

  return (
    <div>
      {/* If data.message exists, display it with a success icon 🎉. */}
      {data?.message && (
        <MessageBox type="success" content={`Success: ${data.message}`} />
      )}

      {/* If there's a serverError, display it with an error icon 🚨. */}
      {serverError && <MessageBox type="error" content={serverError} />}

      {/* If validationErrors exist, loop through each key (e.g., field names like email, 
      password) and display the corresponding error messages.
      
      key as keyof typeof validationErrors ensures TypeScript knows the key exists in validationErrors. */}

      {validationErrors && (
        <MessageBox
          type="error"
          content={Object.keys(validationErrors).map((key) => (
            <p key={key}>{`${key}: ${
              validationErrors[key as keyof typeof validationErrors]
            }`}</p>
          ))}
        />
      )}
    </div>
  );
}
