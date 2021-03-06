
import 'styled-componets';

interface Theme {
    colors: {
      bodyColor: string;
      background: string;
      grayLine: string;
      text: string;
      textHighlight: string;
      title: string;
      invertWhite: string;
      invertBlack: string;
      overlay: string;

    };
};

    declare module 'styled-components' {
      // eslint-disable-next-line @typescript-eslint/no-empty-interface
      export interface DefaultTheme extends Theme {}
    }

