import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      border: string;

      text: {
        primary: string;
        secondary: string;
      };

      status: {
        running: string;
        stopped: string;
      };

      gradient: {
        overview: string;
        background: string;
      };

      effects: {
        successGlow: string;
      };
    };
  }
}
