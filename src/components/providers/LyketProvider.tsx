"use client";

import { Provider } from "@lyket/react";

type LyketProviderProps = {
  children: React.ReactNode;
};

const LyketProvider = ({ children }: LyketProviderProps) => {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <Provider
      apiKey={process.env.NEXT_PUBLIC_LYKET_API_KEY as string}
      recaptchaSiteKey={recaptchaSiteKey}
      theme={{
        colors: {
          icon: "#43d04c",
          text: "#43d04c",
          highlight: "#b0f50e",
          primary: "#43d04c",
          secondary: "#b0f50e",
          background: "rgba(67,208,76,0.15)",
        },
      }}
    >
      {children}
    </Provider>
  );
};

export default LyketProvider;
