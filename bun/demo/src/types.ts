export type AltRequestBody = {
  imageUrl: string;
};

export type AltResponse =
  | {
      alt: string;
    }
  | {
      error: string;
    };

export type OcrLang = "eng" | "chi_sim";

